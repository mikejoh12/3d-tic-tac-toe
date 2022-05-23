export function get3dBoard(): number[][] {
    const positions: number[][] = [];
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            for (let z = 0; z < 4; z++) {
                positions.push([x,y,z])
            }
        }
    }
    return positions;
}