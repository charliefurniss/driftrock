const request = require('request-promise-native');

/**
 * Returns an array of a user's purchases by getting all
 * purchases and then filtering by user_id
 * @param {string} user_id 
 */
const getPurchasesByUserId = (user_id) => {
	return getPurchases(user_id)
		.then(purchases => filterPurchasesByUserId(purchases, user_id));
}

/**
 * Returns purchases based on per_page value
 */
const getPurchases = () => {
	const options = {
		method: 'GET',
		uri: 'https://driftrock-dev-test-2.herokuapp.com/purchases',
		qs: {
			action: 'query',
      format: 'json',
      per_page: 100000
		},
		json: true
	};

	return request(options)
		.then(res => {
			return formatPurchases(res.data);
		})
		.catch(err => {
			console.log(err)
		})
}

/**
 * Returns an array of purchase objects in which
 * the spend value is converted from a string to a float
 * @param {array} purchases 
 */
const formatPurchases = (purchases) => {
	return purchases.map(purchase => {
		return {
			user_id: purchase.user_id,
			item: purchase.item,
			spend: parseFloat(purchase.spend)
		}
	})
}

/**
 * Returns an array of purchases with the same user_id
 * @param {array} purchases 
 * @param {string} user_id 
 */
const filterPurchasesByUserId = (purchases, user_id) => {
	return purchases.filter(purchase => purchase.user_id === user_id);
}

module.exports = {
	getPurchasesByUserId,
	getPurchases
}
