function getUsers(dbPassword){

    const myPromise = new Promise(

        (resolve, reject)=>{
            if(dbPassword == "123"){

                setTimeout(
                    ()=>{
                        resolve([
                            {name: "John", age: 30},
                            {name: "Jane", age: 25},
                            {name: "Doe", age: 22}
                        ])
                    },5000
                )
            }else{

                reject(
                    {
                        message: "Invalid Password",
                    }
                )
            }
        }
    )

    return myPromise

}

// getUsers("123").then(
//     (users)=>{
//        console.log(users)
//     }
// ).catch(
//     (err)=>{
//         console.error(err.message)
//     }
// )

// do the same task like above part 

try{
    let response = await getUsers("123"); // await means wait until promise's response
    console.log(response);
    console.log("Users fetched successfully");
}catch(error){
    console.error(error)
    console.error("Error Fetching Users")
}
