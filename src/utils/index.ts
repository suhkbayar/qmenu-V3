import { SystemType } from '../constants/constant';

export const numberFormat = new Intl.NumberFormat();

export const shuffleArray = (array: any[]) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const parseConfig = (value: string): any | null => {
  try {
    return value === undefined ? null : JSON.parse(value);
  } catch (error) {
    return value;
  }
};

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

export const SystemTypeByPartner = {
  mbank: SystemType.MA,
};

export type PartnerSystemType = typeof SystemTypeByPartner;

export const getPartnerType = () => {
  let item: { token: string; systemType: SystemType } | undefined;

  try {
    const systemType = JSON.parse(localStorage.getItem('systemType'));
    const token = JSON.parse(localStorage.getItem('partnerToken'));
    if (systemType && token) item = { token, systemType };
  } catch (error) {}

  return item;
};

export const setPartnerType = (type: SystemType, token: string): void => {
  try {
    localStorage.setItem('systemType', JSON.parse(type));
    localStorage.setItem('partnerToken', JSON.parse(token));
  } catch (error) {}
};

export const removePartnerType = (): void => {
  localStorage.removeItem('systemType');
  localStorage.removeItem('partnerToken');
};

export const getDateByTime = (time: string, date: Date = new Date()) => {
  const [h, m] = time.split(':');
  return setDateTime(+h, +m, 0, date);
};

const setDateTime = (hours: number, minute: number, second: number, date?: Date) => {
  const futureDate = date ? new Date(date) : new Date();
  futureDate.setHours(hours);
  futureDate.setMinutes(minute);
  futureDate.setSeconds(second);
  return futureDate;
};

export function getClosestTime(timesArray: number[], date: Date): string {
  let result = 0;

  const hours = date.getHours();
  const minute = date.getMinutes();

  for (let i = 0; i < timesArray.length; i++) {
    const currentTime = timesArray[i];
    const nextTime = timesArray[i + 1];
    if (minute >= currentTime && (!nextTime || nextTime > minute)) result = currentTime;
  }

  return `${hours.toString().padStart(2, '0')}:${result.toString().padStart(2, '0')}`;
}
