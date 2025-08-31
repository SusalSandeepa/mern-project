import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {

    const [file, setFile] = useState(null)

    async function uploadImage() {

        const link = await mediaUpload(file)
        console.log(link)
        
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <input type = "file" onChange = {
                (e)=>{
                    setFile(e.target.files[0])
                }
            }/>
            <button className="bg-black text-accent p-2 rounded" onClick={uploadImage}>
                Upload
            </button>
        </div>
    );
    //supabase.storage.from("images") images is the name of the bucket that I created in supabase.
}