import {
  HomeProps,
  MovieApiResponse,
  MoviesApiResponse,
  TrendingPostersApiResponse,
} from '@/lib/types';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const searchMovie = async (searchParams: HomeProps) => {
  try {
    let data = null;
    const page = parseInt(searchParams.page ?? '1', 10);
    const search = searchParams.search ?? '';
    const res = await fetch(`${baseUrl}/movies?search=${search}&page=${page}`, {
      cache: 'no-store',
    });
    const response = (await res.json()) as MoviesApiResponse;
    if (response.success) {
      data = response.data;
    }

    return data;
  } catch (error) {
    console.warn('Error while fetching movies list: ' + error);
    return null;
  }
};

export const getMovieById = async (id: string) => {
  try {
    let data = null;
    const res = await fetch(`${baseUrl}/movies/${id}`, {
      cache: 'no-store',
    });
    const response = (await res.json()) as MovieApiResponse;
    if (response.success) {
      data = response.data;
    }

    return data;
  } catch (error) {
    console.warn('Error while fetching movies list: ' + error);
    return null;
  }
};

export const getTrendingPosters = async () => {
  try {
    let data = null;
    const res = await fetch(`${baseUrl}/movies/trending-posters`, {
      cache: 'no-store',
    });
    const response = (await res.json()) as TrendingPostersApiResponse;
    if (response.success) {
      data = response.data;
    }

    return data;
  } catch (error) {
    console.warn('Error while fetching trending poster list: ' + error);
    return null;
  }
};

export const incrementViewCount = async (id: string) => {
  try {
    await fetch(`${baseUrl}/movies/search-count`, {
      method: 'PATCH',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.warn('Error while incrementing view count: ' + error);
  }
};
