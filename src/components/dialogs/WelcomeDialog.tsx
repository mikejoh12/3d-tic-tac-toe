import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          3D Tic-Tac-Toe
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            This is a 3D Tic-Tac-Toe game. You win by getting 4 in a row either in a straight line,
            diagonally on any surface, or diagonally from corner to corner.
          </Typography>

          <Typography sx={{mt: 3}}>
            Turn the cube by using the slider controls or drag the background outside of the cube.
          </Typography>

          <Typography sx={{mt: 3}}>
            Select a small cube to make a preliminary placement. Press the blue "PLACE CUBE" button to confirm and place the X or O
            in the selected spot.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Start Game
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}