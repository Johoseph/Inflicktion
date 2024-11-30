export const getCardDimensions = (desiredHeight, cardOverlap) => {
  const width = Math.round(desiredHeight * (2.5 / 3.5)); // 3.5 x 2.5 card ratio
  const marginRight = cardOverlap ? `-${cardOverlap}px` : undefined;

  return {
    width: `${width}px`,
    height: `${desiredHeight}px`,
    marginRight,
  };
};

export const CARD_BACK = `<p>back</p>`;
