var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
var ImageGenerator = require('../public/javascripts/random-image-creator');


router.route('/')
    .all(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-type');

        if (typeof localStorage === "undefined" || localStorage === null) {
            localStorage = new LocalStorage('./scratch');
        }
        next();
    })

    .get(function (req, res, next) {
       
        products = [];
        products = JSON.parse(localStorage.getItem('products'));
        if (req.query.productName !== undefined) {
            term = req.query.productName.toString().toLowerCase();
            products = products.filter((p) => {
                return p['productName'].toLowerCase().includes(term);
            });
        }
        res.send(products);
    })

    .post(function (req, res, next) {
        req.body['imageUrl'] = ImageGenerator(64, 64);
        var products = JSON.parse(localStorage.getItem('products'));
        if (products === undefined || products === null) {
            products = [];
        }
        products.push(req.body);
        localStorage.setItem('products', JSON.stringify(products));
        res.send(req.body);
    })

    .options(function (req, res, next) {
        res.writeHead(200, {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        //    'Access-Control-Allow-Headers': 'content-type'
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
        var products = JSON.parse(localStorage.getItem('products'));
        var product = products.filter((p) => p['productName'] === req.params.name)[0];

        // var product = JSON.parse(localStorage.getItem(req.params.name));
        res.send(product);
    })

    .put(function (req, res, next) {
        var newProduct = req.body;
        
        var products = JSON.parse(localStorage.getItem('products'));
        console.log(products)
        for (var i = 0; i < products.length; i++) {            
            if (products[i]['productName'] === newProduct['productName']) {                
                products[i] = newProduct;
                break;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
        res.send(newProduct);
    })

    .delete(function (req, res, next) {
        var products = JSON.parse(localStorage.getItem('products'));
        for (var i = 0; i < products.length; i++) {
            if (products[i]['productName'] === req.params.name) {
                products.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
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