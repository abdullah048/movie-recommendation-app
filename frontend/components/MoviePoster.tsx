'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type MoviePosterProps = {
  posterPath: string | null;
  name: string;
  backdropPath: string | null;
};

const MoviePoster = (props: MoviePosterProps) => {
  const { backdropPath, name, posterPath } = props;
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  return (
    <div className='mt-8 flex gap-6'>
      {!posterLoaded && (
        <Skeleton className='w-full h-auto hidden 1440:basis-1/3 425:flex 425:w-full 1440:flex aspect-2/3' />
      )}
      <Image
        className={cn(
          'aspect-2/3 1440:basis-1/3 hidden 425:flex 425:w-full 1440:flex object-cover rounded-10',
          posterLoaded ? 'opacity-100 static' : 'opacity-0 absolute'
        )}
        src={posterPath ?? '/No-Poster.png'}
        alt={name || 'no-poster'}
        width={302}
        height={441}
        onLoad={() => setPosterLoaded(true)}
      />
      <div className='relative w-full h-full 425:hidden'>
        {!backdropLoaded && <Skeleton className='w-full h-auto aspect-video' />}
        <Image
          className={cn(
            'aspect-video object-cover w-full h-full rounded-10',
            backdropLoaded ? 'opacity-100 static' : 'opacity-0 absolute'
          )}
          src={backdropPath ?? '/No-backdrop.png'}
          alt={name || 'no-poster'}
          width={772}
          height={441}
          onLoad={() => setBackdropLoaded(true)}
        />
        {backdropLoaded && (
          <div className='cursor-pointer bg-light-gray-50 absolute bottom-[5%] left-[5%] max-w-[185px] max-h-[42px] rounded-45 px-4 py-2 flex gap-2.5 items-center justify-center backdrop-blur-10'>
            <Image src='/play.svg' alt='play-svg' width={24} height={24} />
            <span className='text-white text-base font-semibold'>Trailer</span>
            <span className='text-light-gray-100'>•</span>
            <span>00:31</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePoster;
