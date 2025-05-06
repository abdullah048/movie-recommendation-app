'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SearchNotFound() {
  return (
    <div className='h-auto flex items-center justify-center w-full'>
      <DotLottieReact src='/search-not-found.lottie' loop autoplay />
    </div>
  );
}
