'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PageLoading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <DotLottieReact src='/loading-elephant.lottie' loop autoplay />
    </div>
  );
};

export default PageLoading;
