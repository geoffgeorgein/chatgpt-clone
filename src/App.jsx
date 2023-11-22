
import './App.css'

function App() {

  const getMessages=async()=>{

    const options={
      method:"POST",
      headers:{
        
        "Content-Type": 'application/json'
    },
      body: JSON.stringify({
          
          message:"who are you"
      })
    
  }

    try{
      const response=await fetch('http://localhost:8000/completions',options)
      const data= response.json()
      console.log(data)
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

          <div>
            <input type='text'/>
            <button onClick={getMessages}>+</button>
          </div>
          
        </section>
    </div>
      
    </>
  )
}

export default App
