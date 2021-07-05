import { Category } from '../model/CategoryModel.js';

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
};

export default ProductController;
