export type MoviesApiResponse = {
  success: boolean;
  data: {
    movies: Movie[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export type Genre = {
  id: string;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
};

export type Movie = {
  id: string;
  name: string;
  externalId: string;
  genres: Genre[];
  description: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  searchCount: string;
  budget: number;
  homepageUrl: string | null;
  imdbId: string | null;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCompany[];
  revenue: number;
  status: string | null;
  tagline: string | null;
  runtime: number | null;
  trailer: Trailer | null;
};

export type MovieApiResponse = {
  success: boolean;
  data: Movie;
};
