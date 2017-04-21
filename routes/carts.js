var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;

router.route('/')
    .all(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-type');

        if (typeof localStorage === "undefined" || localStorage === null) {
            localStorage = new LocalStorage('./scratch');
        }

        next();
    })

    .get(function(req,res,next){       
        var cart = JSON.parse(localStorage.getItem('cart'));
        res.send(cart);
    })

    .post(function (req, res, next) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === undefined || cart === null) {
            cart = [];
        }
        cart.push(req.body);
        localStorage.setItem('cart', JSON.stringify(cart));
        res.send(req.body);
    })

    .options(function (req, res, next) {
        res.writeHead(200, {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'content-type'
        });
        res.end();
    });

router.route('/:name')
    .all(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-type');

        if (typeof localStorage === "undefined" || localStorage === null) {
            localStorage = new LocalStorage('./scratch');
        }

        next();
    })

    .get(function (req, res, next) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var product = cart.filter((p) => p['productName'] === req.params.name)[0];
        if(product === undefined){
            product = {};
        }
        
        res.send(product);
    })

    .delete(function(req,res,next){
        var cart = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]['productName'] === req.params.name) {
                cart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        res.end("success");
    })

    .options(function (req, res, next) {
        res.writeHead(200, {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'content-type'
        });
        res.end();
    });

module.exports = router;
