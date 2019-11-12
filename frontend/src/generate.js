export const generate = (obj) => {
    if (obj.element.name == "Integer") {
        return generateInteger(obj.element);
    }
    else if (obj.element.name == "Float") {
        return generateFloat(obj.element);
    } else if (obj.element.name == "String") {
        return generateString(obj.element);
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
    let alph = getAlphabet(options.charSet);
    let stringSize = options.stringSize;
    if (typeof(stringSize) == "object") {
        stringSize = generateInteger(options.stringSize.element);
    }
    let result = "";
    for (let i=0; i<stringSize; i++) {
        result = result + alph[Math.floor(Math.random() * alph.length)];
    }
    return result;
}
