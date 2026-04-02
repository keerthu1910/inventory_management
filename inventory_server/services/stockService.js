import Product from "../models/Productmodel.js";

class StockService {
  getStockDetails = async () => {
    const lowStock = await Product.countDocuments({ quantity: { $lt: 15 } });
    const totalCategories = await Product.aggregate([
      { $match: { quantity: { $ne: 0 } } },
      {
        $group: {
          _id: "$category",
        },
      },
      { $count: "totalCategories" },
    ]);
    const totalProducts = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: 1,
        },
      },
    ]);

    const categoryCount = totalCategories[0]?.totalCategories || 0;
    const productCount = totalProducts[0]?.totalCount || 0;
    return {
      lowstock: lowStock,
      totalCategories: categoryCount,
      totalProducts: productCount,
    };
  };
}

export default StockService;
