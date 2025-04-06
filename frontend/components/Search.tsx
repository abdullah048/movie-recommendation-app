'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface ISearchProps {
  className?: string;
  textClassName?: string;
  placeholder?: string;
  icon?: ReactNode;
}

const Search = (props: ISearchProps) => {
  const { className, placeholder, textClassName, icon } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [cameFromDetailPage, setCameFromDetailPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.includes('/movie/')) {
      setCameFromDetailPage(true);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }

      router.replace(`?${params.toString()}`, { scroll: false });

      if (query && !cameFromDetailPage) {
        const popularSection = document.getElementById('popular-section');
        if (popularSection) {
          popularSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cameFromDetailPage, query, router, searchParams]);

  return (
    <div
      className={cn(
        'rounded-8 bg-black-150 p-5 w-full flex gap-2.5 items-center',
        className
      )}>
      {icon && icon}
      <input
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={cn(
          'w-full h-full border-none bg-transparent focus-visible:outline-none placeholder:text-light-gray-100 placeholder',
          textClassName
        )}
      />
    </div>
  );
};

export default Search;
