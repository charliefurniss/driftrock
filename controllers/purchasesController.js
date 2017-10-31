const userService = require('../services/users');
const purchaseService = require('../services/purchases');
const utilities = require('../utilities/utilities');

const getHighestValue = () => {
	return purchaseService.getPurchases()
		.then(purchases => {
      getHighestValueUser(purchases);
    })
}

const getHighestValueUser = (purchases) => {
  const sortedPurchases = sortPurchasesByUser(purchases);
  const sortedPurchasesWithSumField = addSumFieldToSortedPurchases(sortedPurchases);
  const highestValueUserPurchases = findHighestValueUserPurchases(sortedPurchasesWithSumField);
  const highestValueUserTotalSpend = highestValueUserPurchases.totalSpend;

  return userService.getUserById(highestValueUserPurchases.user_id)
    .then(user => {
      const userFullName = `${user.first_name} ${user.last_name}`;
      
      utilities.displayResult('Highest value user: ', userFullName);
      utilities.displayResult('Total user spend: ', highestValueUserTotalSpend);
    });
}

const addSumFieldToSortedPurchases = (sortedPurchases) => {
  return sortedPurchases.map(item => {
    return {
      user_id: item.user_id,
      spends: item.spends,
      totalSpend: utilities.calculateTotalSpend(item.spends)
    }
  })
}

/**
 * Returns an array of objects [ {user_id: '...', spends: [..., ...]}, etc]
 * @param {object} purchases 
 */
const sortPurchasesByUser = (purchases) => {
  const purchasesGroupedByUser = groupPurchasesByUser(purchases);
  const convertedPurchasesGroupedByUser = convertPurchasesGroupedByUser(purchasesGroupedByUser);

  return convertedPurchasesGroupedByUser;
}

const groupPurchasesByUser = (purchases) => {
	return purchases.reduce(function (object, item) {
    object[item.user_id] = object[item.user_id] || [];
    object[item.user_id].push(item.spend);
    return object;
  }, {});
}

const convertPurchasesGroupedByUser = (object) => {
  const array = [];

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      array.push({ user_id: key, spends: object[key] });
    }
  }
  return array;
}

const findHighestValueUserPurchases = (purchases) => {
  const purchasesSortedByTotalSpend = sortPurchasesByTotalSpend(purchases);

  return purchasesSortedByTotalSpend[0];
}

const sortPurchasesByTotalSpend = (purchases) => {
  return purchases.sort(function (a, b) {
    if (a.totalSpend > b.totalSpend) {
      return -1;
    }
    if (a.totalSpend < b.totalSpend) {
      return 1;
    }
    return 0;
  })
}

module.exports = {
  getHighestValue
}