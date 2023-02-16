const Timer = (CountDownTimeStamp: string) => {
  const date = new Date(CountDownTimeStamp).getTime();
  const now = new Date().getTime();
  const gap = date - now;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  return { textDay, textHour, textMinute, textSecond };
};

export default Timer;
