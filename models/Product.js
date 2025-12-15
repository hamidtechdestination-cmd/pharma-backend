// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//     },
//     category: {
//       type: String,
//       required: [true, "Category is required"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: 0,
//     },
//     expiryDate: {
//       type: Date,
//       required: false,
//     },
//     stock: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     company: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    expiryDate: {
      type: Date,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,

    },

    company: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
