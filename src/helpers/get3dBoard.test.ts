import { get3dBoard } from "./get3dBoard";
import { threeDBoard } from "./get3dBoard.testdata";

test(`get3DdBoard should return array of possible board [x,y,z] positions`, () => {
    expect(get3dBoard()).toStrictEqual(threeDBoard);
  });