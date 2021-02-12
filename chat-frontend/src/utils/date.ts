import { format, differenceInCalendarDays } from 'date-fns';

const UTC_OFFSET = new Date().getTimezoneOffset() / 60;

export const toLocalTime = (value: Date | string) => {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Date(date.setHours(date.getHours() - UTC_OFFSET));
};

export const formatToShortTime = (date: string | Date): string => {
  const dateToFormat = toLocalTime(date);
  const now = new Date();

  const daysDiff = differenceInCalendarDays(now, dateToFormat);

  if (daysDiff === 0) return format(dateToFormat, 'HH:mm');

  if (daysDiff < 7) return format(dateToFormat, 'iii HH:mm');

  return format(dateToFormat, 'dd.MM.yy HH:mm');
}
