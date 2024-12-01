import { getMonth, getYear, format } from "date-fns";

const today = new Date();

export const day = parseInt(format(new Date(), "d"));
const month = getMonth(today);
const year = getYear(today);

const currentDay = year > 2024 ? 24 : Math.min(day, 24);
const isAdventOrFuture = year > 2024 || (year === 2024 && month === 11);

// Use dynamic URL to check whether i have developed the next card
const nextCardExists =
  new URL(`../assets/${currentDay}/regular.png`, import.meta.url).pathname
    .split("/")
    .reverse()[0] !== "undefined";

export const noOfClickableCards =
  !isAdventOrFuture || !nextCardExists ? 0 : currentDay;
