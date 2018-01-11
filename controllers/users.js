const User = require('../models/schemas/user')
const Item = require('../models/schemas/item')

exports.createUser = (req, res, next) => {


	if (!req.body.email) {
		return res.status(400).send('Must provide email')
	}

	if(!req.body.password) {
		return res.status(400).send('Must provide valid password')
	}

	/*if(typeof(req.body.admin) !== 'boolean') {
		return res.status(400).send("Must provide admin status")
	}*/

	if(!req.body.address) {
		return res.status(400).send("Must provide address")
	}

	if(!req.body.name) {
		return res.status(400).send("Must provide name")
	}

	if(!req.body.year) {
		return res.status(400).send("Must provide class year")
	}

	const userData = {
		email: req.body.email,
		hash: req.body.password,
		//isAdmin: req.body.admin, 
		address: req.body.address, 
		name: req.body.name, 
		classYear: req.body.year
	}

	const newUser = new User(userData)
	newUser.save((err) => {
		if (err) return next(err)
		return res.json(newUser)
	})
}

exports.getAllUsers = (req, res, next) => {
	User.find({}, (err, users) => {
    	if (err) return next(err)
    	return res.json(users)
  	})
}


exports.getUserById = (req, res, next) => {
	User.findById(req.params.userId, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(400).send('No user with id: ' + req.params.userId)
		return res.json(user)
	})
}

exports.getUserByEmail = (req, res, next) => {
	User.findOne({ email: req.params.email }, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(400).send('No user with email: ' + req.params.email)
		return res.json(user)
	})
}

exports.updateUser = (req, res, next) => {
	User.findOneAndUpdate({ _id: req.params.userId}, req.body, {}, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
		return res.json(user)
	})
}

exports.deleteUser = (req, res, next) => {
	User.findByIdAndRemove(req.params.userId, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
		return res.json(user)
	})
}
/* module.exports = {
	createUser: function
} */

exports.buyItem = (req, res, next) => {
	
	let order = {
		items: [],
		purchasedDate: '',
		deliveredDate: '',
		isPaid: false
	}

	for (let i = 0; i < req.body.items.length; i++) {
		Item.findById(req.body.items[i].itemId, (err, item) => {
			if (err) return next(err)
			if (!item) return res.status(400).send('No item with id: ' + req.params.itemId)
			product = res.json(item)
		})

		if (product.quantity < req.body.items[i].quantity) {
			return res.status(404).send('Out of stock!')
		}

		order.items.push(product)
		product.quantity -= req.body.items[i].quantity

		product.MarkModified('quantity')
		product.save((err) => {
			if (err) return next(err)
		})
	}

	User.findById(req.params.userId, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
		customer = res.json(user)
	})

	customer.orders.push(order)

	customer.MarkModified('orders')

	customer.save((err) => {
		if (err) return next(err)
	})

	return order
}
