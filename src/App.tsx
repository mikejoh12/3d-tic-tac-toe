import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Cube from './components/Cube/Cube';
import { get3dBoard } from './helpers/get3dBoard';
import { get4x4x4cube } from './helpers/get4x4x4cube';
import { checkForWinner } from './helpers/checkForWinner';

export default function App() {
  const [cubeStates, setCubeStates] = useState<(string|null)[][][]>(get4x4x4cube());
  const [isXsTurn, setIsXsTurn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [aroundXangle, setAroundXangle] = useState<number>(0);
  const [aroundZangle, setAroundZangle] = useState<number>(0);
  const cubePositions: number[][] = get3dBoard();

  useEffect(() => {
    const result = checkForWinner(cubeStates);
    if (result) {
      setIsPlaying(false);
      alert(`Game Over! The winner is: ${result}`);
    }
  }, [cubeStates]);

  const handleAroundXangleChange = (event: Event, newValue: number | number[]) => {
    setAroundXangle(newValue as number);
    console.log(aroundXangle);
  };

  const handleAroundZangleChange = (event: Event, newValue: number | number[]) => {
    setAroundZangle(newValue as number);
    console.log(aroundZangle);
  };

  return (
    <div className="app">
      <Header />
      <Canvas onCreated={(state) => state.gl.setClearColor("black")}>
        <PerspectiveCamera makeDefault position={[0,0,25]}/>
        <OrbitControls makeDefault enableZoom={false} enablePan={false}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
        <pointLight position={[-10, -10, -10]} />
        {cubePositions.map((pos) => <Cube
                                      key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                      position={[pos[0], pos[1], pos[2]]}
                                      setCubeStates={setCubeStates}
                                      isXsTurn={isXsTurn}
                                      setIsXsTurn={setIsXsTurn}
                                      isPlaying={isPlaying}
                                      cubeStates={cubeStates} />)}
      </Canvas>

      <Box component="div" sx={{ width: 200 }}>
        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
          <Slider defaultValue={0} min={-180} max={180} onChange={handleAroundXangleChange} />
          <Slider defaultValue={0} min={-180} max={180} onChange={handleAroundZangleChange} />
        </Stack>
      </Box>
    </div>
  )
}
