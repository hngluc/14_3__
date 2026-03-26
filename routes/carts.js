var express = require('express')
var router = express.Router()
let cartController = require('../controllers/carts')
const { checkLogin } = require('../utils/authHandler')

// GET cart of logged-in user
router.get('/', checkLogin, async function (req, res) {
    try {
        let cart = await cartController.GetCartByUser(req.user._id)
        if (!cart) {
            return res.send({ user: req.user._id, items: [] })
        }
        res.send(cart)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// POST add product to cart
router.post('/add', checkLogin, async function (req, res) {
    try {
        let { product, quantity } = req.body
        if (!product) {
            return res.status(400).send({ message: 'Product is required' })
        }
        let cart = await cartController.AddToCart(
            req.user._id, product, quantity || 1
        )
        res.send({ message: 'Added to cart', data: cart })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// PUT update quantity of product in cart
router.put('/update', checkLogin, async function (req, res) {
    try {
        let { product, quantity } = req.body
        if (!product || !quantity) {
            return res.status(400).send({
                message: 'Product and quantity are required'
            })
        }
        let cart = await cartController.UpdateQuantity(
            req.user._id, product, quantity
        )
        res.send({ message: 'Cart updated', data: cart })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// DELETE remove product from cart
router.delete('/remove/:productId', checkLogin, async function (req, res) {
    try {
        let cart = await cartController.RemoveFromCart(
            req.user._id, req.params.productId
        )
        res.send({ message: 'Removed from cart', data: cart })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// DELETE clear entire cart
router.delete('/clear', checkLogin, async function (req, res) {
    try {
        let cart = await cartController.ClearCart(req.user._id)
        res.send({ message: 'Cart cleared', data: cart })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

module.exports = router
