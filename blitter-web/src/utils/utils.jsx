const getHumanReadableDate = (date) => {
  const _date = new Date(date);
  return _date.toDateString();
};
