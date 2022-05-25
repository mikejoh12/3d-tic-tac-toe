import { useRef, useState } from 'react';
import { Mesh } from 'three';

interface BoxProps {
    position: [number, number, number];
    isXsTurn: boolean;
    setIsXsTurn: any;
    isPlaying: boolean;
    cubeStates: (string|null)[][][];
    setCubeStates: any;
  }
  
export default function Box({position, cubeStates, setCubeStates, isXsTurn, setIsXsTurn, isPlaying}: BoxProps) {
    const [x,y,z] = position;
    const ref = useRef<Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false)

    function handlePointerDown(event: any) {
      event.stopPropagation();
      event.target.setPointerCapture(event.pointerId);

      if (cubeStates[x][y][z] || !isPlaying) return;
      setCubeStates((prevState: any) => {
        const newGrid = [...prevState];
        newGrid[x][y][z] = isXsTurn ? 'X' : 'O';
        return newGrid;
      });
      setIsXsTurn((prevState: boolean) => !prevState);
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
                                     'gray'}
                              opacity={0.9}
                              transparent />
      </mesh>
    )
}