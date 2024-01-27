import dayjs from "dayjs";
export default function getRegularTime(time?: Date) {
  return dayjs(time).format("dddd, MMMM D, YYYY h:mm A");
}
