import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ISearchProps {
  className?: string;
  textClassName?: string;
  placeholder?: string;
  icon?: ReactNode;
}

const Search = (props: ISearchProps) => {
  const { className, placeholder, textClassName, icon } = props;
  return (
    <div
      className={cn(
        'rounded-8 bg-black-150 p-5 w-full flex gap-2.5 items-center',
        className
      )}>
      {icon && icon}
      <input
        placeholder={placeholder}
        className={cn(
          'w-full h-full border-none bg-transparent focus-visible:outline-none placeholder:text-light-gray-100 placeholder',
          textClassName
        )}
      />
    </div>
  );
};

export default Search;
