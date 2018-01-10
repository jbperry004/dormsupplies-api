const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
// const items = require('../controllers/items')

router.route('/users')
	.post(users.createUser)
	.get(users.getAllUsers)

router.route('/users/:userId/id')
	.get(users.getUserById)
	.delete(users.deleteUser)
	.put(users.updateUser)

router.route('/users/:email/email')
	.get(users.getUserByEmail)

/* router.route('/items')
	.post(items.createItem)
	.get(items.getAllItems)

router.route('/items/:itemId/id')
	.get(items.getItemById)
	.delete(items.deleteItem)
	.put(items.updateItem)

router.route('/buy/:userId/id')
	.put(users.buyItem) */

module.exports = router

/* 
TODO: 
update user
delete user
get userById
get userBYEmail
*/

/*
* --- Routes for coupons ---
*/