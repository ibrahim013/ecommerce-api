import { Category } from '../model/CategoryModel.js';
import { Product } from '../model/ProductModel.js';
import pagination from '../services/pagination.js';

const ProductController = {
  createCategory: async (req, res) => {
    const { name, description, access } = req.body;
    if (!access || access !== 'admin') {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' });
    }
    if (!name || !description) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    try {
      const newCategory = new Category(req.body);
      const category = await newCategory.save();
      if (!category) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: category });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCategory: async (req, res) => {
    try {
      const categories = await Category.find({}).lean().exec();
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: categories });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  editCategory: async (req, res) => {
    // Extract catgeory id passed
    const { id: _id } = req.params;

    // Check if there's at least one information to update
    if(![ req.body.name, req.body.description ].some(Boolean)) {
      return res.status(400).json({
        status: "Failed", message: "All fields cannot be blank to update category"
      })
    }

    try {
      // Update category details in db
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id },
        req.body,
        { new: true }
      );
      
      // If server error occurs OR no matching id was found
      if(!updatedCategory.length || !updatedCategory) return res.status(404).json({ 
        status: "Failed", message: "Oops! Error updating category"
      });

      return res.status(200).json({ 
        status: "Success", 
        message: "Category updated successfully", 
        data: updatedCategory
      });

    } catch (error) {
      return res.status(500).json({
        status: 'Fail',
        message: error.message
      });
    }
  },

  createProduct: async (req, res) => {
    const { name, description, category, productImage, price, access } =
      req.body;
    if (!access || access !== 'admin') {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' });
    }
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    try {
      //TODO send image to cloudinary ==> image url
      //res.body.image = url
      const newProduct = new Product(req.body);
      const product = await newProduct.save();
      if (!product) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getProduct: async (req, res) => {

    try {
      const product = await Product.find({}).populate('category', 'name').lean().exec();
      const pgn = await pagination(req, 1, Product);
      
      return res.status(201).json({
        status: 'success',
        message: 'successful',
        data: product,

        // pagination
        documentCount: pgn.documentCount,
        totalPages: pgn.totalPages,
        nextPage: pgn.nextPage,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findOne({_id: productId})
        .populate('category', 'name')
        .lean()
        .exec();
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;
    const { name, description, category, productImage, price, access } = req.body;

    if (!access || access !== 'admin') {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' });
    }

    if (!name || !description || !price || !category) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    try {      
      const product = await Product.findById(productId).exec();

      // TODO send image to cloudinary ==> image url
      // res.body.productImage = url sent back from image storage

      product.name = name;
      product.description = description;
      product.category = category;
      product.productImage = productImage;
      product.price = price;
      await product.save();

      if (!product) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'product not updated' });
      }

      return res.status(200)
        .json({ status: 'success', message: 'successfully updated', data: product });
   
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    const { access } = req.body;

    if (!access || access !== 'admin') {
      return res.status(401).json({ 
        status: 'fail', 
        message: 'unauthorized' 
      });
    }

    try {
      const product = await Product.findById(productId);
      product.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'successfully deleted', 
          data: product 
        });
          

    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  },
// };

  // ORDER Controller===================
  createOrder: async (req, res) => {

    const { userId, items, bill } = req.body;
    if (!userId || !items || !bill ) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please, the Product Cart is empty' });
    }

    try {
      const newOrder = new Order(req.body);
      const order = await newOrder.save();
      if (!order) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getOrder: async (req, res) => {
    const PAGE_SIZE = 20;
    let page = 1;
    let skip;

    if (req.query.page) {
      page = Number(req.query.page);
      skip = (page - 1) * PAGE_SIZE;
    }

    try {
      const order = await Order.find({}).populate().lean().exec();
      const docCount = await Order.find({}).countDocuments();
      return res.status(201).json({
        status: 'success',
        message: 'successful',
        data: order,
        documentCount: docCount,
        totalPages: Math.ceil(docCount / PAGE_SIZE),
        nextPage:
          Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  }
}

export default ProductController;
