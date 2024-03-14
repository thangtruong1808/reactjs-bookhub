import create from "./http-service";

export interface Genre {
  name: string;
}

export interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  edition: string;
  format: string;
  num_pages: number;
  // genres: Genre[];
  genres: string;
  rating: number;
  image_url: string;
  Quote1: string;
  Quote2: string;
  Quote3: string;
}

export default create("/books?_limit=240");
