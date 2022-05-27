import { useRef, useState } from 'react';
import { Mesh } from 'three';

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
    const [isHovered, setIsHovered] = useState(false)

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
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={cubeStates[x][y][z] === 'X' ? 'blue' : 
                                     cubeStates[x][y][z] === 'O' ? 'green' :
                                     isHovered ? 'yellow' :
                                     pendingCube && pendingCube[0] === x && pendingCube[1] === y  && pendingCube[2] === z ? 'red' :
                                     'gray'}
/>
      </mesh>
    )
}