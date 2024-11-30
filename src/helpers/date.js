import { getMonth, getYear, format } from "date-fns";

const today = new Date();

export const day = parseInt(format(new Date(), "d"));
const month = getMonth(today);
const year = getYear(today);

const currentDay = year > 2024 ? 24 : Math.min(day, 24);
const isAdventOrFuture = year > 2024 || (year === 2024 && month === 11);

export const noOfClickableCards = !isAdventOrFuture ? 0 : currentDay;
