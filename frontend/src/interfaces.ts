export interface IArtist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  type: string;
  genres: Array<string>;
}

export interface IMe {
  id: string;
  name: string;
  email: string;
  spotifyId: string;
  images: Array<{ url: string }>;
}
