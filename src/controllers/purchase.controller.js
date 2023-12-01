const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const result = await Purchase.findAll({ where: {userId: userId},
        where: {userId: req.user.id},
        include: [{
        model: Product,
        include: [Image]
        }]});
    return res.json(result)
});

const create = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where: {userId: req.user.id},
        attributes: ["userId", "productId", "quantity"],
        raw: true
    });
    await Purchase.bulkCreate(cart);
    await Cart.destroy({where: {userId: req.user.id}})
    return res.json(cart)
});

module.exports = {
    getAll,
    create
}

