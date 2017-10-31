const displayResult = (label, value) => {
  console.log(`${label} ${value}`);  
}

const createSpends = (purchases) => {
  return purchases.map(purchase => parseFloat(purchase.spend));
}

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