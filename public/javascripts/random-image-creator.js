var randomWords = require('random-words');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

module.exports = function(DimX, DimY){
    return 'http://dummyimage.com/'+DimX+'X'+DimY+'/'+random.hex(6)+'/'+random.hex(6)+'.png&text='+randomWords({ exactly: 2, join:' '});
};





