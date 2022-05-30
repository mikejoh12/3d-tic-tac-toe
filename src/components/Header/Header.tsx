import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHub from '@mui/icons-material/GitHub';


export default function ButtonAppBar() {
  return (
    <Box component="div" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            3D Tic-Tac-Toe
          </Typography>
          <a href="https://github.com/mikejoh12/3d-4x4-tic-tac-toe"
             target="_blank"
             rel="noreferrer noopener">
            <IconButton
                size="large">
                <GitHub />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}