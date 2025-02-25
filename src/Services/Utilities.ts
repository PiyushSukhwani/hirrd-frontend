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
  if (days < 30) return `${days} ${days > 1 ? "days ago" : "day ago"}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return `${years} years ago`;
};

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function formatInterviewTime(dateString: any) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function openResume(base64String:string) {
  // Remove 'data:application/pdf;base64,' if present
  const base64WithoutPrefix = base64String.split(',').pop();

  // Convert Base64 to binary
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  // Generate URL & Open in new tab
  const blobUrl = URL.createObjectURL(blob);
  console.log(blobUrl);

  window.open(blobUrl, '_blank');
}



export { formatDate, timeAgo, getBase64, formatInterviewTime, openResume };
