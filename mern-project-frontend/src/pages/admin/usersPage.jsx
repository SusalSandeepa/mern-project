import axios from "axios";                             // axios is used to make HTTP requests to the backend server
import { useEffect, useState } from "react";           // useState is used when your data can change and you want the UI to update when it changes and useEffect is used to perform side effects such as fetching data from backend
import toast from "react-hot-toast";
import { MdVerified, MdOutlineAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader.jsx";

function UserBlockConfirm(props){
	const email = props.user.email;
	const close = props.close;
	const refresh = props.refresh;

	function blockUser(){
		const token = localStorage.getItem("token");                            
		axios
		.put(import.meta.env.VITE_API_URL + "/api/users/block/" + email,{
			isBlock: !props.user.isBlock
		},{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}) 
		.then((response)=>{
			console.log(response.data);
			close();                                                              
			toast.success("User block status changed successfully");
			refresh();                                                            
		}).catch(()=>{
			toast.error("Failed to change user block status");
		}); 
	}

	// z-index property specifies the stack order of an element.if there are 100 layers z-[100] means the top layer
	// bg-[#00000050] is in rgba format that means black colored transparency

	return (<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center"> 
			<div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center p-6 rounded-lg shadow-lg gap-[40px]">
				<button onClick={close} className="w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold absolute top-[-38px] right-[-38px] border border-red-600 hover:bg-white hover:text-red-600">
					X
				</button>
				<p className="text-xl font-semibold text-center">Are you sure want to {props.user.isBlock? "unblock" : "block"} this user with email: {email} ?</p>
				<div className="flex gap-[40px]">
					<button onClick = {close} className="w-[100px] h-[30px] text-white bg-accent hover:bg-accent/80 rounded-lg ">
						Cancel
					</button>
					<button onClick = {blockUser} className="w-[100px] h-[30px] text-white bg-accent hover:bg-accent/80 rounded-lg">
						Yes
					</button>
				</div>
			</div>

	</div>)
}

export default function AdminUsersPage() {

	const [users, setUsers] = useState([]);
	const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);      
	const [userToBlock, setUserToBlock] = useState(null);                     
	const [isLoading, setIsLoading] = useState(true); 

	const navigate = useNavigate();


	useEffect(() => {      
		if(isLoading){ 
            const token = localStorage.getItem("token"); 
            if(token == null){
                toast.error("Please login to access admin panel");
                navigate("/login");
                return;
            }                                           
			axios
			.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
			.then((response) => {
				console.log(response.data);
				setUsers(response.data);                         
				setIsLoading(false);                                
			});
		}	
	}, [isLoading]);                                                

	return (
		<div className="w-full min-h-full">
			{		
				isBlockConfirmVisible && (
					<UserBlockConfirm
						refresh={()=>{
							setIsLoading(true)
						}} 
						user={userToBlock} 
						close={()=>{
							setIsBlockConfirmVisible(false)
						}} 
					/> 
			)}
			
            {/* Page container */}
			<div className="mx-auto max-w-7xl p-6">
				{/* Card */}
				<div className="rounded-2xl border border-secondary/10 bg-primary shadow-sm">
					{/* Header bar */}
					<div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-6 py-4">
						<h1 className="text-lg font-semibold text-secondary">Users</h1>
						<span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
							{users.length} users
						</span>
					</div>

					{/* Table wrapper for responsive scrolling */}
					<div className="overflow-x-auto">
						{isLoading? <Loader/>:
						<table className="w-full min-w-[880px] text-left">
							<thead className="bg-secondary text-white">
								<tr>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Image
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Email
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										First Name
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Last Name
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Role
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-center">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-secondary/10">
								{users.map((user) => { 
									// key is important for React’s reconciliation process
									return (
										<tr
											key={user.email}
											className="odd:bg-white even:bg-primary hover:bg-accent/5 transition-colors"
										>
											<td className="px-4 py-3">
												<img
													src={user.image}
                                                    referrerPolicy="no-referrer"
													alt={user.firstName}
													className={"h-16 w-16 rounded-full object-cover border-2 p-1 "+ (user.isBlock?" border-red-600": "border-green-600")}
												/>
											</td>
											<td className="px-4 py-3 font-mono text-sm text-secondary/80 ">
												<div className="flex items-center gap-2">
													{user.email}{user.isEmailVerified&&<MdVerified color="blue"/>}
												</div>
											</td>
											<td className="px-4 py-3 font-medium text-secondary">
												{user.firstName}
											</td>
											<td className="px-4 py-3 text-secondary/90">
												{user.lastName}
											</td>
											<td className="px-4 py-3 h-full text-secondary/70">
												<div className="flex items-center gap-2">
													{
														user.role == "admin" && <MdOutlineAdminPanelSettings />
													}
                                                {user.role}
												</div>
											</td>
											
											<td className="px-4 py-3">
												<div className="flex items-center justify-center gap-3">
													  {
                                                        <button
															onClick={()=>{
																setUserToBlock(user);
																setIsBlockConfirmVisible(true);
															}}
															className="w-[100px] h-[30px] rounded-full text-white bg-accent hover:bg-accent/80 cursor-pointer">
															{user.isBlock?"Unblock":"Block"}
														</button>
                                                      }
												</div>
											</td>
										</tr>
									);
								})}
								{users.length === 0 && (
									<tr>
										<td
											className="px-4 py-12 text-center text-secondary/60"
											colSpan={8} // updated colSpan to match the number of table headers
										>
											No products to display.
										</td>
									</tr>
								)}
							</tbody>
						</table>}
					</div>
				</div>
			</div>
		</div>
	);
}
