import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlbumCardSkeleton } from '../AlbumCardSkeleton';

describe('AlbumCardSkeleton Component', () => {
  test('renders the skeleton container', () => {
    render(<AlbumCardSkeleton />);
    const container = screen.getByRole('presentation');
    expect(container).toBeInTheDocument();
  });

  test('renders the skeleton image placeholder', () => {
    render(<AlbumCardSkeleton />);
    const imagePlaceholder = screen.getByTestId('album-image-placeholder');
    expect(imagePlaceholder).toBeInTheDocument();
  });

  test('renders the text placeholders', () => {
    render(<AlbumCardSkeleton />);
    const titlePlaceholder = screen.getByTestId('album-title-placeholder');
    const artistPlaceholder = screen.getByTestId('album-artist-placeholder');
    const buttonPlaceholder = screen.getByTestId('album-button-placeholder');

    expect(titlePlaceholder).toBeInTheDocument();
    expect(artistPlaceholder).toBeInTheDocument();
    expect(buttonPlaceholder).toBeInTheDocument();
  });
});
