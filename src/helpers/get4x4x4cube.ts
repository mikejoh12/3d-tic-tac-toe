export function get4x4x4cube(): (null|string)[][][] {
  const range: (null|string)[] = new Array(4).fill(null);
  return range.map(e => range.map(e => range.map(e => null)));
}