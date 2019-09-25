class DataTypes {

  constructor(name) {
    this.name = name;
    this.count = {
      total: 0,
      yes: 0,
      no: 0
    }
    this.entropy = 0;
  }

  setEntropy() {
    var probYes = this.count.yes / this.count.total;
    var probNo = this.count.no / this.count.total;
    // Entropy is 0 if one of the probability is 0
    this.entropy = probYes != 0 && probNo !=0 ? -probYes * Math.log2(probYes) - probNo * Math.log2(probNo): 0;
  }

}

module.exports = DataTypes;
