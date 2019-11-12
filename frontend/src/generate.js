export const generate = (obj) => {
    if (obj.element.name == "Integer") {
        return generateInteger(obj.element);
    }
    else if (obj.element.name == "Float") {
        return generateFloat(obj.element);
    } else if (obj.element.name == "String") {
        return generateString(obj.element);
    } else if (obj.element.name == "Graph") {
        return generateGraph(obj.element);
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
        return primes[Math.floor(Math.random() * primes.length)];
    } else {
        return Math.round(options.lowerBound - 0.5 + Math.random() * (options.upperBound - options.lowerBound + 1));
    }
}

const generateFloat = (options) => {
    let lower = Math.ceil(options.lowerBound * Math.pow(10, options.precision));
    let upper = Math.floor(options.upperBound * Math.pow(10, options.precision));
    let num = Math.round(lower - 0.5 + Math.random() * (upper - lower + 1));
    return num / Math.pow(10, options.precision);
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
    if (typeof(stringSize) == "object") {
        stringSize = generate(stringSize);
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
    return result;
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
    if (typeof(stringSize) == "object") {
        num_verts = generate(num_verts);
    } else {
        num_verts = parseInt(num_verts);
    }
    let graph_obj = {};
    if (options.isTree) {
        graph_obj = generateTree(num_verts);
    } else {
        graph_obj = {};
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
