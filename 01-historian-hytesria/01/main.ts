import {TextLineStream} from '@std/streams'


const filePath = new URL("./input.txt", import.meta.url).pathname;

const file = await Deno.open(filePath, {read:true});

let lefts: number[] = [];
let rights: number[] = [];
for await (const line of file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream())){
        const [l, r] = line.split(/\s+/).map(Number);
        lefts.push(l);
        rights.push(r);
}

//sort 
lefts = lefts.sort( (a, b) => a - b );
rights = rights.sort( (a, b) => a - b );

let sum = 0;
for(let i=0; i<lefts.length; i++){
    sum += Math.abs(lefts[i]-rights[i]);
}
console.log(sum); //