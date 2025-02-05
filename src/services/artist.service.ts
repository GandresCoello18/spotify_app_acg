import { AddAlbum, RemoveAlbum } from '@/api/spotify.album.api';
import { toast } from 'react-toast';

export const fetchActionAlbum = async (options: {
  userToken: string;
  albumId: string;
  isAdded: boolean;
}) => {
  const { userToken, albumId, isAdded } = options;
  try {
    if (isAdded) {
      await RemoveAlbum({ token: userToken, ids: [albumId] });
      toast.success('Album removido');
    } else {
      await AddAlbum({ token: userToken, ids: [albumId] });
      toast.success('Album guardado');
    }
    return true;
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
      return false;
    }
  }
};
