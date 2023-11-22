
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const[message,setmessage]=useState([]);
  const[value,setvalue]=useState(null);
  const[prevchats,setprevchats]=useState([]);
  const[title,setTitle]=useState(null);

  useEffect(()=>{
    console.log("mess",message)
    console.log("prwv",prevchats)
    

    if(!title && value && message){
      setTitle(value)
    }
    if(title && value && message){
      setprevchats(chats=>(
        [...chats,
          {
            title:title,
            role:"user",
            content:value
          },
          {
            title:title,
            role:message[0][1],
            content:message[1][1]

          }
        ]
      ))
    }
  },[message,title])

  const getMessages=async()=>{

    const options={
      method:"POST",
      headers:{
        
        "Content-Type": 'application/json'
    },
      body: JSON.stringify({
          
          message:value
      })
    
  }
  

    try{
      console.log(value)
      const response=await fetch('http://localhost:8000/completions',options)
      const data= await response.json()
      console.log("data",data)
      const content=data?.choices[0]?.message;
      console.log("cdata",content)
      setmessage(Object.entries(content))
    }
    catch(error){
      console.log(error)
    }
  }
 

  return (
    <>

    <div className='container'>
      <section className='side-bar'>
          <button>+ NewChat</button>

          <ul className='history'>
              <li>BLU</li>
          </ul>
        </section>

        <section className='main'>

          <h1>G-GPT</h1>
          {
              prevchats.map((item)=>{
                return <li>{item.content}</li>
              })
            }

          <div>
            <input type='text' value={value} onChange={(e)=>setvalue(e.target.value)}/>
            <button onClick={getMessages}>+</button>
            {/* {
              message.map((data) =>{
                return (<p>{data}</p>)
              })

            } */}

          
          </div>
          
        </section>
    </div>
      
    </>
  )
}

export default App
