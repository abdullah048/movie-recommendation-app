'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
};

const Pagination = ({ pagination }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='mt-9 mb-10 flex justify-between items-center px-5 md:px-20'>
      <button
        className='bg-black-150 bg-shadow w-14 h-14 p-3 rounded-8 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}>
        <Image
          src='/arrow-right.svg'
          alt='arrow right'
          width={32}
          height={32}
          className='w-full h-full object-contain'
        />
      </button>
      <p>
        <span className='text-white'>{currentPage}</span>
        <span className='text-light-gray-300'>&nbsp;/&nbsp;{totalPages}</span>
      </p>
      <button
        className='bg-black-150 bg-shadow w-14 h-14 p-3 rounded-8 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentPage >= totalPages}
        onClick={() => updatePage(currentPage + 1)}>
        <Image
          src='/arrow-left.svg'
          alt='arrow left'
          width={32}
          height={32}
          className='w-full h-full object-contain'
        />
      </button>
    </div>
  );
};

export default Pagination;
