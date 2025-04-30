'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import YoutubePlayer from 'react-youtube';

type TrailerModalProps = {
  youtubeId: string | undefined;
  name: string;
};

export default function TrailerModal(props: TrailerModalProps) {
  const { youtubeId, name } = props;
  const [videoReady, setVideoReady] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer bg-light-gray-50 absolute bottom-[5%] left-[5%] max-w-[185px] max-h-[42px] rounded-45 px-4 py-2 flex gap-2.5 items-center justify-center backdrop-blur-10'>
          <Image src='/play.svg' alt='play-svg' width={24} height={24} />
          <span className='text-white text-base font-semibold'>Trailer</span>
          <span className='text-light-gray-100'>•</span>
          <span>00:31</span>
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-3xl h-screen flex flex-col'>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className='relative w-full h-full'>
          <YoutubePlayer
            className={cn(
              'w-full h-full static',
              !videoReady && 'opacity-0 absolute'
            )}
            videoId={youtubeId}
            opts={{
              width: '100%',
              height: '100%',
            }}
            onReady={() => {
              setVideoReady(true);
            }}
          />
          {!videoReady && (
            <Skeleton className='absolute inset-0 w-full h-full' />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
