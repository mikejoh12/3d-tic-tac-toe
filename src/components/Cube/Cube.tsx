import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useTheme, Palette } from '@mui/material/styles';

interface BoxProps {
    position: [number, number, number];
    isPlaying: boolean;
    cubeStates: (string|null)[][][];
    pendingCube: ([number, number, number]|null);
    setPendingCube: any;
  }
  
export default function Cube({position, cubeStates, isPlaying, pendingCube, setPendingCube}: BoxProps) {
    const [x,y,z] = position;
    const ref = useRef<Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();

    function handlePointerDown(event: any): void {
      event.stopPropagation();
      event.target.setPointerCapture(event.pointerId);

      if (cubeStates[x][y][z] || !isPlaying) return;
      setPendingCube([x,y,z]);
    }

    function isPendingCube(
      position: [number, number, number],
      pendingCube: [number, number, number]|null
    ): boolean {
      return position.length === pendingCube?.length &&
             position.every((element, index) => element === pendingCube[index]);
    }

    interface GameStatus {
      cubeStates: (string|null)[][][];
      isHovered: boolean;
      pendingCube: [number, number, number]|null;
    }

    function getCubeColor(
      position: [number, number, number],
      gameStatus: GameStatus,
      palette: Palette
    ): string {
        const cubeState = cubeStates[x][y][z];
        if (cubeState === 'green') {
          return palette.green.main;
        } else if (cubeState === 'red') {
          return palette.red.main;
        } else if (isHovered) {
          return 'yellow';
        } else if (isPendingCube(position, gameStatus.pendingCube)) {
          return palette.grey[800];
        } else {
          return 'gray';
        }
    }

    return (
      <mesh
        position={[(2*x)-3, (2*y)-3, (2*z)-3]}
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerUp={(event: any) => {
          event.stopPropagation();
          event.target.releasePointerCapture(event.pointerId)
        }}
        onPointerOver={(event) => setIsHovered(true)}
        onPointerOut={(event) => setIsHovered(false)}>
        <boxGeometry args={[.8, .8, .8]} />

        <meshStandardMaterial color={getCubeColor(position, {cubeStates, isHovered, pendingCube}, theme.palette)}/>
      </mesh>
    )
}