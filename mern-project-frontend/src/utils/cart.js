export function loadCart(){
    let cartString = localStorage.getItem("cart") // get the cart from local storage "[Item1,Item2...]"

    if(cartString==null){
        locatStorage.setItem("cart", "[]") // if cart is null, set it to an empty array
        cartString="[]"
    }

    const cart = JSON.parse(cartString); // parse the cart string to an array
    return cart // return the cart array
}

// when save an array in local storage, it is saved as a string. So we need to convert the array to a string before saving it.like "[Item1,Item2...]"

export function addToCart(product, quantity){  // this function adds a product to the cart
    let cart = loadCart() // load the cart from local storage

    const existingItemIndex = cart.findIndex(
        // find if the product already exists in the cart 
        (item)=>{
            return item.productID == product.productID
        }
    )

    if(existingItemIndex == -1){   // index begins from 0, so -1 means the item is not in the cart
        //item does not exist in the cart

        if(quantity > 1){
            console.log("Quantity must b at least 1")
            return
        }
 
        const cartItem = {  // create a new cart item
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            image: product.images[0], // first image of the product
            quantity: quantity
        }
        cart.push(cartItem) // add the new cart item to the cart array

    }else{

        // item already exists in the cart, so we need to update the quantity

        const existingItem = cart[existingItemIndex] // get the existing item from the cart

        const newQuantity = existingItem.quantity + quantity // calculate the new quantity

        if(newQuantity < 1){
            cart = cart.filter( // remove the item from the cart if the quantity is less than 1
                (item) => {
                    return item.productID != product.productID
                }
            )
        }
        else{
            cart[existingItemIndex].quantity = newQuantity // update the quantity of the existing item
        }

        localStorage.setItem("cart", JSON.stringify(cart)) // save the updated cart to local storage

        // JSON.stringify converts the cart array to a string before saving it to local storage

    }
}