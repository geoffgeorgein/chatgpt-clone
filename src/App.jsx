
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const[message,setmessage]=useState([]);
  const[value,setvalue]=useState(null);
  const[prevchats,setprevchats]=useState([]);
  const[title,setTitle]=useState(null);

  useEffect(()=>{
    // console.log("mess",message)
    console.log("prwv",prevchats)
    console.log("titlw",title)
    

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

  const handleClick=(item)=>{
    setTitle(item)
  }

  const createNewchat=()=>{

    setTitle(null);
    setmessage([])
    setvalue(null)
  }

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
      // console.log("cdata",content)
      setmessage(Object.entries(content))
      setTitle(null)
    }
    catch(error){
      console.log(error)
    }
  }

  const currentchat=prevchats.filter(item=>item.title==title);

  const uniqueTitles=Array.from(new Set(prevchats.map(item=>item.title)))
 

  return (
    <>

    <div className='container'>
      <section className='side-bar'>
          <button onClick={createNewchat}>+ NewChat</button>

          <ul className='history'>
          {uniqueTitles.map((item,i)=><li key={i} onClick={()=>handleClick(item)}>{item}</li>)}
              
          </ul>
        </section>

        <section className='main'>

          <h1 className='title'>G-GPT</h1>
          <div className='content'>

          {
            currentchat.map((item,i)=>{
                return <li key={i}>{item.content}</li>
              })
            }

          <div className='inputContainer'>
            <input type='text' value={value} onChange={(e)=>setvalue(e.target.value)}/>
            <button onClick={getMessages}>ᐳ</button>
            {/* {
              message.map((data) =>{
                return (<p>{data}</p>)
              })

            } */}

          
          </div>
          </div>
          
          
        </section>
    </div>
      
    </>
  )
}

export default App
