import { useEffect, useRef, useState } from "react"

export default function App() {

  const URL = import.meta.env.VITE_API_URL

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [interval, setInterval] = useState("")
  const [transcations, setTranscations] = useState([])
  const priceRef = useRef()

  useEffect(() => {
    priceRef.current.focus()
    getTranscations()
  }, [])

  async function getTranscations() {
    fetch(URL).then(res => {
    res.json().then(res => {
      setTranscations(res.data)
    }) 
    })
  }

  async function addNewTranscation(e) {
    e.preventDefault();
    if(name != "", desc != "", interval!="", price != ""){
      await fetch(`${URL}/new`, {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
          name,
          price: Number(price),
          datetime: interval,
          description: desc
        })
      }).then(res => {
        console.log({ status:200, message: "Transcation created" })
      }).catch(err => {
        console.log(err)
      })
      alert("Trasaction created")
      priceRef.current.focus()
    } else {
      alert("Transcation details required")
    }
    setName("")
    setPrice("")
    setDesc("")
    setInterval("")
    getTranscations()
  }

  let balance = 0;

  for(const transcation of transcations){
    balance = balance + transcation.price
  }

  return (
    <main className="container">
      <div className="balance">
        <p>🤑 BALANCE 🤑</p>
        <h1 className="balance-amt">{balance}$</h1>
      </div>
      <form className="new-transcation" onSubmit={addNewTranscation}>
        <div className="add-name-date">
          <input className="input" ref={priceRef} type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}></input>
          <input className="input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
          <input className="input" type="datetime-local" value={interval} onChange={(e) => setInterval(e.target.value)}></input>
        </div>
        <div className="add-desc">
          <input className="input" type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></input>
        </div>
        <button className="btn">Add new transcation</button>
      </form>
      <div className="all-transcations">
        {transcations.length > 0 && (
          transcations.map((transcation) => {
            return (
              <div key={transcation._id} className="transcation">
                <div className="left">
                  <p className="name">{transcation.name}</p>
                  <p className="desc">{transcation.description}</p>
                </div>
                <div className="right">
                  <p className={`price ${(transcation.price < 0) ? "red" : "green"}`}>{transcation.price}$</p>
                  <p className="date-time">{`${new Date(transcation.datetime).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`}</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}