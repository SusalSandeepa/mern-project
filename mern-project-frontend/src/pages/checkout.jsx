import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage(){

    const location = useLocation();

    const [cart, setCart] = useState(location.state)

    function getTotal(){
        let total = 0
        cart.forEach(
            (item) => {
                total += item.price * item.quantity // calculate the total price of the cart for each item
            }
        )
        return total
    }

    return(
        <div className="w-full h-[calc(100vh-100px) bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[600px] flex flex-col gap-4">
                {cart.map((item, index)=>{
                    return (
                        <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                            <button className="absolute text-red-500 font-bold text-2xl aspect-square rounded-full hover:bg-red-500 hover:text-white p-[5px] right-[-40px]" onClick={
                                ()=>{
                                    
                                }
                            }><BiTrash/></button>
                            <img className="h-full aspect-square object-cover" src={item.image} />
                            <div className="flex flex-col w-[200px] h-full pl-[5px] pt-[10px]">
                                <h1 className="text-lg font-semibold w-full text-wrap">{item.name}</h1> 
                                <span className="text-sm text-secondary">{item.productID}</span>
                            </div>
                            <div className="flex flex-col w-[100px] h-full justify-center items-center">
                                <CiCircleChevUp className="text-3xl" onClick={
                                    ()=>{
                                        const newCart = [...cart] // create a copy of the cart array
                                        newCart[index].quantity += 1 // increase the quantity of the item at the current index
                                        setCart(newCart)  // update the state
                                    }
                                }/>
                                <span className="font-semibold text-4xl">{item.quantity}</span>
                                <CiCircleChevDown className="text-3xl" onClick={
                                    ()=>{
                                        const newCart = [...cart] // create a copy of the cart array

                                        if(newCart[index].quantity>1) {     // prevent the quantity from going below 1
                                            newCart[index].quantity -= 1    // decrease the quantity of the item at the current index
                                        }
                                        
                                        setCart(newCart)  // update the state
                                    }
                                }/>
                            </div>
                            <div className="flex flex-col w-[180px] h-full">
                                {
                                    item.labelledPrice>item.price&&
                                    <span className="text-lg text-secondary w-full text-right line-through pr-[10px] mt-[10px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                }
                                <span className="text-2xl text-accent w-full text-right pr-[10px] font-semibold mt-[5px]">LKR {item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    )
                })}
                <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
                    <Link to="/checkout" className="absolute left-0 bg-accent text-white px-[20px] py-[10px] ml-[20px] rounded hover:bg-accent/80 font-semibold">Order</Link>
                    <div className="h-[50px]">
                        <span className="text-2xl font-semibold text-accent text-right pr-[10px] mt-[5px]">Total: LKR {getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}