import { loadCart, getTotal, addToCart } from "../utils/cart.js";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage(){

    const [cart, setCart] = useState(loadCart()) // load the cart from local storage

    return(
        <div className="w-full lg:h-[calc(100vh-100px) bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
                {cart.map((item, index)=>{
                    return (
                        <div key={index} className="w-full h-[300px] lg:h-[120px] lg:p-0 bg-white p-3 flex flex-col lg:flex-row relative items-center">
                            <button className="absolute text-red-500 font-bold text-2xl aspect-square rounded-full hover:bg-red-500 hover:text-white p-[5px] right-[-40px]" onClick={
                                ()=>{
                                    addToCart(item, -item.quantity) // remove the item from the cart
                                    setCart(loadCart())
                                }
                            }><BiTrash/></button>
                            <img className="h-[100px] lg:h-full aspect-square object-cover" src={item.image} />
                            <div className="w-full h-[100px] text-center flex flex-col lg:w-[200px] lg:h-full pl-[5px] pt-[10px]">
                                <h1 className="text-lg font-semibold w-full text-wrap">{item.name}</h1> 
                                <span className="text-sm text-secondary">{item.productID}</span>
                            </div>
                            <div className="flex flex-row lg:flex-col w-[100px] h-full justify-center items-center">
                                <CiCircleChevUp className="text-3xl" onClick={
                                    ()=>{
                                        addToCart(item, 1) // add 1 to the quantity of the item in the cart
                                        setCart(loadCart())
                                    }
                                }/>
                                <span className="font-semibold text-4xl">{item.quantity}</span>
                                <CiCircleChevDown className="text-3xl" onClick={
                                    ()=>{
                                        addToCart(item, -1) // reduce 1 from the quantity of the item in the cart
                                        setCart(loadCart())
                                    }
                                }/>
                            </div>
                            <div className="w-full flex flex-row h-[100px] items-center justify-center lg:flex-col lg:w-[180px] lg:h-full">
                                {
                                    item.labelledPrice>item.price&&
                                    <span className="text-lg text-secondary lg:w-full text-center lg:text-right line-through pr-[10px] lg:mt-[10px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                }
                                <span className="text-2xl text-accent lg:w-full text-center lg:text-right pr-[10px] font-semibold lg:mt-[5px]">LKR {item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    )
                })}
                <div className="w-full lg:w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
                    <Link state={cart} to="/checkout" className="lg:absolute left-0 bg-accent text-white px-[20px] py-[10px] lg:ml-[20px] rounded hover:bg-accent/80 font-semibold">Proceed to Checkout</Link>
                    <div className="h-[50px]">
                        <span className="lg:w-full text-2xl font-semibold text-accent text-center lg:text-right p-0 lg:pr-[10px] mt-[5px]">Total: LKR {getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}