export const getValidDate = (prop: string) =>
  new Date(prop).toDateString() === 'Invalid Date'
    ? '-'
    : new Date(prop).toDateString();
