import Section from '@/components/ui/Section';
import { trendingMovies } from '@/constants';
import Image from 'next/image';

const Trending = () => {
  return (
    <Section title='Trending'>
      <ul className='list-none flex gap-[46px] items-center overflow-x-auto whitespace-nowrap min-w-full hide-scrollbar'>
        {trendingMovies.map(movie => (
          <TrendingMovieItem movie={movie} key={movie.id} />
        ))}
      </ul>
    </Section>
  );
};

export default Trending;

type TrendingMovieItemProps = {
  movie: {
    id: number;
    image: string;
  };
};

const TrendingMovieItem = (props: TrendingMovieItemProps) => {
  const {
    movie: { image, id },
  } = props;
  return (
    <li className='relative flex-shrink-0 gap-12 flex justify-end items-center min-w-[180px]'>
      <h4
        className='trending-number absolute top-1/3 -left-2.5'
        style={{
          WebkitTextStroke: '2px #CECEFB66',
        }}>
        {id}
      </h4>
      <Image
        src={image}
        alt={`image-${id}`}
        width={107}
        height={187}
        className='object-contain rounded-8 relative z-10 h-[187px] w-auto'
      />
    </li>
  );
};
