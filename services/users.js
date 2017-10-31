const request = require('request-promise-native');

const getUserByEmail = (email) => {
	return getUsers()
		.then((users) => {
			const selectedUser = filterUsersByEmail(users, email);
			return selectedUser[0];
		})
}

const getUserById = (user_id) => {
	return getUsers()
		.then((users) => {
			const selectedUser = filterUsersById(users, user_id);

			return selectedUser[0];
		})
}

const getUsers = () => {
	const options = {
		method: 'GET',
		uri: 'https://driftrock-dev-test-2.herokuapp.com/users',
		qs: {
			action: 'query',
			format: 'json',
			per_page: 10000000
		},
		json: true
	}

	return request(options)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err)
		})
}

const filterUsersByEmail = (users, email) => {
	return users.filter(user => user.email === email);
}

const filterUsersById = (users, user_id) => {
	return users.filter(user => user.id === user_id);
}

module.exports = {
	getUserByEmail,
	getUserById
}