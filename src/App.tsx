import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header/Header';
import WelcomeDialog from './components/dialogs/WelcomeDialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Cube from './components/Cube/Cube';
import { get3dBoard } from './helpers/get3dBoard';
import { get4x4x4cube } from './helpers/get4x4x4cube';
import { checkForWinner } from './helpers/checkForWinner';

export default function App() {
  const [cubeStates, setCubeStates] = useState<(string|null)[][][]>(get4x4x4cube());
  const [pendingCube, setPendingCube] = useState<[number, number, number]|null>(null);
  const [isXsTurn, setIsXsTurn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [aroundXangle, setAroundXangle] = useState<number>(0);
  const [aroundZangle, setAroundZangle] = useState<number>(0);
  const [winner, setWinner] = useState<string|null>(null);
  const cubePositions: number[][] = get3dBoard();

  useEffect(() => {
    const result = checkForWinner(cubeStates);
    if (result) {
      setIsPlaying(false);
      setWinner(result);
      }
  }, [cubeStates]);

  const group = useRef<Group>(null!);

  function handlePlaceCubeClick() {
      if (!pendingCube) return;
      if (cubeStates[pendingCube[0]][pendingCube[1]][pendingCube[2]]) return;
      setCubeStates((prevState: any) => {
        const newGrid = [...prevState];
        newGrid[pendingCube[0]][pendingCube[1]][pendingCube[2]] = isXsTurn ? 'X' : 'O';
        return newGrid;
      });
      setPendingCube(null);
      setIsXsTurn((prevState: boolean) => !prevState);
  }

  const handleAroundXangleChange = (event: Event, newValue: number | number[]) => {
    setAroundXangle(newValue as number);
  };

  const handleAroundZangleChange = (event: Event, newValue: number | number[]) => {
    setAroundZangle(newValue as number);
  };

  return (
    <>
      <ThemeProvider theme={theme}>

      <WelcomeDialog />
      <Box component="div" sx={{position: 'absolute', zIndex: 1, width: '100%'}}>
        <Header />
      </Box>
      <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%"}}>
        <Canvas onCreated={(state) => state.gl.setClearColor("black")}>
          <PerspectiveCamera makeDefault position={[0 , 30, 0]}/>
          <OrbitControls makeDefault enableZoom={false} enablePan={false}/>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
          <pointLight position={[-10, -10, -10]} />
          
          <group ref={group} rotation={[aroundXangle, aroundZangle, 0]} position={[0, 0, 0]}>
            {cubePositions.map((pos) => <Cube
                                          key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                          position={[pos[0], pos[1], pos[2]]}
                                          isPlaying={isPlaying}
                                          cubeStates={cubeStates}
                                          pendingCube={pendingCube}
                                          setPendingCube={setPendingCube} />)}
          </group>
        </Canvas>
      </Box>

      <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%", pointerEvents: "none"}}>
              <Grid container item direction="column" alignItems="center" justifyContent="center" sx={{height: '100%'}}>
                <Grid item>
                  <Box component="div" sx={{height: 200, pointerEvents: 'none'}}>
                        <Slider sx={{
                                  '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                  },
                                  pointerEvents: 'auto',
                                  ml: 45
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
              <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%'}}>
                <Grid item>
                  <Box component="div" sx={{ width: 200, pointerEvents: 'auto', mt: 60}}>
                      <Slider defaultValue={0} min={-5} max={5} step={0.00001} onChange={handleAroundZangleChange} />
                  </Box>
                </Grid>
                <Grid item sx={{mt: 2, pointerEvents: 'auto'}}>
                  { pendingCube &&
                  <  Button variant="contained" onClick={handlePlaceCubeClick}>Place {isXsTurn ? 'X':'O'} Cube</Button>
                  }
                  { winner &&
                    <Button variant="contained">Game Over! Winner is {winner}</Button>
                  }
                </Grid>
              </Grid>
        </Box>
      </ThemeProvider>
    </>
  )
}
