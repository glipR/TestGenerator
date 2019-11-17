export const generate = (obj) => {
    if (obj.element.name == "Integer") {
        return generateInteger(obj.element);
    } else if (obj.element.name == "Float") {
        return generateFloat(obj.element);
    } else if (obj.element.name == "String") {
        return generateString(obj.element);
    } else if (obj.element.name == "Graph") {
        return generateGraph(obj.element);
    } else if (obj.element.name == "Collection") {
        return generateCollection(obj.element);
    }
    return obj;
}

const generateInteger = (options) => {
    if (options.isPrime) {
        let sieve = [];
        for (let i=0; i<options.upperBound; i++) sieve.push(true);
        sieve[0] = sieve[1] = false;
        for (let x=2; x<Math.ceil(Math.sqrt(options.upperBound+1))+1; x++) {
            if (x > sieve.length) break;
            if (!sieve[x]) continue;
            let current = 2 * x;
            while (current < sieve.length) {
                sieve[current] = false;
                current += x;
            }
        }
        let primes = [];
        for (let i=0; i<options.upperBound; i++) if (sieve[i] && i >= options.lowerBound) primes.push(i);
        return { result: primes[Math.floor(Math.random() * primes.length)] };
    } else {
        return { result: Math.round(options.lowerBound - 0.5 + Math.random() * (options.upperBound - options.lowerBound + 1)) };
    }
}

const generateFloat = (options) => {
    let lower = Math.ceil(options.lowerBound * Math.pow(10, options.precision));
    let upper = Math.floor(options.upperBound * Math.pow(10, options.precision));
    let num = Math.round(lower - 0.5 + Math.random() * (upper - lower + 1));
    return { result: num / Math.pow(10, options.precision) };
}

const getAlphabet = (set_name) => {
    let alph = "abcdefghijklmnopqrstuvwxyz";
    if (set_name == "Lowercase Letters") {
        return alph.toLowerCase();
    } else if (set_name == "Uppercase Letters") {
        return alph.toUpperCase();
    } else if (set_name == "Letters") {
        return alph.toLowerCase() + alph.toUpperCase();
    }
    return "";
}

const generateString = (options) => {
    let alph = Array.from(getAlphabet(options.charSet));
    let stringSize = options.stringSize;
    /*eslint no-console: "off"*/
    if (typeof(stringSize) == "object") {
        stringSize = generate(stringSize).result;
    } else {
        stringSize = parseInt(stringSize);
    }
    let char_array = [];
    for (let i=0; i<stringSize; i++) {
        let num = Math.floor(Math.random() * alph.length);
        char_array.push(alph[num]);
        if (options.constraint.includes("Unique Chars"))
            alph.splice(num, 1);
    }
    if (options.constraint.includes("Decreasing")) {
        char_array.sort();
    } else if (options.constraint.includes("Increasing")) {
        char_array.sort();
        char_array.reverse();
    }
    let result = "";
    for (let c of char_array) result = result + c;
    return { result: result };
}

// Taken from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// All graphs are generated in the backend with structure:
/*
{
    vertices: {
        "1": { weight: 2 },
        "a": {}...
    },
    edges: [
        { v1: "1", v2: "2", weight: 6 }
    ]
}
*/
const generateTree = (n_verts) => {
    // First, designate 0 to be the root vertex, with everything else having a parent with less rank.
    let parents = [-1];
    for (let i=1; i<n_verts; i++) parents.push(Math.round(-0.5 + Math.random() * i));
    // Then create a random shuffling of these vertices
    let shuffled = shuffle(Array.from(Array(n_verts).keys()));
    let graph = {
        vertices: {},
        edges: []
    }
    for (let i=0; i<n_verts; i++) {
        graph.vertices[shuffled[i]] = {};
        if (i != 0) graph.edges.push({ v1: shuffled[i], v2: shuffled[parents[i]] });
    }
    return graph;
}

const vertexToString = (options, label, info) => {
    return options.vertexFormat.replace("v", label).replace("w", info.weight);
}

const edgeToString = (options, info) => {
    return options.edgeFormat.replace("v1", info.v1).replace("v2", info.v2).replace("w", info.weight);
}

const generateGraph = (options) => {
    let num_verts = options.graphVertices;
    if (typeof(num_verts) == "object") {
        num_verts = generate(num_verts).result;
    } else {
        num_verts = parseInt(num_verts);
    }
    let num_edges = options.graphEdges;
    if (typeof(num_edges) == "object") {
        num_edges = generate(num_edges).result;
    } else {
        num_edges = parseInt(num_edges);
    }
    let graph_obj = { vertices: {}, edges: [] };
    let opts = options;
    if (options.isTree) {
        graph_obj = generateTree(num_verts);
    } else {
        let intermediate_obj = { vertices: {}, edges: [] };
        // Generate trees for each component, and then add edges among components.
        let num_comps = opts.graphComponents;
        if (typeof(num_comps) == "object") {
            num_comps = generate(num_comps).result;
        } else {
            num_comps = parseInt(num_comps);
        }
        let comp_array = [ -1 ];
        let options = Array.from(Array(num_verts-1).keys());
        for (let i=1; i<num_comps; i++) {
            let num = Math.floor(Math.random() * options.length);
            comp_array.push(options[num]);
            options.splice(num, 1);
        }
        comp_array.sort();
        comp_array.push(num_verts - 1);
        let total = 0;
        for (let i=1; i<comp_array.length; i++) {
            let subtree = generateTree(comp_array[i] - comp_array[i-1]);
            for (let key of Object.keys(subtree.vertices)) {
                intermediate_obj.vertices[parseInt(key)+total] = subtree.vertices[key];
            }
            for (let edge of subtree.edges) {
                edge.v1 = edge.v1 + total;
                edge.v2 = edge.v2 + total;
                intermediate_obj.edges.push(edge);
            }
            total += comp_array[i] - comp_array[i-1];
        }
        // Add extra edges
        num_edges -= intermediate_obj.edges.length;
        let connectivity = [];
        let possible_neighbour_amounts = [];
        total = 0;
        for (let i=1; i<comp_array.length; i++) {
            for (let j=total; j<total+comp_array[i] - comp_array[i-1]; j++)
                possible_neighbour_amounts.push([comp_array[i] - comp_array[i-1] - 1, total]);
            total += comp_array[i] - comp_array[i-1];
        }
        for (let i=0; i<num_verts; i++) connectivity.push([]);
        for (let edge of intermediate_obj.edges) {
            connectivity[edge.v1].push(edge.v2)
            connectivity[edge.v2].push(edge.v1)
        }
        let remaining_double_edges = 0;
        for (let i=0; i<num_verts; i++) {
            remaining_double_edges += possible_neighbour_amounts[i][0];
            remaining_double_edges -= connectivity[i].length;
        }
        for (let i=0; i<num_edges; i++) {
            let rand = Math.floor(Math.random() * remaining_double_edges);
            for (let j=0; j<num_verts; j++) {
                if (rand > possible_neighbour_amounts[j][0] - connectivity[j].length || possible_neighbour_amounts[j][0] - connectivity[j].length == 0) {
                    rand -= possible_neighbour_amounts[j][0] - connectivity[j].length;
                    continue;
                }
                for (let k=possible_neighbour_amounts[j][1]; k<possible_neighbour_amounts[j][1] + possible_neighbour_amounts[j][0]+1; k++) {
                    if (k != j && !connectivity[j].includes(k)) {
                        intermediate_obj.edges.push({ v1: j, v2: k });
                        connectivity[j].push(k);
                        connectivity[k].push(j);
                        remaining_double_edges -= 2;
                        break;
                    }
                }
                break;
            }
        }
        // Reshuffle the components.
        let shuffled = shuffle(Array.from(Array(num_verts).keys()));
        for (let key of Object.keys(intermediate_obj.vertices)) {
            graph_obj.vertices[shuffled[key]] = intermediate_obj.vertices[key];
        }
        for (let obj of intermediate_obj.edges) {
            graph_obj.edges.push({ v1: shuffled[obj.v1], v2: shuffled[obj.v2] });
        }
    }
    // Now, add the string representation.
    let vertex_string = "";
    let vertex_sep;
    if (options.vertexSeparator == "Space") vertex_sep = " ";
    if (options.vertexSeparator == "Tab") vertex_sep = "\t";
    if (options.vertexSeparator == "Newline") vertex_sep = "\n";
    for (let key of Object.keys(graph_obj.vertices)) {
        vertex_string = vertex_string + vertexToString(options, key, graph_obj.vertices[key]);
        vertex_string = vertex_string + vertex_sep;
    }
    vertex_string = vertex_string.substring(0, vertex_string.length - vertex_sep.length);
    let edge_string = "";
    let edge_sep;
    if (options.edgeSeparator == "Space") edge_sep = " ";
    if (options.edgeSeparator == "Tab") edge_sep = "\t";
    if (options.edgeSeparator == "Newline") edge_sep = "\n";
    for (let i=0; i<graph_obj.edges.length; i++) {
        edge_string = edge_string + edgeToString(options, graph_obj.edges[i]);
        edge_string = edge_string + edge_sep;
    }
    edge_string = edge_string.substring(0, edge_string.length - edge_sep.length);
    graph_obj.result = (
        options.formatString
        .replace("NV", num_verts)
        .replace("NE", graph_obj.edges.length)
        .replace("V", vertex_string)
        .replace("E", edge_string)
    );

    return graph_obj;
}

const generateGroupNumbers = (indiv_options, group_options, amount) => {
    let result = [];
    for (let i=0; i<amount; i++) result.push(generateInteger(indiv_options));
    if (group_options.increasing) { result.sort() }
    return result;
}

const generateGroupFloats = (indiv_options, group_options, amount) => {
    let result = [];
    for (let i=0; i<amount; i++) result.push(generateFloat(indiv_options));
    if (group_options.increasing) { result.sort() }
    return result;
}

const generateCollection = (options) => {
    if (options.individualElements) { return options; }
    let results = [];
    let num_elems = options.numElements;
    if (typeof(num_elems) == "object") {
        num_elems = generate(num_elems).result;
    }
    if (options.elementType.element.name == "Integer") {
        results = generateGroupNumbers(options.elementType.element, {}, num_elems);
    } else if (options.elementType.element.name == "Float") {
        results = generateGroupFloats(options.elementType.element, {}, num_elems);
    }
    let string = "";
    options.separator = options.separator.replace('\\t', '\t').replace('\\n', '\n');
    for (let r of results) { string = string + r.result + options.separator }
    string = string.substring(0, string.length - options.separator.length);
    return { result: string, stats: { num_elems: num_elems }, data: results };
}
