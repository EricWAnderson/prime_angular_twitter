var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/adjectives', function(request, response){
    console.log('adjectives');
    response.sendFile(path.join(__dirname, '../public/assets/adjectives.json'));
});

router.get('/nouns', function(request, response){
    console.log('nouns');
    response.sendFile(path.join(__dirname, '../public/assets/nouns.json'));
});

router.get('/', function(request, response){
   response.sendFile(path.join(__dirname, '../public/views/index.html'));
    console.log('index hit');
});

module.exports = router;