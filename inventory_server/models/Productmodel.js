import mongoose from "mongoose";

const Productschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "groceries",
          "electronics",
          "clothing",
          "home_kitchen",
          "office",
        ],
        message: "Category is not valid",
      },
      required: [true, "category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 0,
      min: [0, "Quantity must be greater than 0"],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", Productschema);
export default Product;
