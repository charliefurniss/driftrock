/**
 * Concatenates results string and displays it in the console
 * @param {string} label 
 * @param {string} value 
 */
const displayResult = (label, value) => {
  let display = label; 
  
  if (value) {
    display = `${label} ${value}`;
  }
  
  console.log(display);  
}

/**
 * Returns an array of floats
 * @param {array} purchases 
 */
const createSpends = (purchases) => {
  return purchases.map(purchase => parseFloat(purchase.spend));
}

/**
 * Calculates the sum of all values in the spends array
 * and returns it as a float rounded to 2 decimal places
 * @param {array} spends 
 */
const calculateTotalSpend = (spends) => {
  const totalSpend = spends.reduce((a, b) => a + b, 0);
  const roundedTotalSpend = (Math.round(totalSpend * 100) / 100).toFixed(2);

  return parseFloat(roundedTotalSpend);
}

module.exports = {
  displayResult,
  calculateTotalSpend,
  createSpends
}