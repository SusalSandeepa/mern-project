export default function TestPage() {


    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[600px] h-[600px] bg-accent md:bg-amber-300 lg:bg-pink-300"></div> 
        </div>
    );
    //md means for medium devices and larger (like tablets and desktops)
    //md:bg-amber-300 means the background color will be amber-300 for medium devices and larger and bg-accent for smaller devices (like mobile phones)
}