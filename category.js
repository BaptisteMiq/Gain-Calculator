class Category {

  constructor(name) {
    this.name = name;
    this.dataTypes = [];
    this.gain = 0;
    this.data = {
      entropyE: 0,
      totalCount: 0
    }
  }

  static updateData(categories, data) {
    for (let i = 0; i < categories.length; i++) {
      categories[i].data = data;
    }
  }

  getGain() {
    this.gain = 0;
    this.dataTypes.forEach(type => {
      this.gain += type.entropy * (type.count.total / this.data.totalCount);
    });
    this.gain = this.data.entropyE - this.gain;
    return this.gain;
  }

}

module.exports = Category;
