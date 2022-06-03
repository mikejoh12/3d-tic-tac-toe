import { checkForWinner } from "./checkForWinner";
import { greenWin, redWinner, noWinner } from "./checkForWinner.testdata";


test(`checkForWinner should return string 'Green' for a green win`, () => {
  expect(checkForWinner(greenWin)).toBe('Green');
});

test(`checkForWinner should return string 'Red' for a red win`, () => {
    expect(checkForWinner(redWinner)).toBe('Red');
});

test(`checkForWinner should return null for no win`, () => {
    expect(checkForWinner(noWinner)).toBeNull();
});
