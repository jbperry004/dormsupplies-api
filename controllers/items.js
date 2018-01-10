const Item = require('../models/schemas/item')
const User = require('../models/schemas/item')

exports.createItem = (req, res) => {
	if(!req.body.name) {
		return res.status(400).send('Must provide name')
	}

	if(!req.body.price) {
		return res.status(400).send('Must provide price')
	}

	if (!req.body.description) {
		return res.status(400).send('Must provide description')
	}

	if (!req.body.quantity) {
		return res.status(400).send("Must provide quantity")
	}

	if(!req.body.pic) {
		return res.status(400).send("Must provide picture")
	}

	const itemData = {
		name: req.body.name, 
		price: req.body.price,
		description: req.body.description,
		quantity: req.body.quantity, 
		pic: req.body.pic
	}

	const newItem = new Item(itemData)
	newItem.save((err) => {
		if (err) return res.status(500).send('Could not create')
		return res.json(newItem)
	})
}



