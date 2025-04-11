import { MovieApiResponse } from '@/lib/types';

type MovieDetailPageProps = {
  id: string;
};

export default async function MovieDetailPage(props: {
  params: Promise<MovieDetailPageProps>;
}) {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let data = null;
  try {
    const res = await fetch(`${baseUrl}/movies/${params.id}`, {
      cache: 'no-store',
    });
    const response = (await res.json()) as MovieApiResponse;
    if (response.success) {
      data = response.data;
    }
  } catch (error) {
    console.warn('Error while fetching movie details: ' + error);
  }
  return <div className='p-6 lg:p-50'>{JSON.stringify(data)}</div>;
}
