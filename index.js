let csvToJson = require('convert-csv-to-json');
const Category = require('./category.js');
const DataType = require('./datatype.js');

// CSV file into JSON object
let data = csvToJson.getJsonFromCsv("data.csv");

let args = process.argv.slice(2);
let activ = args[0];
console.log(activ);

// Get categories
let categories = [];
let categoriesName = Object.keys(data[0]);
for (var i = 0; i < categoriesName.length; i++) {
  if(categoriesName[i] == '') {
    categoriesName.splice(i, 1);
  }
}

// Get last node
let terminalNodeName = categoriesName[categoriesName.length - 1];

categoriesName.forEach(cn => {
  categories.push(new Category(cn));
});

// Get datatypes from the name of a category
function getDataTypesCat(cat) {
  var dt = [];
  data.forEach(line => {
    if(!dt.includes(line[cat])) {
      dt.push(line[cat]);
    }
  });
  return dt;
}

// Get a datatype from its parent category and its name
function getDataTypesCatName(catNom, critNom) {
  var res = null;
  categories.forEach(cat => {
    if(cat.name == catNom) {
      cat.dataTypes.forEach(crit => {
        if(crit.name == critNom) {
          res = crit;
        }
      });
    }
  });
  return res;
}


categories.forEach(cat => {

  // Add dataTypes to categories
  var dataTypes = [];
  getDataTypesCat(cat.name).forEach(dataTypeName => {
    var dt = new DataType(dataTypeName);
    dataTypes.push(dt);
  });
  cat.dataTypes = dataTypes;

  // Count every dataTypes from the category
  data.forEach(line => {
    if(cat.name !== terminalNodeName) {
      var currentDataType = getDataTypesCatName(cat.name, line[cat.name]);
    } else {
      var currentDataType = dataTypes[1];
    }
    currentDataType.count.total++;
    line[terminalNodeName] == activ ? currentDataType.count.yes++ : currentDataType.count.no++;
  });

  // Get entropy of each dataTypes
  dataTypes.forEach(dt => {
    dt.setEntropy();
  });

  // Init entropy of e
  if(cat.name === terminalNodeName) {
    Category.updateData(categories, { entropyE: dataTypes[1].entropy, totalCount: data.length });
  }

});

// Show results in table
let catTable = [];
categories.forEach(cat => {
  if(cat.name != terminalNodeName) {
    catTable.push({
      name: cat.name,
      gain: Math.round(cat.getGain() * 1e8) / 1e8
    });
  }
});
console.table(catTable);
