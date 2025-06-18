type EmptyStateProps = {
  text: string;
};

const EmptyState = (props: EmptyStateProps) => {
  const { text } = props;
  return (
    <p className='font-bold text-center text-slate-500 text-xl md:text-3xl'>
      {text}
    </p>
  );
};

export default EmptyState;
