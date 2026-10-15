export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.capacity;
        }

        return hashCode;
    }

    resize() {
        const oldEntries = this.entries();
        this.capacity *= 2;
        this.clear();

        for(const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }

    set(key, value) {

        if(this.length() >= this.capacity * this.loadFactor){
            this.resize();
        }

        const index = this.hash(key);
        if(!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        if(!this.buckets[index]) {
            return undefined;
        }

        const bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
    }

    has(key) {
        const index = this.hash(key);
        if(!this.buckets[index]) {
            return false;
        }

        const bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return true;
            }
        }
        
        return false;
    }

    remove(key) {
        const index = this.hash(key) 
        const bucket = this.buckets[index];

        if(!bucket) {
            return false;
        }

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    length() {
        let count = 0;

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if (bucket) {
                count += bucket.length;
            }
        }

        return count;
    }
    
    clear() {
        this.buckets = new Array(this.capacity);
    }

    keys() {
        let arr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if(bucket) {
                for(let j = 0; j < bucket.length; j++) {
                    arr.push(bucket[j][0]);
                }
            }
        }

        return arr;
    }

    values() {
        let arr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if(bucket) {
                for(let j = 0; j < bucket.length; j++) {
                    arr.push(bucket[j][1]);
                }
            }
        }

        return arr;
    }
    
    entries() {
        let arr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if(bucket) {
                for(let j = 0; j < bucket.length; j++) {
                    arr.push(bucket[j]);
                }
            }
        }

        return arr;
    }
}