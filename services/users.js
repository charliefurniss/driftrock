const request = require('request-promise-native');

/**
 * Returns selected user by getting all users and 
 * filtering by email
 * @param {string} email 
 */
const getUserByEmail = (email) => {
	return getUsers()
		.then((users) => {
			const selectedUser = filterUsersByEmail(users, email);

			if (!selectedUser) {
				return {};
			}

			return selectedUser[0];
		})
}

/**
 * Returns selected user by getting all users and 
 * filtering by user_id
 * @param {string} user_id 
 */
const getUserById = (user_id) => {
	return getUsers()
		.then((users) => {
			const selectedUser = filterUsersById(users, user_id);

			return selectedUser[0];
		})
}

/**
 * Returns all users
 */
const getUsers = () => {
	const options = {
		method: 'GET',
		uri: 'https://driftrock-dev-test-2.herokuapp.com/users',
		qs: {
			action: 'query',
			format: 'json',
			per_page: 100000
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

/**
 * Selects and returns user object based on email
 * @param {array} users 
 * @param {string} email 
 */
const filterUsersByEmail = (users, email) => {
	return users.filter(user => user.email === email);
}

/**
 * Selects and returns user object based on user_id
 * @param {array} users 
 * @param {string} user_id 
 */
const filterUsersById = (users, user_id) => {
	return users.filter(user => user.id === user_id);
}

module.exports = {
	getUserByEmail,
	getUserById
}