type BadgeProps = {
  name: string;
};

const Badge = ({ name }: BadgeProps) => {
  return (
    <span className='rounded-6 bg-black-200 px-[18px] py-[3.5px] text-white font-semibold text-base'>
      {name}
    </span>
  );
};

export default Badge;
