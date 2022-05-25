import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Header from './components/Header/Header';
import Box from './components/Box/Box';
import { get3dBoard } from './helpers/get3dBoard';
import { get4x4x4cube } from './helpers/get4x4x4cube';
import { checkForWinner } from './helpers/checkForWinner';

export default function App() {
  const [cubeStates, setCubeStates] = useState<(string|null)[][][]>(get4x4x4cube());
  const [isXsTurn, setIsXsTurn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const cubePositions: number[][] = get3dBoard();

  useEffect(() => {
    const result = checkForWinner(cubeStates);
    if (result) {
      setIsPlaying(false);
      alert(`Game Over! The winner is: ${result}`);
    }
  }, [cubeStates]);

  return (
    <div className="app">
      <Header />
      <Canvas onCreated={(state) => state.gl.setClearColor("black")}>
        <PerspectiveCamera makeDefault position={[0,0,25]}/>
        <OrbitControls makeDefault enableZoom={false} enablePan={false}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
        <pointLight position={[-10, -10, -10]} />
        {cubePositions.map((pos) => <Box
                                      key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                      position={[pos[0], pos[1], pos[2]]}
                                      setCubeStates={setCubeStates}
                                      isXsTurn={isXsTurn}
                                      setIsXsTurn={setIsXsTurn}
                                      isPlaying={isPlaying}
                                      cubeStates={cubeStates} />)}
      </Canvas>
    </div>
  )
}
