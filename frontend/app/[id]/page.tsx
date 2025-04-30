import { MovieApiResponse } from '@/lib/types';
import { TrendingUp } from 'lucide-react';
import dayjs from 'dayjs';
import MovieDuration from '@/components/MovieDuration';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Badge from '@/components/Badge';
import { convertPriceToMillion } from '@/lib/utils';
import Link from 'next/link';
import MoviePoster from '@/components/MoviePoster';

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

  return (
    <div className='p-6 lg:p-50 min-h-screen bg-black-150'>
      {/* Titles */}
      <div className='flex flex-col-reverse gap-3 sm:flex-row justify-between items-start'>
        <div>
          <h3 className='text-4xl font-bold text-white'>
            {data?.name || 'Movie title'}
          </h3>
          <div className='flex gap-2.5 items-center text-lg text-light-gray-100'>
            <span>{dayjs(data?.releaseDate).year()}</span>
            <span className='text-light-gray-100'>•</span>
            <span>PG-13</span>
            <span className='text-light-gray-100'>•</span>
            <MovieDuration runtime={data?.runtime || null} />
          </div>
        </div>
        <div className='flex gap-2.5'>
          <div className='bg-black-200 py-2 px-4 font-dm-sans text-light-gray-100 text-base rounded-6'>
            <span className='font-semibold text-white'>8.9</span>/10&nbsp;(200K)
          </div>
          <div className='flex gap-2.5 items-center bg-black-200 py-2 px-4 font-dm-sans text-light-gray-100 text-base rounded-6'>
            <TrendingUp className='w-6 h-6' />1
          </div>
        </div>
      </div>
      {/* Posters */}
      <MoviePoster
        posterPath={data?.posterPath || null}
        backdropPath={data?.backdropPath || null}
        name={data?.name || 'movie-name'}
        trailer={data?.trailer || null}
      />
      {/* Relevant Info */}
      <div className='mt-8 flex flex-col gap-5'>
        {/* Genres */}
        <div className='flex flex-col-reverse gap-3.5 justify-between md:flex-row'>
          <div className='flex items-center'>
            <span className='text-light-gray-100 text-lg 425:min-w-20 min-w-[150px]'>
              Genres
            </span>
            <div className='flex gap-2.5 items-center flex-wrap'>
              {data?.genres?.map(genre => (
                <Badge name={genre.name} key={genre.id} />
              ))}
            </div>
          </div>
          {data?.homepageUrl && (
            <Link href={data?.homepageUrl} passHref target='_blank'>
              <Button className='primary-gradient max-w-full w-full md:max-w-[186px] px-5 py-3 text-black-250 text-base font-semibold'>
                Visit Homepage
                <Image
                  src='/arrow-right-black.svg'
                  alt='arrow left'
                  width={22}
                  height={22}
                />
              </Button>
            </Link>
          )}
        </div>
        {/* Overview */}
        <div className='flex 425:flex-col flex-row items-start'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Overview
          </span>
          <span className='max-w-[800px] text-justify'>
            {data?.description}
          </span>
        </div>
        {/* Release Date */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Release Date
          </span>
          <span className='max-w-[800px] text-sm text-primary-50 font-semibold text-justify'>
            {dayjs(data?.releaseDate).format('MMMM D, YYYY')}&nbsp;(Worldwide)
          </span>
        </div>
        {/* Countries */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Countries
          </span>
          <ul className='max-w-[800px] flex gap-2.5 flex-wrap text-sm text-primary-50 font-semibold text-justify'>
            {data?.productionCountries?.map((country, index) => (
              <li key={country.name} className='flex gap-2.5'>
                {country.name}
                {index < data?.productionCountries.length - 1 && (
                  <span className='mx-1 text-light-gray-100'>•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Status */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Status
          </span>
          <span className='max-w-[800px] text-sm capitalize text-primary-50 font-semibold text-justify'>
            {data?.status}
          </span>
        </div>
        {/* Budget */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Budget
          </span>
          <span className='max-w-[800px] text-sm capitalize text-primary-50 font-semibold text-justify'>
            {data?.budget || 0 > 0
              ? convertPriceToMillion(data?.budget || 0)
              : 'Not available'}
          </span>
        </div>
        {/* Revenue */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Revenue
          </span>
          <span className='max-w-[800px] text-sm capitalize text-primary-50 font-semibold text-justify'>
            {data?.revenue || 0 > 0
              ? convertPriceToMillion(data?.revenue || 0)
              : 'Not available'}
          </span>
        </div>
        {/* Tagline */}
        <div className='flex 425:flex-col flex-row 425:items-start items-center'>
          <span className='text-light-gray-100 text-lg min-w-[150px]'>
            Tagline
          </span>
          <span className='max-w-[800px] text-sm capitalize text-primary-50 font-semibold text-justify'>
            {data?.tagline ? data?.tagline : 'Not available'}
          </span>
        </div>
        {/* Production Companies */}
        <div className='flex 425:flex-col flex-row items-start'>
          <span className='text-light-gray-100 text-lg 425:max-w-full min-w-[150px] lg:max-w-[150px] lg:min-w-0'>
            Production Companies
          </span>
          <ul className='max-w-[800px] flex gap-2.5 flex-wrap text-sm text-primary-50 font-semibold text-justify'>
            {data?.productionCompanies?.map((company, index) => (
              <li key={index} className='flex gap-2.5'>
                {company.name}
                {index < data?.productionCompanies.length - 1 && (
                  <span className='mx-1 text-light-gray-100'>•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
