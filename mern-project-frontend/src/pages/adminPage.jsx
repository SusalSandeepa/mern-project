import { Link, Routes, Route } from 'react-router-dom';
import { FaChartLine } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from './admin/adminProductPage';
import AddProductPage from './admin/adminAddNewProduct';

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2 text-secondary">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-[20px]"> 
          <img src="/logo.png" alt="CBC - Crystal Beauty Clear" className="h-15"/>
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>
        <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <FaChartLine className="text-secondary" />
          Dashboard
        </Link>
        <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <MdOutlineShoppingCartCheckout className="text-xl text-secondary" />
          Orders
        </Link>
        <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <BsBox2Heart className="text-secondary"/>
          Products
        </Link>
        <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <HiOutlineUsers className="text-xl text-secondary"/>
          Users
        </Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[3px] border-accent rounded-[20px] overflow-hidden">
        <div className="w-full h-full max-w-full max-h-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>}/> 
            <Route path="/orders" element={<h1>Orders</h1>}/>
            <Route path="/products" element={<AdminProductPage/>}/>
            <Route path="/add-product" element={<AddProductPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  ); 
  //overflow-hidden is used to hide any content that not fit in the container
  //max-h-full is used to set the maximum height of the container to the full height of its parent
  //overflow-y-scroll is used to enable vertical scrolling when the content exceeds the height of the container
  //when we styling react-icons use text element to change the color and size of the icon
} 