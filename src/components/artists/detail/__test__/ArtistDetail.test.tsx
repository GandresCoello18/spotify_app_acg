import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArtistsModel } from '@/model/spotify.artist.model';
import { ArtistDetail } from '../ArtistDetail';

const mockArtist: ArtistsModel = {
  name: 'Coldplay',
  images: [{ url: 'https://via.placeholder.com/150', width: 50, height: 50 }],
  popularity: 987654,
  external_urls: {
    spotify: '',
  },
  followers: {
    href: null,
    total: 0,
  },
  genres: [],
  href: 'string',
  id: '12',
  type: 'album',
  uri: '100221',
};

describe('ArtistDetail Component', () => {
  test('renders the component correctly', () => {
    render(<ArtistDetail artist={mockArtist} />);

    expect(screen.getByText(mockArtist.name)).toBeInTheDocument();
    expect(screen.getByText('Artista certificado')).toBeInTheDocument();
  });

  test('renders artist image correctly', () => {
    render(<ArtistDetail artist={mockArtist} />);

    const img = screen.getByRole('img', { name: mockArtist.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockArtist.images[0].url);
  });

  test('displays the correct number of followers and listeners', () => {
    render(<ArtistDetail artist={mockArtist} />);

    expect(
      screen.getByText(
        `Followers: ${mockArtist.followers.total.toLocaleString()}`,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Oyentes mensuales: ${mockArtist.popularity.toLocaleString()}`,
      ),
    ).toBeInTheDocument();
  });

  test('renders certification icon (CheckCircleSvg)', () => {
    render(<ArtistDetail artist={mockArtist} />);
    expect(screen.getByTestId('certified-icon')).toBeInTheDocument();
  });
});
