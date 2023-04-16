import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoader = async () => {
const productData = await fetch("products.json");
const products = await productData.json();

const storedCart = getShoppingCart();
const savedCard = [];
for(const id in storedCart){
    const addedProduct = products.find(product => product.id === id);
    if(addedProduct){
        const quantityValue = storedCart[id];
        addedProduct.quantity = quantityValue;
        savedCard.push(addedProduct);
    }
}

return savedCard;

}

export default cartProductLoader;