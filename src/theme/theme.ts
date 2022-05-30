import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#4F37E9',
    },
    secondary: {
      main: '#37D1E9',
    },
    green: {
      main: '#37E94F',
    },
    red: {
      main: '#E94F37',
    }
  },
});

theme = responsiveFontSizes(theme);

declare module '@mui/material/styles' {
  interface Palette {
    green: Palette['primary'];
    red: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    green?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
    red: true;
  }
}

export { theme };