import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

  const group = useRef<Group>(null!);

  const handleAroundXangleChange = (event: Event, newValue: number | number[]) => {
    setAroundXangle(newValue as number);
  };

  const handleAroundZangleChange = (event: Event, newValue: number | number[]) => {
    setAroundZangle(newValue as number);
  };

  return (
    <div className="app">
      <Header />
      <Box component="div">
        <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%"}}>
          <Canvas onCreated={(state) => state.gl.setClearColor("black")}>
            <PerspectiveCamera makeDefault position={[0,0,25]}/>
            <OrbitControls makeDefault enableZoom={false} enablePan={false}/>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
            <pointLight position={[-10, -10, -10]} />
            
            <group ref={group} rotation={[aroundXangle, aroundZangle, 0]} position={[0, 0, 0]}>
              {cubePositions.map((pos) => <Cube
                                            key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                            position={[pos[0], pos[1], pos[2]]}
                                            setCubeStates={setCubeStates}
                                            isXsTurn={isXsTurn}
                                            setIsXsTurn={setIsXsTurn}
                                            isPlaying={isPlaying}
                                            cubeStates={cubeStates} />)}
            </group>
          </Canvas>
        </Box>

        <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%", pointerEvents: "none"}}>
              <Grid container direction="column" alignItems="end" justifyContent="center" sx={{height: '100%'}}>
                <Grid item>
                  <Box component="div" sx={{height: 300, pointerEvents: 'none'}}>
                        <Slider sx={{
                                  '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                  },
                                  pointerEvents: 'auto'
                                }}
                                orientation='vertical'
                                defaultValue={0}
                                min={-5}
                                max={5}
                                step={0.00001}
                                onChange={handleAroundXangleChange} />
                  </Box>
                </Grid>
              </Grid>
        </Box>

          <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%", pointerEvents: "none"}}>
                <Grid container direction="column" alignItems="center" justifyContent="end" sx={{height: '100%'}}>
                  <Grid item>
                    <Box component="div" sx={{ width: 300, pointerEvents: 'auto', mb: 10}}>
                        <Slider defaultValue={0} min={-5} max={5} step={0.00001} onChange={handleAroundZangleChange} />
                    </Box>
                  </Grid>
                </Grid>
          </Box>
      </Box>
    </div>
  )
}
