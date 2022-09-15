export function convertMinutesToHourString(minutesAmount: number) {
  const total = Number(minutesAmount);

  const rest = total % 60;
  const hours = (total - rest)/60;
  const minutes = rest;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}