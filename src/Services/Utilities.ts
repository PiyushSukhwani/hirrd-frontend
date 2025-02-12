const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options = { year: "numeric" as const, month: "short" as const };
  return date.toLocaleString("en-US", options);
};

const timeAgo = (time: string | Date): string => {
  const now = new Date();
  const postedTime = new Date(time);
  const diff = Math.floor((now.getTime() - postedTime.getTime()) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return `${years} years ago`;
};


export { formatDate, timeAgo };
