import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header/Header';
import WelcomeDialog from './components/dialogs/WelcomeDialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Cube from './components/Cube/Cube';
import Typography from '@mui/material/Typography';
import { get3dBoard } from './helpers/get3dBoard';
import { get4x4x4cube } from './helpers/get4x4x4cube';
import { checkForWinner } from './helpers/checkForWinner';
import { Stack } from '@mui/material';

export default function App() {
  const [cubeStates, setCubeStates] = useState<(string|null)[][][]>(get4x4x4cube());
  const [pendingCube, setPendingCube] = useState<[number, number, number]|null>(null);
  const [isXsTurn, setIsXsTurn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [winner, setWinner] = useState<string|null>(null);
  const cubePositions: number[][] = get3dBoard();

  useEffect(() => {
    const result = checkForWinner(cubeStates);
    if (result) {
      setIsPlaying(false);
      setWinner(result);
      }
  }, [cubeStates]);

  function restartGame() {
    setCubeStates(get4x4x4cube());
    setPendingCube(null);
    setIsXsTurn(true);
    setIsPlaying(true);
    setWinner(null);
  }

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

  return (
    <>
      <ThemeProvider theme={theme}>

      <WelcomeDialog />
      <Box component="div" sx={{position: 'absolute', zIndex: 1, width: '100%'}}>
        <Header />
      </Box>
      <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%"}}>
        <Canvas onCreated={(state) => state.gl.setClearColor("black")}>
          <PerspectiveCamera makeDefault position={[16 , 16, 16]}/>
          <OrbitControls makeDefault enableZoom={false} enablePan={false}/>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.5} penumbra={.5} />
          <pointLight position={[-10, -10, -10]} />
          
          {cubePositions.map((pos) => <Cube
                                        key={`${pos[0]}-${pos[1]}-${pos[2]}`}
                                        position={[pos[0], pos[1], pos[2]]}
                                        isPlaying={isPlaying}
                                        cubeStates={cubeStates}
                                        pendingCube={pendingCube}
                                        setPendingCube={setPendingCube} />)}
        </Canvas>
      </Box>

        <Box component="div" sx={{position: 'absolute', width: "100%", height: "100%", pointerEvents: "none"}}>
              <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%'}}>
                <Grid item sx={{mt: 60, pointerEvents: 'auto'}}>
                  { pendingCube &&
                  <  Button variant="contained" color={isXsTurn ? 'x' : 'o'} onClick={handlePlaceCubeClick}>Place {isXsTurn ? 'X':'O'} Cube</Button>
                  }
                  { winner &&
                  <Stack direction="column" spacing={2}>
                    <Typography variant="h5" color="primary">Game Over! Winner is {winner}</Typography>
                    <Button variant="contained" onClick={restartGame}>Play Again</Button>
                  </Stack>
                  }
                </Grid>
              </Grid>
        </Box>
      </ThemeProvider>
    </>
  )
}
