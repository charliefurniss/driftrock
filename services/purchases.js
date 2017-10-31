const request = require('request-promise-native');

const getPurchasesByUserId = (user_id) => {
	return getPurchases(user_id)
		.then(purchases => filterPurchasesByUserId(purchases, user_id));
}

const getPurchases = () => {
	const options = {
		method: 'GET',
		uri: 'https://driftrock-dev-test-2.herokuapp.com/purchases',
		qs: {
			action: 'query',
      format: 'json',
      per_page: 10000000
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

const formatPurchases = (purchases) => {
	return purchases.map(purchase => {
		return {
			user_id: purchase.user_id,
			item: purchase.item,
			spend: parseFloat(purchase.spend)
		}
	})
}

const filterPurchasesByUserId = (purchases, user_id) => {
	return purchases.filter(purchase => purchase.user_id === user_id);
}

module.exports = {
	getPurchasesByUserId,
	getPurchases
}
