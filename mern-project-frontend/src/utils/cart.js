export function loadCart(){
    // get the cart from local storage "[Item1,Item2...]"
    let cartString = localStorage.getItem("cart") 

    if(cartString == null){
        // if cart is null, set it to an empty array
        localStorage.setItem("cart", "[]") 
        cartString = "[]"
    }

    // parse the cart string to an array
    const cart = JSON.parse(cartString) 

    // return the cart array
    return cart
}

// when save an array in local storage, it is saved as a string. 
// So we need to convert the array to a string before saving it like "[Item1,Item2...]"
export function addToCart(product, quantity){  
    // this function adds a product to the cart
    let cart = loadCart() // load the cart from local storage

    const existingItemIndex = cart.findIndex(
        // find if the product already exists in the cart 
        (item)=>{
            return item.productID == product.productID
        }
    )

    if(existingItemIndex == -1){   
        // index begins from 0, so -1 means the item is not in the cart
        // item does not exist in the cart

        if(quantity < 1){
            console.log("Quantity must b at least 1")
            return
        }
 
        const cartItem = {  
            // create a new cart item
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0] // first image of the product
        }

        // add the new cart item to the cart array
        cart.push(cartItem) 

    } else {
        // item already exists in the cart, so we need to update the quantity

        const existingItem = cart[existingItemIndex] // get the existing item from the cart

        const newQuantity = existingItem.quantity + quantity // calculate the new quantity

        if(newQuantity < 1){
            // remove the item from the cart if the quantity is less than 1
            cart = cart.filter(
                (item) => {
                    return item.productID != product.productID
                }
            )
        } else {
            // update the quantity of the existing item
            cart[existingItemIndex].quantity = newQuantity 
        }
    }

    // save the updated cart to local storage
    // JSON.stringify converts the cart array to a string before saving it to local storage
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function getTotal(){
    const cart = loadCart() // load the cart from local storage
    let total = 0

    cart.forEach(
        (item) => {
            total += item.price * item.quantity // calculate the total price of the cart for each item
        }
    )
    return total
}