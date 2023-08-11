export const formatDate = (date: Date): string => {
  const formattedDate = `${date.toLocaleString('default', {
    month: 'short'
  })}/${date.getFullYear()}`;

  return formattedDate;
};
