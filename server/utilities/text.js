export const t = (message, args) => {
  if (message === null || message === "") {
    return "";
  }

  if (message.includes("{}") && args !== undefined && args.length) {
    // loop through args and insert substring values
    return args.reduce((finalString, sub) => {
      return finalString.replace("{}", sub);
    }, message);
  }

  return "";
};

const replaceAtIndex = (str, index, sub) => {
  if (index < 0 || index >= str.length) {
    return str; // Or throw an error, depending on your needs
  }

  return str.slice(0, index) + sub + str.slice(index + 1);
};

const findAllIndices = (str, sub) => {
  const indices = [];
  let index = str.indexOf(sub);

  while (index !== -1) {
    indices.push(index);
    index = str.indexOf(sub, index + 1);
  }
  return indices;
};
