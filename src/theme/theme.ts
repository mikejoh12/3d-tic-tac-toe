import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';


export const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    x: {
      main: 'blue',
    },
    o: {
      main: 'green'
    }
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    x: Palette['primary'];
    o: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    x?: PaletteOptions['primary'];
    o?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    x: true;
    o: true;
  }
}