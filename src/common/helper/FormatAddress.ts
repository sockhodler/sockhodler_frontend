export const formatAddress = (
  e: string,
  headLetterCount = 4,
  middleStr = ".",
  middleLetterCount = 4,
  tailLetterCount = 4
) => {
  if (e && typeof e === "string") {
    return `${e.substr(0, headLetterCount)}${middleStr.repeat(
      middleLetterCount
    )}${e.substr(e.length - tailLetterCount, e.length - 1)}`;
  }
  return e;
};
