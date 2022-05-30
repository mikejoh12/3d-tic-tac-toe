import { useRef, useState } from 'react';
import { Mesh } from 'three';
// import { Color } from 'three'; 
// import { useTheme } from '@mui/material/styles';

interface BoxProps {
    position: [number, number, number];
    isPlaying: boolean;
    cubeStates: (string|null)[][][];
    pendingCube: ([number, number, number]|null);
    setPendingCube: any;
  }
  
export default function Box({position, cubeStates, isPlaying, pendingCube, setPendingCube}: BoxProps) {
    const [x,y,z] = position;
    const ref = useRef<Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false);
    // const theme = useTheme();

    function handlePointerDown(event: any) {
      event.stopPropagation();
      event.target.setPointerCapture(event.pointerId);

      if (cubeStates[x][y][z] || !isPlaying) return;
      setPendingCube([x,y,z]);
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

        <meshStandardMaterial color={cubeStates[x][y][z] === 'X' ? 'blue' : 
                                     cubeStates[x][y][z] === 'O' ? 'green' :
                                     isHovered ? 'yellow' :
                                     pendingCube && pendingCube[0] === x && pendingCube[1] === y  && pendingCube[2] === z ? 'orange' :
                                     'gray'}/>
      </mesh>
    )
}