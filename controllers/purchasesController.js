const userService = require('../services/users');
const purchaseService = require('../services/purchases');
const utilities = require('../utilities/utilities');

/**
 * Gets all purchases and returns function that
 * finds the highest value user
 */
const getHighestValue = () => {
	return purchaseService.getPurchases()
		.then(purchases => {
      return getHighestValueUser(purchases);
    })
}

/**
 * Finds and returns the user that has the highest 
 * total spend among the purchases
 * @param {array} purchases 
 */
const getHighestValueUser = (purchases) => {
  const purchasesOfHighestValueUser = findPurchasesOfHighestValueUser(purchases);
  const highestValueUserTotalSpend = purchasesOfHighestValueUser.totalSpend;

  return userService.getUserById(purchasesOfHighestValueUser.user_id)
    .then(user => {
      const userFullName = `${user.first_name} ${user.last_name}`;
          
      displayHighestValueUserResults(userFullName, highestValueUserTotalSpend);
    });
}

/**
 * Sorts the purchases by users' total spend and then
 * returns the purchase with the highest total value
 * @param {array} purchases 
 */
const findPurchasesOfHighestValueUser = (purchases) => {
  const formattedPurchases = formatPurchases(purchases);
  const purchasesSortedByTotalSpend = sortPurchasesByTotalSpend(formattedPurchases);

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

const formatPurchases = (purchases) => {
  const sortedPurchases = sortPurchasesByUser(purchases);
  const sortedPurchasesWithSumField = addSumFieldToSortedPurchases(sortedPurchases);

  return sortedPurchasesWithSumField;
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

/**
 * Returns an object containing user_id and spend
 * @param {object} purchases 
 */
const groupPurchasesByUser = (purchases) => {
	return purchases.reduce(function (object, item) {
    object[item.user_id] = object[item.user_id] || [];
    object[item.user_id].push(item.spend);
    return object;
  }, {});
}

/**
 * Returns an array of purchases grouped by user
 * @param {object} object 
 */
const convertPurchasesGroupedByUser = (object) => {
  const array = [];

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      array.push({ user_id: key, spends: object[key] });
    }
  }
  return array;
}

/**
 * Adds a totalSpend field to the sortedPurchases array
 * @param {array} sortedPurchases 
 */
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
 * Calls functions to display results
 * @param {object} user 
 * @param {string} highestValueUserTotalSpend 
 */
const displayHighestValueUserResults = (userFullName, highestValueUserTotalSpend) => {
  utilities.displayResult('Highest value user:', userFullName);
  utilities.displayResult('Total user spend:', highestValueUserTotalSpend);
}

module.exports = {
  getHighestValue
}