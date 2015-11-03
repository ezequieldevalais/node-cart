var events = require('events');
var eventEmitter = new events.EventEmitter();

var products = [
	{ id: 1, name: 'remera', price: 100},
	{ id: 2, name: 'remera estampada', price: 150},
	{ id: 3, name: 'remera simple', price: 80},
	{ id: 4, name: 'remera multicolor', price: 165}
];

var carts = {};

var getProducts = function getProducts() {
	 return  products;
};

var getProduct = function getProduct(id) {
	 return  products[id];
};

var addProductToCart = function addProductToCart(cartId,productId) {
	if(!carts[cartId]) {
		carts[cartId] = {};
	}
	//validar productID
	if(!getProduct(productId)) {
		return carts[cartId];
	}

	if(carts[cartId][productId]) {
		carts[cartId][productId]['quantity']++;
	}else{
		carts[cartId][productId] = {quantity: 1, product: getProduct(productId)};

		var data = {
			cart: cartId,
			product: productId
		}
		eventEmitter.emit('add_product_to_cart',data);
	}

	return carts[cartId];
};

var removeProductFromCart = function removeProductFromCart(cartId,productId) {
	if(!carts[cartId]) {
		carts[cartId] = {};
	}
	delete carts[cartId][productId];
	return carts[cartId];
};


var getCart = function getCart(cartId) {
	return carts[cartId];
};



exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.addProductToCart = addProductToCart;
exports.removeProductFromCart = removeProductFromCart;
exports.getCart = getCart;
exports.eventEmitter = eventEmitter;


eventEmitter.on('add_product_to_cart', function (data){
	console.log('add product: ' + data['product'] + ', to cart: ' + data['cart']);
});