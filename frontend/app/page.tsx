import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';
import Popular from '@/components/Popular';
import Trending from '@/components/Trending';
import { getTrendingPosters, searchMovie } from '@/data/movies';
import { HomeProps } from '@/lib/types';

export default async function Home(props: {
  searchParams: Promise<HomeProps>;
}) {
  const searchParams = await props.searchParams;
  const data = await searchMovie(searchParams);
  const trendingMoviePosters = await getTrendingPosters();

  return (
    <>
      <Hero />
      <Trending trendingPosters={trendingMoviePosters} />
      <Popular data={data} />
      <Pagination pagination={data?.pagination || null} />
    </>
  );
}
