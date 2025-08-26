import {Link} from "react-router-dom";

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
            </div>
        </header>
    ) 
    // Link tag use to navigate without reloading the page instead of <a> tag
    //px-[40px] means padding left and right of 40px (along x-axis)
}