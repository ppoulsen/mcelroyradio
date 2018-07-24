export function formatSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60); 
  
  const paddedHours = hours < 10 ? '0' + hours : hours.toString();
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  const paddedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}