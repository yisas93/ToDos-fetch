import React, {useState, useEffect} from "react";
import "./style.css"

//create your first component
const Home = () => {
	const [tasks, setTasks]= useState([
		
	])
	const [newTask, setNewTask]= useState("")
	const apiUrl ="https://assets.breatheco.de/apis/fake/todos/user/yisas"




	//component did mount
	useEffect(async()=>{
		//carga inicial de la lista desde la api
		let resp=await fetch(apiUrl)
		if(resp.ok){
			let data=await resp.json()
		setTasks(data)
		}else{
			console.error(resp.statusText)
		}
		
		
	}, [])




	//component did update
	useEffect(async()=>{
 // actualizacion de la api con el estado tasks
		if(tasks.lengt==0){
			return
		}
		let resp=await fetch(apiUrl,{
			method: "PUT",
			body:JSON.stringify(tasks),
			headers:{
				"Content-Type":"application/json"
			}
		})
		if(resp.ok){
			console.log("lista actualizada")
		}
	}, [tasks])



	function checkTask(index){
		//actualiza elñ check de la tarea
		let newTasks=[...tasks]
		newTasks[index]={...newTasks[index], done:!newTasks[index].done}
		setTasks(newTasks)
	}
	function newTaskChange(value){
		//actualiza el estado de la caja de texto
		setNewTask(value)
	}
	async function newTaskEnter(e){
		//ingres la nueva tarea a la  lista
		if(e.code == "Enter" && e.target.value!= ""){
			if(tasks.length==0){
				let resp=await fetch(apiUrl, {
					method: "POST",
					body: JSON.stringify([]),
					headers:{"Content-Type":"application/json"}
				})
				if(resp.ok){
					console.log("lista creada")

				}else{
					console.error(resp.status+ ": " + resp.statusText)				
					return
				}
			}
			setTasks([...tasks,{label:newTask, done:false}])
			setNewTask("")
		}
	}
	async function newTaskButton(){
		//ingres la nueva tarea a la  lista
		
			if(tasks.length==0){
				let resp=await fetch(apiUrl, {
					method: "POST",
					body: JSON.stringify([]),
					headers:{"Content-Type":"application/json"}
				})
				if(resp.ok){
					console.log("lista creada")

				}else{
					console.error(resp.status+ ": " + resp.statusText)				
					return
				}
			}
			setTasks([...tasks,{label:newTask, done:false}])
			setNewTask("")
		}
	
	async function deleteTask(index){
		//elimina la tarea de la lista
		let newTasks=[...tasks]
		newTasks.splice(index,1)
		if(newTasks.length==0){
			let resp=await fetch(apiUrl, {method: "DELETE"})	
			if(resp.ok){
				console.log("lista eliminada")
			}
		}
		setTasks(newTasks)
	}
	return (
		<div className="d-flex justify-content-center  tasks" >
			
			<ul className="list-group" id="ul">
				<li className="list-group-item d-flex">
					<input 
					type="text" 
					value={newTask} 
					onChange={(e)=>newTaskChange(e.target.value)} 
					onKeyDown={(e)=>newTaskEnter(e)}
					className="form-control"/>
					<button onClick={()=>newTaskButton()} className="btn btn-success">Add</button>
				</li>
				{tasks.map((task,index)=>(
					<li key={index} className="list-group-item d-flex justify-content-between">
						<div className="form-check">
							<input
							 type="checkbox"
							 className="form-check-input me-2"
							 checked={task.done}
							 onChange={(()=>checkTask(index))} 
							  />
							<label className="form-check-label" >
								{task.label}
							</label>
							
						</div>
						<button onClick={()=>deleteTask(index)} className="btn btn-danger btn-sm">X</button>
						
					</li>
				))}
				<li className="list-group-item">{tasks.length} tasks</li>
			</ul>
			
			
		</div>
	);
};

export default Home;
