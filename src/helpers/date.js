import { getMonth, getYear, format } from "date-fns";

const today = new Date();

const day = parseInt(format(new Date(), "d"));
const month = getMonth(today);
const year = getYear(today);

const currentDay = year > 2024 ? 24 : Math.min(day, 24);
const isAdventOrFuture = year > 2024 || (year === 2024 && month === 11);

// Use dynamic URL to check whether i have developed the next card
let pastAdventClickableCards = currentDay;

for (let dayToCheck = currentDay; dayToCheck > 0; dayToCheck--) {
  const cardToCheck = new URL(
    `../assets/${dayToCheck}/regular.png`,
    import.meta.url
  );
  new URL(`../assets/${dayToCheck}/large.png`, import.meta.url);

  const nextCardExists =
    cardToCheck.pathname.split("/").reverse()[0] !== "undefined";

  if (!nextCardExists) pastAdventClickableCards--;
}

export const noOfClickableCards = !isAdventOrFuture
  ? 0
  : pastAdventClickableCards;
