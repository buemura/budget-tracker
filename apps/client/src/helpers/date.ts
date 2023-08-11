export const formatDate = (date: Date): String => {
  const formattedDate = `${date.toLocaleString("default", {
    month: "short",
  })}/${date.getFullYear()}`;

  return formattedDate;
};
