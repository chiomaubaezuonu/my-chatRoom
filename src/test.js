import React from 'react'
import data from './data'
import { db } from './fb-config'

const App = () => {
  let sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date))
  return (
    <div className='text-3xl text-blue-400'>
      <h1>
        Welcome, Please enter your name
      </h1>
      {/* {data.sort((a, b) =>  new Date(a.date) - new Date(b.date))} */}
      {data.map((item) => {
        return <div key={item.id}>
          <h1>Name: {item.name}</h1>
        </div>
      })}

      {sorted.map((time) => {
        return <div key={time.id}>
          <p>time : {time.date}</p>
        </div>
      })}

    
      <input type="text" placeholder='Enter your name' />
    </div>
  )
}

export default App