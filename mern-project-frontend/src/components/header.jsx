import {Link} from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent text-white px-[40px]"> 
            <div className="w-full h-full flex relative ">
                <img src="/logo.png" alt="Logo" className="h-full w-[180px] left-0 object-cover absolute"/>
                <div className="h-full w-full flex justify-center items-center text-lg gap-[20px]">
                    <Link to = "/">Home</Link>
                    <Link to = "/products">Products</Link>
                    <Link to = "/about">About</Link>
                    <Link to = "/contact">Contact</Link>
                </div>
                <Link to = "/cart" className="h-full flex justify-end items-center text-2xl gap-2 absolute right-0"><BsCart3/></Link>
            </div>
        </header>
    ) 
    // Link tag use to navigate without reloading the page instead of <a> tag
    //px-[40px] means padding left and right of 40px (along x-axis)
}