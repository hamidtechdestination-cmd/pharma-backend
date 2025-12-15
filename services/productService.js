// import Product from "../models/Product.js";

// class ProductService {
//   // Create product
//   async createProduct(data) {
//     const product = new Product(data);
//     return await product.save();
//   }

//   // Get all products
//   async getAllProducts() {
//     return await Product.find().sort({ createdAt: -1 });
//   }

//   // Get single product
//   async getProductById(id) {
//     return await Product.findById(id);
//   }

//   // Update product
//   async updateProduct(id, data) {
//     return await Product.findByIdAndUpdate(id, data, { new: true });
//   }

//   // Delete product
//   async deleteProduct(id) {
//     return await Product.findByIdAndDelete(id);
//   }
// }

// export default new ProductService();





import Product from "../models/Product.js";

class ProductService {
  // Create product
  async createProduct(data) {
    return await Product.create(data);
  }

  // Get all products
  async getAllProducts() {
    return await Product.find().sort({ createdAt: -1 });
  }

  // Get single product
  async getProductById(id) {
    return await Product.findById(id);
  }

  // Update product (❌ stock update blocked)
  async updateProduct(id, data) {
    // 🔥 HARD BLOCK STOCK UPDATE
    delete data.stock;

    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Delete product
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
