import { get4x4x4cube } from "./get4x4x4cube";
import { cube } from "./get4x4x4cube.testdata";

test(`get4x4x4cube should return a 3d array to hold game state for [x][y][z] positions`, () => {
    expect(get4x4x4cube()).toStrictEqual(cube);
  });