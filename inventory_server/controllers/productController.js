import ProductService from "../services/prodcutService.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  createProduct = async (req, res) => {
    const product_data = req.body;
    console.log(product_data);
    // const productService = new ProductService();
    try {
      const new_product = await this.productService.createProduct(
        product_data.data,
      );
      return res.status(201).json({
        message: "Product entered successfully",
        data: new_product,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: error.message,
        });
      } else {
        return res.status(error.statusCode || 500).json({
          message: error.message,
        });
      }
    }
  };

  getAllProducts = async (req, res) => {
    const {
      sort = "createdAt",
      order = "desc",
      limit = 10,
      page = 1,
    } = req.query;

    try {
      const productData = await this.productService.getAllProducts(
        sort,
        order,
        limit,
        page,
      );
      return res.status(200).json({
        message: "products fetched successfully",
        data: productData,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };

  searchProduct = async (req, res) => {
    const { searchvalue = "", category = "all", lowstock = false } = req.query;
    console.log(searchvalue);

    try {
      const productData = await this.productService.searchProduct(
        searchvalue,
        category,
        lowstock,
      );
      return res.status(200).json({
        message: "products fetched successfully",
        data: productData,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };

  updateProduct = async (req, res) => {
    const product_id = req.params.id;
    const product_details = req.body.data;

    try {
      const updatedProduct = await this.productService.updateProduct({
        id: product_id,
        data: product_details,
      });
      return res.status(200).json({
        message: "Product details updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };

  deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await this.productService.deleteProduct(id);
      return res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };
}

export default ProductController;
