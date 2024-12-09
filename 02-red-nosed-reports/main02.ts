import { TextLineStream } from "@std/streams";



function safeDiff(a: number, b: number) {
    const abs = Math.abs(a - b);
    return abs >= 1 && abs <= 3;
}

export function isSafeReport(nums: number[]): boolean {
    if (nums.length < 2) return false;
    if (!safeDiff(nums[0], nums[1])) {
        return false;
    }
    let diff = nums[1] - nums[0];
    const increasing = diff > 0;
    for (let i = 2; i < nums.length; i++) {
        diff = nums[i] - nums[i - 1];
        if (!safeDiff(nums[i], nums[i - 1])) {
            return false;
        }
        if ((diff < 0 && increasing) || (diff > 0 && !increasing)) {
            return false;
        }
    }
    return true;
}

export function isSafeReportWithRemoveOneItem(nums: number[]): boolean {
    if (isSafeReport(nums)) return true;
    for (let i = 0; i < nums.length; i++) {
        const newNums = nums.slice();
        newNums.splice(i, 1);
        if (isSafeReport(newNums)) return true;
    }

    return false;
}

async function main() {
    const filePath = new URL("input.txt", import.meta.url).pathname;

    const file = await Deno.open(filePath, { read: true });
    let safeReport = 0;
    for await (const line of file.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream())) {
        const nums: number[] = line.split(/\s+/).map(Number);
        if (isSafeReportWithRemoveOneItem(nums)) {
            safeReport++;
        }
    }

    console.log(safeReport);
}

if (import.meta.main) {
    await main();
}
