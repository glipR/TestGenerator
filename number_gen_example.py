# Sample code for generating numbers given some options
import math
import random
import itertools

TYPE_INT = 'Integer'
TYPE_FLOAT = 'Float'

option_dict = {
    'Range': (0, 100),
    'Type': TYPE_INT,
    'Prime': True,
    'Precision': 0,
}

def gen_number(opts):
    if opts['Type'] == TYPE_INT:
        if opts['Prime']:
            # List of primes from 0 to MaxRange.
            sieve = [True]*(opts['Range'][1]+1)
            sieve[0] = False
            sieve[1] = False
            for x in range(2, math.ceil(math.sqrt(opts['Range'][1]+1))+1):
                if x >= len(sieve): break
                if not sieve[x]: continue
                current = 2*x
                while current <= len(sieve):
                    sieve[current] = False
                    current += x
            primes = [
                x
                for x in range(opts['Range'][1]+1)
                if sieve[x] and
                x >= opts['Range'][0]
            ]
            return random.choice(primes)
        # Not primes, just use random.randint
        return random.randint(*opts['Range'])
    # Generate a float. Multiple by precision and generate.
    lower = math.ceil(opts['Range'][0] * math.pow(10, opts['Precision']))
    upper = math.floor(opts['Range'][1] * math.pow(10, opts['Precision']))
    num = random.randint(lower, upper)
    return num / math.pow(10, opts['Precision'])

opts1 = {
    'Range': (-100, 100),
    'Type': TYPE_INT,
    'Prime': False,
}

opts2 = {
    'Range': (50, 100),
    'Type': TYPE_INT,
    'Prime': True,
}

opts3 = {
    'Range': (-3.7, 4.65),
    'Type': TYPE_FLOAT,
    'Precision': 4,
}

print(gen_number(opts1))
print(gen_number(opts2))
print(gen_number(opts3))
