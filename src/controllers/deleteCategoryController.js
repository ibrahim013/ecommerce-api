import { Category } from '../model/CategoryModel.js';


export const deletCategoryById = async (req, res) => {
    const { id} = req.params;
    try {
      const category = await Category.findByIdAndRemove(id);
      return res
        .status(200)
        .json({ status: 'success', message: 'successfully deleted'});
    } catch (error) {
        res.status(400).send(error.reason={msg: "id not found"});
    }
  }