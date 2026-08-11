import React, { useEffect, useState } from "react";

function getTimeLeft(endsAtUtc) {
  const diff = new Date(endsAtUtc).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Countdown = ({ endsAtUtc, dark }) => {
  const [time, setTime] = useState(() => getTimeLeft(endsAtUtc));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(endsAtUtc)), 1000);
    return () => clearInterval(interval);
  }, [endsAtUtc]);

  const pad = (n) => String(n).padStart(2, "0");

  const textColor = dark ? "text-[#111927] dark:text-white" : "text-white";
  const labelColor = dark
    ? "text-slate-500 dark:text-slate-400"
    : "text-slate-300";

  return (
    <div className="flex items-center gap-3">
      {[
        ["Days", time.days],
        ["Hours", time.hours],
        ["Minutes", time.minutes],
        ["Seconds", time.seconds],
      ].map(([label, value]) => (
        <div key={label} className="text-center">
          <div className={`text-[18px] font-[700] ${textColor}`}>
            {pad(value)}
          </div>
          <div className={`text-[10px] ${labelColor}`}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
