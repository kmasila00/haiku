var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
  var lines = data.toString().split("\n")
  var wordsArr = [];
  lines.forEach(function(line){    
    wordsArr.push(line.split("  "));
  });
  return wordsArr;
}

var wordsArr = formatData(cmudictFile);

var syllArr = [];

wordsArr.forEach(function(str){
	var sCheck = str[1].match(/\d+/g);
	if (sCheck !== null){
		var sCount = sCheck.length;
		if( !Array.isArray(syllArr[sCount]) ){
			syllArr[sCount] = [str[0]];
		} else {
			syllArr[sCount].push(str[0]);
		}
	}
	
})

function createHaiku(structure){
	console.log("This haiku has the structure " + structure);
	var lineArr;
	structure.forEach(function(line){
		lineArr = [];
		line.forEach(function (word){
			lineArr.push( syllArr[word][Math.floor(Math.random()*syllArr[word].length)] )
		})
		console.log(lineArr.join(' '));
	})
}

module.exports = {
		createHaiku: createHaiku,
};
