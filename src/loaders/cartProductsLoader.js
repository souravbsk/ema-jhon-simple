import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoader = async () => {
const storedCart = getShoppingCart();
console.log(storedCart);
const ids = Object.keys(storedCart);

const productData = await fetch("http://localhost:5000/productByIds",{
    method:"POST",
    headers:{
        'content-type':"application/json"
    },
    body:JSON.stringify(ids)
});
const products = await productData.json();

const savedCard = [];
for(const id in storedCart){
    const addedProduct = products.find(product => product._id === id);
    if(addedProduct){
        const quantityValue = storedCart[id];
        addedProduct.quantity = quantityValue;
        savedCard.push(addedProduct);
    }
}

return savedCard;

}

export default cartProductLoader;