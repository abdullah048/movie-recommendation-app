import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';
import Popular from '@/components/Popular';
import Trending from '@/components/Trending';
import { MoviesApiResponse } from '@/lib/types';

type HomeProps = { search?: string; page?: string };

export default async function Home(props: {
  searchParams: Promise<HomeProps>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const searchParams = await props.searchParams;
  let data = null;

  try {
    const page = parseInt(searchParams.page ?? '1', 10);
    const search = searchParams.search ?? '';
    const res = await fetch(`${baseUrl}/movies?search=${search}&page=${page}`, {
      cache: 'no-store',
    });
    const response = (await res.json()) as MoviesApiResponse;
    if (response.success) {
      data = response.data;
    }
  } catch (error) {
    console.warn('Error while fetching movies list: ' + error);
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
