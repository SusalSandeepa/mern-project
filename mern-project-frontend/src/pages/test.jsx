import React, { useState } from "react";
export default function TestPage() {

    const [count, setCount] = useState(10); // useState is a hook that allows us to use state in a functional component
    const [status, setStatus] = useState("Active"); // Active is the default value of status

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex flex-col justify-center items-center gap-[25px] ">
                <div className=" flex justify-center items-center gap-[25px]">
                <button onClick= {
                    ()=>{
                        console.log("Decreasing");
                        setCount(count - 1); // Decrease the count by 1 when the button is clicked
                    }
                } className="w-[100px] h-[40px] bg-accent rounded-lg">
                    -
                </button>
                <span className="text-accent text-5xl">
                    {count}
                </span>
                <button onClick={
                    ()=>{
                        console.log("Increasing");
                        setCount(count + 1); // Increase the count by 1 when the button is clicked
                    }
                }className="w-[100px] h-[40px] bg-accent rounded-lg">
                    +
                </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-[25px]">
                    <span className="text-accent text-5xl">{status}</span> {/* Display the current status*/}
                    <div className="flex flex-row gap-[25px]">
                        <button onClick={ () => setStatus("Online")} className="w-[100px] h-[40px] bg-accent rounded-lg">
                            Online
                        </button>
                        <button onClick={ () => setStatus("Offline")} className="w-[100px] h-[40px] bg-accent rounded-lg">
                            Offline
                        </button>
                        <button onClick={ () => setStatus("Deactivated")} className="w-[100px] h-[40px] bg-accent rounded-lg">
                            Deactivated
                        </button>
                    </div>
                </div>    
            </div>
        </div>
    );
}