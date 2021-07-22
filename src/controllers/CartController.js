import { Cart } from '../model/CartModel.js';

const CartController = {
  createCart: async (req, res) => {
    let { userId, items, dateAdded } = req.body;
    
    // Simulate cart items
    userId = '60e974c3906dbf25dc92b7a9';
    items = [
      {
          productId: '60eb817eda01791328cddc47',
          name: 'shoes',
          quantity: 4,
          price: 103
      },
      {
          productId: '60eb8197da01791328cddc4a',
          name: 'Jewelry!',
          quantity: 4,
          price: 300
      },
    ];
    const billArray = items.map((i) => (i.quantity * i.price));
    const bill = billArray.reduce((prevTotal, nextPrice) => prevTotal + nextPrice, 0);

    if (!userId || !items) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please add some items to the cart' });
    }

    try {
      const newCart = new Cart(req.body);

      newCart.bill = bill;
      const cart = await newCart.save();
      if (!cart) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'cart not populated' });
      }
      return res.status(201)
        .json({ status: 'success', message: 'successful', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCart: async (req, res) => {
    try {
      const carts = await Cart.find({}).exec();
      return res.status(200)
        .json({ status: 'success', message: 'successful', data: carts });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCartById: async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await Cart.findById(id) 
        .populate('user', 'name', 'email')       
        .exec()
        ;
      return res.status(200)
        .json({ status: 'success', message: 'cart retrieved', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },


  updateCart: async (req, res) => {
    const { id } = req.params;
    let { userId, items } = req.body;

    // simulate new item addition 
    items = [
      {
          productId: '60eb817eda01791328cddc47',
          name: 'shoes',
          quantity: 4,
          price: 103
      },
      {
          productId: '60eb8197da01791328cddc4a',
          name: 'Jewelry!',
          quantity: 4,
          price: 300
      },
    ];   
    const newItem = {
        productId: "60eb8160da01791328cddc44",
        name: "Clothing!",
        quantity: 5,
        price: 250
    };
    items.push(newItem);

    const billArray = items.map((i) => (i.quantity * i.price));
    const bill = billArray.reduce((prevTotal, nextPrice) => prevTotal + nextPrice, 0);

    if (!userId || !items) {
      return res.status(400)
        .json({ status: 'fail', message: 'cart may be empty' });
    }

    try {      
      const cart = await Cart.findById(id).exec();

      cart.items = items;
      cart.bill = bill;
      await cart.save();

      if (!cart) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'cart not updated' });
      }

      return res.status(200)
        .json({ status: 'success', message: 'cart updated successfully', data: cart });
   
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err 
      });
    }
  },


  deleteCart: async (req, res) => {
    const { id } = req.params;

    try {
      const cart = await Cart.findById(id);
      cart.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'cart deleted successfully.', 
        });
          

    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  },

}


export default CartController;