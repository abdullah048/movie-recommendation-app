'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useMemo } from 'react';

dayjs.extend(duration);

type MovieDurationProps = {
  runtime: number | null;
};

const MovieDuration = ({ runtime }: MovieDurationProps) => {
  const formattedMovieDuration = useMemo(() => {
    const minutes = runtime || 116;
    const dur = dayjs.duration(minutes, 'minutes');

    const hours = dur.hours();
    const mins = dur.minutes();

    return `${hours}h ${mins}m`;
  }, [runtime]);
  return <span>{formattedMovieDuration}</span>;
};

export default MovieDuration;
