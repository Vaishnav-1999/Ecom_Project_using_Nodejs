import { ApplicationError } from "../error-handler/application-error.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
    constructor(name, price, sizes, imageUrl, category, desc, id) {
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.category = category;
        this.imageUrl = imageUrl;
        this.price = price;
        this.sizes = sizes;
    }

    static getAll() {
        return products;
    }

    static add(product) {
        product.id = products.length + 1;
        products.push(product);
        return products;
    }

    static get(id) {
        const selectedProduct = products.find(product => product.id == id);
        return selectedProduct;
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter((product) => {
            console.log(product.price);
            console.log(!minPrice || parseFloat(product.price) >= minPrice);
            return ((!minPrice || parseFloat(product.price) >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category == category));
        });
        console.log(result[0]);
        return result;

    }

    static rateProduct(userId, productId, rating) {
        // 1.Validation for User
        const userFound = UserModel.getAll().find((user) => {
            console.log(user.id == userId);
            if (user.id == userId) {
                return user;
            }
        });

        console.log(userFound);

        if (!userFound) {
            throw new ApplicationError("User Not Found", 404);
        }

        // 2.Validation for Product
        const product = products.find((product) => {
            if (product.id == productId) {
                return product;
            };
        });

        if (!product) {
            throw new ApplicationError("Product Not Found", 404);
        }

        // 3.Check if there are any ratings if not add ratings.
        if (!product.ratings) {
            product.ratings = [];
            product.ratings.push({ userId: userId, rating: rating });
        } else {
            // Check If user rating is Already Available.
            const existingRatingIndex = product.ratings.findIndex((r) => r.userId == userId);

            if (existingRatingIndex >= 0) {
                product.ratings[existingRatingIndex] = {
                    userId: userId,
                    rating: rating
                }
            } else {
                product.ratings.push({ userId: userId, rating: rating });
            }
        }


    }

}
var products = [
    new ProductModel(1, 'Product 1', 'Description of Product 1', "https://i.pinimg.com/originals/75/07/63/7507634007cb3ec2db76a21be8fc4871.jpg", 'Category1', 19.999),
    new ProductModel(2, 'Product 2', 'Description of Product 2', "https://d319i1jp2i9xq6.cloudfront.net/upload/images/8077/8077_p.jpg?20150107041042", 'Category2', 29.999, ['S', 'XL']),
    new ProductModel(3, 'Product 3', 'Description of Product 3', "https://www.fonderielaroche.com/wp-content/uploads/2017/05/copie-de-400px--400px--sans-titre.png", 'Category3', 39.999, ['S', 'XL', 'L'])
]