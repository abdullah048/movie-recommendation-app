'use client';

import Section from '@/components/ui/Section';
import { TrendingPoster } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type TrendingProps = {
  trendingPosters: TrendingPoster[] | null;
};

const Trending = (props: TrendingProps) => {
  const { trendingPosters } = props;
  return (
    <Section title='Trending'>
      <ul className='list-none flex gap-[46px] items-center overflow-x-auto whitespace-nowrap min-w-full hide-scrollbar'>
        <AnimatePresence mode='sync'>
          {trendingPosters?.map((movie, index) => (
            <TrendingMovieItem movie={movie} key={movie.id} number={index} />
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
};

export default Trending;

type TrendingMovieItemProps = {
  movie: {
    id: string;
    posterPath: string | null;
  };
  number: number;
};

const TrendingMovieItem = (props: TrendingMovieItemProps) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const {
    movie: { posterPath, id },
    number,
  } = props;
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      custom={number}
      className='relative flex-shrink-0 gap-12 flex justify-end items-center min-w-[180px]'>
      <h4
        className='trending-number absolute top-1/3 -left-2.5'
        style={{
          WebkitTextStroke: '2px #CECEFB66',
        }}>
        {number + 1}
      </h4>
      {!loaded && <Skeleton className='w-auto h-[187px] aspect-2/3' />}
      <Image
        onClick={() => router.push(`/${id}`)}
        src={posterPath ?? '/No-Poster.png'}
        alt={`image-${id}`}
        width={107}
        height={187}
        onLoad={() => setLoaded(true)}
        className={cn(
          'object-contain cursor-pointer rounded-8 relative z-10 h-[187px] w-auto',
          loaded ? 'opacity-100 static' : 'opacity-0 absolute'
        )}
      />
    </motion.li>
  );
};
