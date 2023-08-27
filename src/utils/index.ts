export const numberFormat = new Intl.NumberFormat();

export const getTimeDiff = (sk: string): string => {
  const skTimestamp = parseInt(sk, 10);
  const currentTime = new Date().getTime();
  const timeDiffInMs = currentTime - skTimestamp;
  const timeDiffInMinutes = Math.floor(timeDiffInMs / (1000 * 60));
  const timeDiffInHours = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  const timeDiffInDays = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));

  if (timeDiffInMinutes < 60) {
    return `${timeDiffInMinutes} минутын${timeDiffInMinutes !== 1 ? '' : ''} өмнө`;
  } else if (timeDiffInHours < 24) {
    return `${timeDiffInHours} цагийн${timeDiffInHours !== 1 ? '' : ''} өмнө`;
  } else {
    return `${timeDiffInDays} өдрийн${timeDiffInDays !== 1 ? '' : ''} өмнө`;
  }
};
