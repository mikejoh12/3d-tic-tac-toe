function getStraightLines(): number[][][] {
    let lines = [];
    for (let d1 = 0; d1 < 4; d1++) {
      for (let d2 = 0; d2 < 4; d2++) {
        lines.push([[0, d1, d2], [1, d1, d2], [2, d1, d2], [3, d1, d2]]);
        lines.push([[d1, 0, d2], [d1, 1, d2], [d1, 2, d2], [d1, 3, d2]]);
        lines.push([[d1, d2, 0], [d1, d2, 1], [d1, d2, 2], [d1, d2, 3]]);
      }
    }
    return lines;
}

function getDiagonals(): number[][][] {
  let lines = [];
  for (let d = 0; d < 4; d++) {
    lines.push([[0,0,d], [1,1,d], [2,2,d], [3,3,d]]); // xy-plane
    lines.push([[0,3,d], [1,2,d], [2,1,d], [3,0,d]]);
    lines.push([[0,d,0], [1,d,1], [2,d,2], [3,d,3]]); // xz-plane
    lines.push([[0,d,3], [1,d,2], [2,d,1], [3,d,0]]);
    lines.push([[d,0,0], [d,1,1], [d,2,2], [d,3,3]]); // zy-plane
    lines.push([[d,0,3], [d,1,2], [d,2,1], [d,3,0]]);
  }
  return lines;
}

function get3dDiagonals(): number[][][] {
    return [
        [[0,0,0],[1,1,1],[2,2,2],[3,3,3]],
        [[0,0,3],[1,1,2],[2,2,1],[3,3,0]],
        [[3,0,0],[2,1,1],[1,2,2],[0,3,3]],
        [[3,0,3],[2,1,2],[1,2,1],[0,3,0]]
    ]
}

function checkLine(cube: (string|null)[][][], line: number[][]): string|null {
    const ref = cube[line[0][0]][line[0][1]][line[0][2]];
    if (ref === null) return null;
    return line.every((pos) => cube[pos[0]][pos[1]][pos[2]] === ref) ? ref : null;
}

function checkLines(cube: ((string|null)[][][]), lines: number[][][]): string|null {
    for (let i = 0; i < lines.length; i++) {
        const result = checkLine(cube, lines[i]);
        if (result) return result;
    }
    return null;
}

export function checkForWinner(cube: (string|null)[][][]): string|null {
    const lines = getStraightLines().concat(get3dDiagonals()).concat(getDiagonals());
    return checkLines(cube, lines);
}