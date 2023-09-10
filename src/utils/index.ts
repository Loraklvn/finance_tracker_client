export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

type FormatToMoneyOpts = {
  minimumFractionDigits?: number;
};

export const formatToMoney = (
  num: number,
  opts: FormatToMoneyOpts = {}
): string => {
  const { minimumFractionDigits = 2 } = opts;
  return new Intl.NumberFormat(undefined, { minimumFractionDigits }).format(
    num
  );
};
