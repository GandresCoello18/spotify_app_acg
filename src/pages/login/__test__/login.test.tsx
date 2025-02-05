import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LoginPage from '../login';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Renderiza el título y la descripción correctamente', () => {
    render(<LoginPage />);

    expect(screen.getByText(/Disfruta de la/i)).toBeInTheDocument();
    expect(screen.getByText(/mejor música/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Accede a tu cuenta para guardar/i),
    ).toBeInTheDocument();
  });

  test('El botón de login con Spotify existe y tiene el texto correcto', () => {
    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /Log in con Spotify/i });
    expect(button).toBeInTheDocument();
  });

  test('Al hacer clic en el botón, se redirige a la URL de autorización de Spotify', () => {
    const replaceMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { replace: replaceMock },
      writable: true,
    });

    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /Log in con Spotify/i });
    fireEvent.click(button);
  });
});
