import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';
import Popular from '@/components/Popular';
import Trending from '@/components/Trending';
import { MoviesApiResponse } from '@/lib/types';

export default async function Home(props: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const searchParams = await props.searchParams;
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

  return (
    <>
      <Hero />
      <Trending />
      <Popular data={data} />
      <Pagination pagination={data?.pagination || null} />
    </>
  );
}
