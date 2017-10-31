const userService = require('../services/users');
const purchaseService = require('../services/purchases');
const utilities = require('../utilities/utilities');


/** TOTAL/AVERAGE SPEND CODE */
const getUserSpend = (email, spendType) => {
  
  userService.getUserByEmail(email)
    .then((user) => {
      return purchaseService.getPurchasesByUserId(user.id)
        .then(userPurchases => {
          displayUserSpend(userPurchases, spendType);
        })      
    })
    .catch((err) => {
      console.log(err);
    })

}

const displayUserSpend = (userPurchases, spendType) => {
  const spends = utilities.createSpends(userPurchases);
  
  if (spendType === 'totalSpend') {
    displayTotalSpend(spends);
  } else if (spendType === 'averageSpend') {
    displayAverageSpend(spends);
  }
}

const displayTotalSpend = (spends) => {
  const userTotalSpend = utilities.calculateTotalSpend(spends);
  
  utilities.displayResult('Total spend:', userTotalSpend);
}

const displayAverageSpend = (spends) => {
  const userAverageSpend = spends && spends.length ? (utilities.calculateTotalSpend(spends) / spends.length) : 0;
  
  utilities.displayResult('Average spend:', userAverageSpend);
}

module.exports = {
  getUserSpend
}