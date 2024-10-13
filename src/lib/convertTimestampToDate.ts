export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const readableDate = date.toISOString().replace('T', ' ').substring(0, 19);

  return readableDate;
};
