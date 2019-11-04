export const generate = (obj) => {
    if (obj.element.name == "Integer") {
        return generateInteger(obj.element);
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
            let primes = [];
            for (let i=0; i<options.upperBound; i++) if (sieve[i] && i >= options.lowerBound) primes.push(i);
            return primes[Math.floor(Math.random() * primes.length)];
        }
    } else {
        return Math.round(options.lowerBound - 0.5 + Math.random() * (options.upperBound - options.lowerBound + 0.5));
    }
}
