import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
    secondary: {
      main: '#3F88C5',
    },
    x: {
      main: '#F6F7EB',
    },
    o: {
      main: '#E94F37'
    }
  },
});

theme = responsiveFontSizes(theme);

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

export { theme };