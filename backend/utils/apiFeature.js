class ApiFeature {
  constructor(query, queryStr) {
    this.query = query; //product.find()
    this.queryStr = queryStr; //after ? sign
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
            // { price: { $regex: Number(this.queryStr.keyword) } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  pegination(resultPerPage) {
    const page = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (page - 1);

    this.query = this.query.find().limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeature;
