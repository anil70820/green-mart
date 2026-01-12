"use client";
import { useEffect, useRef, useState } from "react";

const Digit = ({ digit, animate, direction }) => {
  return (
    <span
      className={`
        absolute left-0 right-0 top-0 lg:text-[69px] md:text-5xl text-4xl font-medium font-inter leading-[100%] text-white lg:mt-[9px] mt-3.5
        ${animate ? (direction === "up" ? "animate-slide-in" : "animate-slide-out") : ""}
      `}
    >
      {digit}
    </span>
  );
};

const CountdownItem = ({ value, label }) => {
  const prevValueRef = useRef(value);
  const [digitStates, setDigitStates] = useState(
    value.split("").map(d => ({ current: d, prev: d, changed: false }))
  );

  useEffect(() => {
    const prevDigits = prevValueRef.current.split("");
    const currentDigits = value.split("");

    const updated = currentDigits.map((digit, i) => {
      const changed = digit !== prevDigits[i];
      return {
        current: digit,
        prev: changed ? prevDigits[i] : digit,
        changed,
      };
    });

    setDigitStates(updated);
    prevValueRef.current = value;

    const timeout = setTimeout(() => {
      setDigitStates(digits =>
        digits.map(d => ({
          ...d,
          prev: d.current,
          changed: false,
        }))
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="text-center lg:w-[82px] md:w-16 w-12">
      <div className="flex justify-center lg:gap-0.5">
        {digitStates.map((d, index) => (
          <div key={index} className="relative lg:h-[84px] h-16 object-bottom w-full overflow-hidden">
            {d.changed && <Digit digit={d.prev} animate={true} direction="down" />}
            <Digit digit={d.current} animate={d.changed} direction="up" />
          </div>
        ))}
      </div>
      <div className="text-[10px] text-white uppercase font-inter font-normal leading-[100%] -mt-px">{label}</div>
    </div>
  );
};

// 🔁 Countdown Container Component with Restart Logic
export default function DealsCountDown({ countDownTime }) {
  const [time, setTime] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [targetDate, setTargetDate] = useState(new Date(countDownTime).getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      let timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        // 🔁 Restart countdown by adding 24 hours
        const nextTarget = now + 24 * 60 * 60 * 1000;
        setTargetDate(nextTarget);
        timeLeft = nextTarget - now;
      }

      const hrs = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((timeLeft / (1000 * 60)) % 60);
      const secs = Math.floor((timeLeft / 1000) % 60);

      setTime({
        hours: String(hrs).padStart(2, "0"),
        minutes: String(mins).padStart(2, "0"),
        seconds: String(secs).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="bg-green-700 text-white lg:p-5 p-3 sm:rounded-tl-3xl !rounded-none !rounded-tl-2xl inline-flex items-center justify-center lg:gap-10 gap-5">
      <CountdownItem value={time.hours} label="HOURS" />
      <CountdownItem value={time.minutes} label="MINUTES" />
      <CountdownItem value={time.seconds} label="SECONDS" />
    </div>
  );
}
