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
};

export default ProductController;
