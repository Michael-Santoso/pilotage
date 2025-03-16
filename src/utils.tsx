// Date Format Utility Functions

export const formatDate = (isoString: string) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

export const formatDateMin = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatTimeDifference = (
  endTime: string,
  startTime: string,
  flag: boolean
) => {
  const end = new Date(endTime);
  const start = new Date(startTime);

  const diffInMs = end.getTime() - start.getTime();

  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  if (flag) {
    return `${hours} hours ${minutes} minutes`;
  } else {
    return hours === 0
      ? `${minutes} minutes`
      : `${hours} hours ${minutes} minutes`;
  }
};
