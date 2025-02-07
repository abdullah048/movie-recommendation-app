import Image from 'next/image';
import Search from '@/components/Search';
import { SearchIcon } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-[url('/BG.png')] bg-cover bg-center w-full min-h-screen px-3 flex flex-col items-center mb-14">
      <div className='flex w-full justify-center pt-[50px]'>
        <Image
          src='/logo.svg'
          alt='logo'
          className='object-contain'
          width={80}
          height={80}
        />
      </div>
      <div className='pt-[70.8px] flex flex-col items-center gap-3 text-center w-full md:max-w-[745px]'>
        <Image
          src='/hero-img.png'
          alt='hero-image'
          width={473}
          height={440}
          className='object-cover w-[472px] h-[282px]'
        />
        <h1 className='font-dm-sans h1-bold'>
          Find{' '}
          <span className='bg-gradient-to-r from-primary-50 to-primary-100 text-transparent bg-clip-text'>
            Movies
          </span>{' '}
          You&apos;ll Love Without the Hassle
        </h1>
      </div>
      <Search
        icon={<SearchIcon className='w-5 h-5 text-primary-100' />}
        className='max-w-[640px] mt-8 min-h-[68px]'
        placeholder='Search through 300+ movies online'
      />
    </div>
  );
};

export default Hero;
