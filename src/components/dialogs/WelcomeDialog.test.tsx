import { render, screen } from '@testing-library/react';
import WelcomeDialog from './WelcomeDialog';

it('WelcomeDialog renders 3D Tic-Tac-Toe title', () => {
  render(<WelcomeDialog isOpen={true} closeWelcomeDialog={undefined} />);
  expect(screen.getByText('3D Tic-Tac-Toe')).toBeInTheDocument();
});

it('WelcomeDialog renders Start Game string', () => {
  render(<WelcomeDialog isOpen={true} closeWelcomeDialog={undefined} />);
  expect(screen.getByText('Start Game')).toBeInTheDocument();
});