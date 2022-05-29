import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Group } from 'three';
import Cube from '../Cube/Cube';


interface CubeGroupProps {
    isPlaying: boolean;
    cubeStates: (string|null)[][][];
    cubePositions: number[][];
    pendingCube: ([number, number, number]|null);
    setPendingCube: any;
  }
  
export default function Box({cubeStates, cubePositions, isPlaying, pendingCube, setPendingCube}: CubeGroupProps) {

    const group = useRef<Group>(null!);
    const { viewport } = useThree();

    function calculateResponsiveScale(viewportWidth: number): number {
        return Math.max(1, Math.min(1.5, viewportWidth / 20));
    }

    return (
        <group ref={group} scale={calculateResponsiveScale(viewport.getCurrentViewport().width)}>
        {cubePositions.map((pos) => <Cube
                                      key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                      position={[pos[0], pos[1], pos[2]]}
                                      isPlaying={isPlaying}
                                      cubeStates={cubeStates}
                                      pendingCube={pendingCube}
                                      setPendingCube={setPendingCube} />)}
        </group>
    )
}