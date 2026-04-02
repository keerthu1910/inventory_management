import Product from "../models/Productmodel.js";

class ProductService {
  createProduct = async (product_data) => {
    const existingProduct = await Product.findOne({
      name: product_data.name,
    }).collation({ locale: "en", strength: 2 });
    if (existingProduct) {
      const error = new Error("Product exists already");
      error.statusCode = 409;
      throw error;
    }
    const product = await Product.create(product_data);
    return product;
  };

  getAllProducts = async (sort, order, limit) => {
    const sortOrder = order === "desc" ? -1 : 1;
    const products = await Product.find()
      .sort({ [sort]: sortOrder })
      .limit(Number(limit));

    return products;
  };

  updateProduct = async (product) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      product.id,
      {
        $set: {
          name: product.data.name,
          category: product.data.category,
          price: product.data.price,
          quantity: product.data.quantity,
        },
      },
      { new: true },
    );
    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    return updatedProduct;
  };

  deleteProduct = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
    if (!deletedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    return deletedProduct;
  };
}

export default ProductService;
