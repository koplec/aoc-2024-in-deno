import { TextLineStream } from "@std/streams";

const filePath = new URL("./input.txt", import.meta.url).pathname;

const file = await Deno.open(filePath, { read: true });

let lefts: number[] = [];
let rightMap: Map<number, number> = new Map();

for await (const line of file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream())) {
  const [l, r] = line.split(/\s+/).map(Number);
  lefts.push(l);
  if (rightMap.has(r)) {
    const val = rightMap.get(r);
    if (typeof val === "number") {
      rightMap.set(r, val + 1);
    }
  } else {
    rightMap.set(r, 1);
  }
}

let sum = 0;
for(const left of lefts){
    if(rightMap.has(left)){
        const count = rightMap.get(left);
        if(typeof count === "number"){
            sum += left*count;
        }
    }
}
console.log(sum);