import {Cart} from '../model/CartModel.js'

const CartController = {
    createCart: async (req, res) => {
        const {items, bill} = req.body
        
        try {

            if(!bill) {
                return res.status(400).json(
                    {status: 'failed', 
                    message: 'bill must be provided'
                })
            } 

            if(items.length < 1) {
                return res.status(400).json({
                    status: 'failed', 
                    message: 'cart cannot be empty'
                })
            }

            const newCart = new Cart({
                items, bill
            })

            const saveCart = await newCart.save()

            return res.status(201).json({status: 'success', data: saveCart})

            
        } catch (err) {
            
            return res.status(500).json(
                {
                    status: 'failed', 
                    message: 'server error'
                }
            )
        }

        
    },
    getAllCarts: async (req, res) => {
        try {
            const retrieveCart = await Cart.find({}).lean().exec()
    
             return res.status(200).json({
                message: 'success',
                data: retrieveCart
            })
            
        } catch (err) {
           
            return res.status(500).json({
                message: 'server error'
            })
        
        }
    },

    updateCarts: async (req, res) => {
        const {items, bill} = req.body
        const {id} = req.params
        try {
            const newCart = {}
            if(items) newCart.items = items
            if(bill) newCart.bill = bill

            const updateCart = await Cart.findByIdAndUpdate(id, {$set: newCart}, {new: true})

            if(!updateCart) {
                return res.status(400).json({status: 'failed', message: 'requested item does not exist'})
            }

            return res.status(200).json({
                status: 'Updated successfully!',
                data: updateCart
            })

        } catch (err) {
            return res.status(500).json({
                message: 'server error'
            })
        }
    },
    deleteCarts: async (req, res) => {
        try {
            const {id} = req.params
    
            const findResponse = await Cart.findById(id) 
            if(!findResponse) {
                return res.status(404).json({status: 'failed', message: 'Not found'})
            }
    
            await Cart.findByIdAndRemove(id) 
    
            return res.status(204).json({message: 'Deleted successfully!'})
    
        } catch (err) {
            return res.status(500).json({message: 'server err'})
        }
    }

}

export default CartController