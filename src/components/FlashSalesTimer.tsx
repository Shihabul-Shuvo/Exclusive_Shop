
import { useState, useEffect } from "react";

type TimerProps = {
  endDate: Date;
};

const FlashSalesTimer = ({ endDate }: TimerProps) => {
  const calculateTimeLeft = () => {
    const difference = Number(endDate) - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="text-center">
        <p className="text-xs">Days</p>
        <span className="text-3xl font-bold">{formatTime(timeLeft.days)}
          <span className="text-3xl font-bold">:</span></span>
      </div>
      
      <div className="text-center">
        <p className="text-xs">Hours</p>
        <span className="text-3xl font-bold">{formatTime(timeLeft.hours)}
          <span className="text-3xl font-bold">:</span></span>
      </div>
      
      <div className="text-center">
        <p className="text-xs">Minutes</p>
        <span className="text-3xl font-bold">{formatTime(timeLeft.minutes)}
          <span className="text-3xl font-bold">:</span></span>
      </div>
      
      <div className="text-center">
        <p className="text-xs">Seconds</p>
        <span className="text-3xl font-bold">{formatTime(timeLeft.seconds)}</span>
      </div>
    </div>

  );
};

export default FlashSalesTimer;
