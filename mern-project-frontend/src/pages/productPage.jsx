import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader } from "../components/loader.jsx";
import ProductCard from "../components/productCard.jsx";

export function ProductPage(){

    const[products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response)=>{
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error)=>{
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("Failed to fetch products");
            })
        }
    },[isLoading])

    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary">  {/* 100px is the height of the header */}
            {
                isLoading ? <Loader/>
                :
                <div className="w-full h-full flex flex-row flex-wrap justify-center"> {/* flex-wrap is used to wrap the product cards in the next line if the screen size is small */} 
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }

                </div>

            }
        </div>
    )
}