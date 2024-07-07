const Product = require("../models/Product");
const ApiFeature = require("../utils/apiFeature");

//insert product
exports.addProducts = async (req, res, next) => {
  try {
    const data = await Product.insertMany(req.body);
    return res.status(201).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
};

//task 1: getting product filtered
exports.getProducts = async (req, res, next) => {
  try {
    const resultPerPage = 10;
    const totalProduct = await Product.countDocuments();

    //search
    let apiFeature = new ApiFeature(Product.find(), req.query).search();
    let product = await apiFeature.query;
    let filteredProductCount = product.length;

    //pagination
    apiFeature.pegination(resultPerPage);
    product = await apiFeature.query.clone();

    return res.status(200).send({
      success: true,
      total: filteredProductCount,
      this: product.length,
      product,
    });

    // const data = await Product.find();
    // res.send({ success: true, total: data.length, data: data });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
};

exports.getStatistics = async (req, res, next) => {
  try {
    let month = req.query.month || "03";
    const pattern = `-${month}-`;

    let product = await Product.find();

    let sholdItem = 0;
    let totalPrice = 0;
    let totalItemOfMonth = 0;

    product = product.forEach(function (prod) {
      let month = String(prod.dateOfSale.getMonth() + 1).padStart(2, "0");
      if (`-${month}-` == pattern) {
        totalItemOfMonth = totalItemOfMonth + 1;
        if (prod.sold === true) {
          sholdItem = sholdItem + 1;
          totalPrice = totalPrice + prod.price;
        }
      }
    });

    return res.status(200).send({
      success: true,
      month,
      totalPrice,
      totalItemOfMonth,
      sholdItem,
      notShold: totalItemOfMonth - sholdItem,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
};

exports.getBarcharts = async (req, res, next) => {
  try {
    let quantity = Array.from({ length: 10 }).fill(0);
    const priceRange = [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ];
    let month = req.query.month || "03";
    const pattern = `-${month}-`;

    let product = await Product.find();

    product.forEach(function (prod) {
      let month = String(prod.dateOfSale.getMonth() + 1).padStart(2, "0");

      if (`-${month}-` == pattern) {
        let price = prod.price;
        if (price <= 100) quantity[0]++;
        else if (price <= 200) quantity[1]++;
        else if (price <= 300) quantity[2]++;
        else if (price <= 400) quantity[3]++;
        else if (price <= 500) quantity[4]++;
        else if (price <= 600) quantity[5]++;
        else if (price <= 700) quantity[6]++;
        else if (price <= 800) quantity[7]++;
        else if (price <= 900) quantity[8]++;
        else quantity[9]++;
      }
    });

    return res.status(200).send({ success: true, priceRange, quantity });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
};
