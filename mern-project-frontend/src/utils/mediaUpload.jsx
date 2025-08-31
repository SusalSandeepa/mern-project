import { createClient } from "@supabase/supabase-js";

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcmFhZnRrY3NwYWJienZxeGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjYyOTgsImV4cCI6MjA3MjEwMjI5OH0.JUbxu09mKCGYoRJUEx53N_NYTFPnykuDxABfqF0NXxs";
const supabaseUrl = "https://foraaftkcspabbzvqxlz.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);


export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
		if (file == null) {
			reject("No file selected");
		} else {
            const timestamp = new Date().getTime();
            const fileName = timestamp+file.name //this will make the file name unique by adding the timestamp to the file name.timestamp is the current time in milliseconds.

			supabase.storage
				.from("images")
				.upload(fileName, file, {
					upsert: false,
					cacheControl: "3600",
				})
				.then(() => {
					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;

					resolve(publicUrl);
				}).catch(
                    ()=>{
                        reject("An error occured")
                    }
                )
		}
	});
  //this promise creates for uploading the image and getting the public url of the image. and reject and resolve means if the file is null then it will reject the promise and if the file is not null then it will resolve the promise.
  
  
}
