import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

interface WelcomeDialogProps {
  isOpen: boolean;
  closeWelcomeDialog: any;
}

export default function WelcomeDialog({isOpen, closeWelcomeDialog}: WelcomeDialogProps) {

  const handleClose = () => {
    closeWelcomeDialog();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          3D Tic-Tac-Toe
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            You win by getting 4 in a row either in a straight line, diagonally on any surface, or diagonally from corner to corner.
          </Typography>

          <Typography sx={{mt: 3}}>
            Turn the camera around the cube by left-clicking and dragging the background outside of the cube. For touch-screens, drag the screen to rotate the cube. 
          </Typography>

          <Typography sx={{mt: 3}}>
            Select a small cube to make a preliminary placement. Press the "PLACE CUBE" button to confirm and place the X or O
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