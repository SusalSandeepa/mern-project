import { useParams, Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader.jsx";
import ImageSlider from "../components/imageSlider.jsx";
import { addToCart, loadCart } from "../utils/cart.js";

export default function ProductOverview() {

    const params = useParams(); // useParams is a hook that allows us to access the parameters of the current route. Here we are accessing the id parameter from the route /overview/:id
    const [status, setStatus] = useState("loading"); // loading, error, successful
    const [product, setProduct] = useState(null);
    
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL+"/api/products/"+params.id).then(
                (res)=>{
                    setProduct(res.data)
                    setStatus("successful")
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch product details")
                    setStatus("error")
                }
            )
        },[]
    )

    return(
        <div className="w-full h-[calc(100vh-100px)] text-secondary">

            {
                status == "loading" && <Loader/>
            }

            {
                status == "successful" && (
                    <div className="w-full h-full flex">

                        <div className="w-[50%] h-full flex justify-center items-center">
                            <ImageSlider images={product.images}/>
                        </div>

                        <div className="w-[50%] h-full flex flex-col items-center p-10 gap-4">
                            <span className="">{product.productID}</span>
                            <h1 className="text-2xl font-bold text-center">{product.name}
                                {
                                    product.altNames.map(
                                        (name, index)=>{
                                            return(
                                                <span key={index} className="font-normal text-secondary/70">{" | " +name}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>

                            <p className="mt-[30px] text-justify">{product.description}</p>

                            <p>Category: {product.category}</p>

                            { product.labelledPrice>product.price?
                                <div className="flex items-center gap-3">
                                    <p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
                                    <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                                </div>:
                                <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                            }

                            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                                <button className="bg-accent text-white w-[50%] h-full font-semibold rounded hover:bg-accent/90 transition"
                                onClick={()=>{
                                    addToCart(product,1)
                                    toast.success("Added to cart")
                                }}>Add to Cart</button>
                                <Link to="/checkout" state={[{
                                    image : product.images[0],
                                    productID : product.productID,
                                    name : product.name,
                                    labelledPrice : product.labelledPrice,
                                    price : product.price,
                                    quantity : 1
                                }]} className="border border-accent text-accent w-[50%] h-full font-semibold rounded hover:bg-accent/90 hover:text-white text-center transition ml-4 pt-1.5"
                                onClick={()=>{
                                    console.log(loadCart())
                                }}>Buy Now</Link>
                            </div>

                        </div>
                    </div>
                )
            }

            {
                status == "error" && <h1 className="text-red-600">Failed to load product details</h1>
            }
        </div>

    )
}