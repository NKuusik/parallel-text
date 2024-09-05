import papaparse from 'papaparse'

export async function readCSV(input) {
  return new Promise((resolve) => {
    papaparse.parse(input, {
      complete: function(results) {
        return resolve(results);
      }
    });
  });
}
