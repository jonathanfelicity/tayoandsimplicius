import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownTimerProps {
  targetDate: string; // ISO format
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center min-w-[55px] sm:min-w-[60px]">
      <span className="text-3xl sm:text-5xl font-light text-amber-50 serif-font tracking-tight tabular-nums animate-reveal">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[9px] sm:text-xs uppercase tracking-widest text-teal-200/50 mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-xl sm:text-2xl font-light text-amber-200/20 mt-1 sm:mt-2 animate-reveal delay-100">:</span>
  );

  return (
    <div className="w-full">
      <p className="text-center text-xs sm:text-sm uppercase tracking-widest text-amber-100/60 mb-6 font-light animate-reveal delay-300">
        Countdown to Our Day
      </p>
      <div className="flex justify-center gap-3 sm:gap-8 items-start text-center">
        <Item value={timeLeft.days} label="Days" />
        <Separator />
        <Item value={timeLeft.hours} label="Hours" />
        <Separator />
        <Item value={timeLeft.minutes} label="Mins" />
        <Separator />
        <Item value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default CountdownTimer;