'use client';

import { Movie } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type MovieCardProps = {
  movie: Movie;
  index: number;
};

const MovieCard = ({ movie, index }: MovieCardProps) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      onClick={() => router.push(`/${movie.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      custom={index}
      className='bg-black-150 relative cursor-pointer text-white p-5 rounded-2xl flex flex-col gap-3 bg-shadow'>
      {!loaded && <Skeleton className='w-full h-auto aspect-2/3' />}
      <Image
        className={cn(
          'w-full h-auto object-contain rounded-8',
          loaded ? 'opacity-100 static' : 'opacity-0 absolute'
        )}
        src={movie.posterPath ?? '/No-Poster.png'}
        alt={movie.name}
        width={264}
        height={170}
        onLoad={() => setLoaded(true)}
      />
      <div className='w-full flex flex-col gap-3'>
        <h5 className='h5-bold'>{movie.name}</h5>
        <span className='flex gap-1 items-baseline text-light-gray-300'>
          {movie.genres
            .slice(0, 2)
            .map(genre => genre.name)
            .join(' • ')}
        </span>
      </div>
    </motion.div>
  );
};

export default MovieCard;
