'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Trailer } from '@/lib/types';
import TrailerModal from './TrailerModal';

type MoviePosterProps = {
  posterPath: string | null;
  name: string;
  backdropPath: string | null;
  trailer: Trailer | null;
};

const MoviePoster = (props: MoviePosterProps) => {
  const { backdropPath, name, posterPath, trailer } = props;
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
        {backdropLoaded && trailer && (
          <TrailerModal name={name} youtubeId={trailer?.key} />
        )}
      </div>
    </div>
  );
};

export default MoviePoster;
