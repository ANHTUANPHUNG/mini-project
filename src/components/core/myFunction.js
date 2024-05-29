export function dateTimeNow() {
    const today = new Date();
      let date =
        `${today.getFullYear()}-` +
        `${today.getMonth() + 1}-` +
        `${today.getDate()} ` +
        `${today.getHours()}:` +
        `${today.getMinutes()}:` +
        `${today.getSeconds()}`;
        return date
  }
export function convertDateToString(date) {
      let day=  `${date.getFullYear()}-` +
        `${date.getMonth() + 1}-` +
        `${date.getDate()}` 
        return day
  }
export function formatDate(dateTime) {
  const [date, time] = dateTime.split(" ");
  return date;
}
export function  convertDateTime(date) {
  const [datePart, timePart] = date.split(" ");
  const b = datePart.split("-");
  const c = timePart.split(":");
  return new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2]);
}
export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}