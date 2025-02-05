import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArtistSkeleton } from '../ArtistDetailSkeleton';

describe('ArtistSkeleton Component', () => {
  test('renders the component correctly', () => {
    render(<ArtistSkeleton />);

    expect(screen.getByRole('section')).toBeInTheDocument();
  });

  test('renders skeleton elements with correct classes', () => {
    render(<ArtistSkeleton />);

    const skeletonElements = screen.getAllByRole('presentation');
    skeletonElements.forEach((element) => {
      expect(element).toHaveClass('animate-pulse');
      expect(element).toHaveClass('bg-gray-700');
    });
  });

  test('renders correct structure for the artist layout', () => {
    render(<ArtistSkeleton />);
    expect(screen.getByTestId('artist-image')).toBeInTheDocument();
    expect(screen.getByTestId('artist-name')).toBeInTheDocument();
    expect(screen.getByTestId('artist-icon')).toBeInTheDocument();
    expect(screen.getByTestId('artist-info-1')).toBeInTheDocument();
    expect(screen.getByTestId('artist-info-2')).toBeInTheDocument();
  });
});
