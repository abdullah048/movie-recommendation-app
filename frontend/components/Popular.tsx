'use client';

import Section from '@/components/ui/Section';
import { Movie } from '@/lib/types';
import MovieCard from '@/components/MovieCard';
import { AnimatePresence } from 'framer-motion';

type PopularProps = {
  data: {
    movies: Movie[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  } | null;
};

const Popular = (props: PopularProps) => {
  const { data } = props;
  return (
    <Section title='Popular' id='popular-section'>
      <div className='grid gap-x-7 gap-y-6 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <AnimatePresence mode='sync'>
          {data?.movies?.map((movie, index) => (
            <MovieCard key={movie.id} index={index} movie={movie} />
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Popular;
