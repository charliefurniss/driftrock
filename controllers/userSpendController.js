const userService = require('../services/users');
const purchaseService = require('../services/purchases');
const utilities = require('../utilities/utilities');

/**
 * Finds user and returns function to calculate 
 * user spend with the user_id
 * @param {string} email 
 * @param {string} spendType 
 */
const getUserSpend = (email, spendType) => {  
  userService.getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return displayUserSpend('Sorry, we don’t have any data for that user');
      }
      return calculateUserSpend(user.id, spendType);      
    })
    .catch((err) => {
      console.log(err);
    })
}

/**
 * Finds all a user's purchases and returns a function to 
 * display either the average or the total spend, basic on the 
 * value of spendType
 * @param {string} user_id 
 * @param {string} spendType 
 */
const calculateUserSpend = (user_id, spendType) => {
  return purchaseService.getPurchasesByUserId(user_id)
    .then(userPurchases => {
      const label = setSpendLabel(spendType);
      const value = setSpendValue(userPurchases, spendType);

      return displayUserSpend(label, value);
    })
}

/**
 * Returns the relevant label for either total spend 
 * or average spend
 * @param {array} userPurchases 
 * @param {string} spendType 
 */
const setSpendLabel = (spendType) => {
  let label = '';
  if (spendType === 'totalSpend') {
    label = 'Total spend:';
  } 
  if (spendType === 'averageSpend') {
    label = 'Average spend:';
  }
  return label;
}

/**
 * Returns either the total user spend or the average, 
 * depending on the spendType
 * @param {array} userPurchases 
 * @param {string} spendType 
 */
const setSpendValue = (userPurchases, spendType) => {
  const spends = utilities.createSpends(userPurchases);  
  let value = spends && spends.length ? utilities.calculateTotalSpend(spends) : 0;
  
  if (spendType === 'averageSpend') {
    value = (value / spends.length).toFixed(2);
  }

  return value;
}

/**
 * Calls function to display the results
 * @param {string} label 
 * @param {string} value 
 */
const displayUserSpend = (label, value) => {
  utilities.displayResult(label, value);
}

module.exports = {
  getUserSpend
}