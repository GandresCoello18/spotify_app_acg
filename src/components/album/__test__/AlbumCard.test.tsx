import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlbumCard } from '../AlbumCard';

describe('AlbumCard Component', () => {
  const mockHandleClick = vi.fn();

  const albumProps = {
    id: '1',
    image: 'https://example.com/album.jpg',
    name: 'Test Album',
    published: '2023-12-01',
    isAdded: false,
    hrefUrl: 'https://spotify.com/album/1',
    openUrlSpotify: 'https://open.spotify.com/album/1',
    handleClick: mockHandleClick,
  };

  test('renders album details correctly', () => {
    render(<AlbumCard {...albumProps} />);

    expect(screen.getByText(albumProps.name)).toBeInTheDocument();
    expect(screen.getByText(/Publicado:/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: albumProps.name })).toHaveAttribute(
      'src',
      albumProps.image,
    );
  });

  test('renders the correct button text and icon when album is not added', () => {
    render(<AlbumCard {...albumProps} />);

    expect(
      screen.getByRole('button', { name: /Add album/i }),
    ).toBeInTheDocument();
  });

  test('renders the correct button text and icon when album is added', () => {
    render(<AlbumCard {...albumProps} isAdded={true} />);

    expect(
      screen.getByRole('button', { name: /Remove album/i }),
    ).toBeInTheDocument();
  });

  test('calls handleClick with correct arguments when button is clicked', () => {
    render(<AlbumCard {...albumProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith({
      albumId: '1',
      isAdded: false,
    });
  });

  test('links should have correct href', () => {
    render(<AlbumCard {...albumProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', albumProps.hrefUrl);
  });
});
