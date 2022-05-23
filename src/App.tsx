import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './components/Box/Box';
import { get3dBoard } from './helpers/get3dBoard';
import { get4x4x4cube } from './helpers/get4x4x4cube';
import { checkForWinner } from './helpers/checkForWinner';

export default function App() {
  const [cubeStates, setCubeStates] = useState<(string|null)[][][]>(get4x4x4cube());
  const [isXsTurn, setIsXsTurn] = useState(true);
  const cubePositions: number[][] = get3dBoard();

  useEffect(() => {
    const result = checkForWinner(cubeStates);
    if (result) {
      alert(`Game Over! The winner is: ${result}`);
    }
  }, [cubeStates]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ fov: 70, position: [9, 7, 9]}}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
        <pointLight position={[-10, -10, -10]} />
        {cubePositions.map((pos) => <Box
                                      position={[pos[0], pos[1], pos[2]]}
                                      setCubeStates={setCubeStates}
                                      isXsTurn={isXsTurn}
                                      setIsXsTurn={setIsXsTurn}
                                      cubeStates={cubeStates} />)}
      </Canvas>
    </div>
  )
}
