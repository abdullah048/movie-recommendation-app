import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  title: string;
  id?: string;
} & PropsWithChildren;

const Section = ({ className, children, title, id }: Props) => {
  return (
    <section id={id} className={cn('px-5 md:px-20 py-5 md:py-10', className)}>
      <h3 className='font-dm-sans h3-bold'>{title}</h3>
      <div className='pt-9'>{children}</div>
    </section>
  );
};

export default Section;
