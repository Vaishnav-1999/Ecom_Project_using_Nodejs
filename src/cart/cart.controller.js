import CartItemModel from "./cart.model.js";

export class CartItemsController {
    add(req, res) {
        const { productId, quantity } = req.query;
        const userId = req.userId;
        console.log(req.userId);
        console.log(userId);
        CartItemModel.add(productId, userId, quantity);
        res.status(201).send("Cart Updated Successfully");
    }

    get(req, res) {
        const userId = req.userId;
        const items = CartItemModel.get(userId);
        return res.status(200).send(items);
    }

    delete(req, res) {
        const userId = req.userId;
        const cartItemsId = req.params.id;
        const error = CartItemModel.delete(cartItemsId, userId);
        if (error) {
            return res.status(404).send(error);
        }
        return res.status(200).send('Cart item is removed');
    }
}