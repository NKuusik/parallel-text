// Todo: what we need is actually a regex that fails if a string ONLY consists of non-alphanums.
export const isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9]+$/.test(str);
  }