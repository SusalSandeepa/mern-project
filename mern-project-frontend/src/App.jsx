import './App.css'
import ProductCard from './components/productCard.jsx'
function App() {

  return (
    <>
      <div className="h-[700px] w-[700px] border-[5px] flex justify-center items-center">

        <div className=" w-[400px] h-[200px] bg-yellow-400 flex relative justify-center items-center">  
          <button className="text-white bg-red-600 p-[5px] absolute right-[0px] top-[0px] ">X</button>
          <h1>An Unknown Error</h1>
          <button className="bg-green-500 text-white p-[5px] font-bold rounded fixed right-[10px] bottom-[10px]">Chat with Whatsapp</button>
        </div> 

        <div className="w-[200px] h-[200px] bg-red-400 m-[10px]">
          <div className="w-[50px] h-[50px] bg-yellow-700 m-[10px]"></div>
          <div className="w-[50px] h-[50px] bg-purple-700 m-[10px]"></div>
        </div>

      </div>
       
    </>
  )
}

export default App
