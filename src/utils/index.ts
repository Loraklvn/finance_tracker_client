export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

type FormatToMoneyOpts = {
  minimumFractionDigits?: number;
};

/**
 * Formats a number as a money string with optional minimum fraction digits.
 *
 * @param {number} num - The number to be formatted as money.
 * @param {FormatToMoneyOpts} [opts] - Optional formatting options.
 * @param {number} [opts.minimumFractionDigits=2] - The minimum number of fraction digits to include.
 * @returns {string} The formatted money string.
 */
export const formatToMoney = (
  num: number,
  opts: FormatToMoneyOpts = {}
): string => {
  const { minimumFractionDigits = 2 } = opts;
  return new Intl.NumberFormat(undefined, { minimumFractionDigits }).format(
    num
  );
};

/**
 * Generates a random hexadecimal color code (e.g., "#RRGGBB").
 *
 * @returns {string} A randomly generated color code in the format "#RRGGBB".
 */
export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Formats a Date object as a string in the "Month Day, Year" format (e.g., "January 23, 2023").
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} The formatted date string.
 */
export const getDisplyDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getFirstDayOfMonthDate = (date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Formats a Date object as a string in the "YYYY-MM-DD" format.
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} The formatted date string in "YYYY-MM-DD" format.
 */
export const getFilterDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
