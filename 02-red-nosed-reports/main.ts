import { TextLineStream } from "@std/streams";

const filePath = new URL("input.txt", import.meta.url).pathname;

const file = await Deno.open(filePath, { read: true });

function safeDiff(a: number, b: number) {
  const abs = Math.abs(a - b);
  return abs >= 1 && abs <= 3;
}

let safeReport = 0;
outerLoop: for await (const line of file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream())) {
  const nums: number[] = line.split(/\s+/).map(Number);
  //   console.log(nums);
  //check first two numbers
  if (!safeDiff(nums[0], nums[1])) {
    continue;
  }
  let diff = nums[1] - nums[0];
  const increasing = diff > 0;

  if (nums.length < 2) {
    continue;
  }
  for (let i = 2; i < nums.length; i++) {
    diff = nums[i] - nums[i - 1];
    if (!safeDiff(nums[i], nums[i - 1])) {
      continue outerLoop;
    }
    if ((diff < 0 && increasing) || (diff > 0 && !increasing)) {
      continue outerLoop;
    }
  }
  safeReport++;
}

console.log(safeReport);
