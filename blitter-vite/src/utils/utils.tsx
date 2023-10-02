export const getHumanReadableDate = (date) => {
  const _date = new Date(date);
  return _date.toDateString();
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
