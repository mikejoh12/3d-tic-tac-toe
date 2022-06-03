import { render, screen } from '@testing-library/react';
import Header from './Header';

it(`Header renders "3D Tic-Tac-Toe" title`, () => {
  render(<Header />);
  expect(screen.getByText('3D Tic-Tac-Toe')).toBeInTheDocument();
});