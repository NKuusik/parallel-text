export const isNonAlphanumeric = (str) => {
    return /^[^a-zA-Z0-9]+$/.test(str);
  }