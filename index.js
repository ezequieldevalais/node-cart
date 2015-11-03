var express = require('express');
var cart = require('./cart.js');
var app = express();

app.get('/product', function (req, res) {
  	res.send(cart.getProducts());
});

app.get('/product/:id', function (req, res) {
	id = req.param("id");
  	res.send(cart.getProduct(id));
});

app.get('/cart/:id', function (req, res) {
	id = req.param("id");
  	res.send(cart.getCart(id));
});

app.get('/cart/:cartId/add/:productId', function (req, res) {
	cartId = req.param("cartId");
	productId = req.param("productId");
	aCart = cart.addProductToCart(cartId,productId);
	res.send(aCart);
});

app.get('/cart/:cartId/delete/:productId', function (req, res) {
	cartId = req.param("cartId");
	productId = req.param("productId");
	aCart = cart.removeProductFromCart(cartId,productId);
	res.send(aCart);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
