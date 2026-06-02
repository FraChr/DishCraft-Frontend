export function useDateTimeUtils() {
  const convertUtcToDate = (utcDateTime: string) => {
    let date = new Date(utcDateTime);
    return date.toLocaleDateString();
  }
  const convertUtcToTime = (utcDateTime: string) => {
    let date = new Date(utcDateTime);
    return date.toLocaleTimeString();
  }



  return {
    convertUtcToDate,
    convertUtcToTime,
  }
}