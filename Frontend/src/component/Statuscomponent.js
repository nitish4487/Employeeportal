import React from 'react'

export default function Statuscomponent({status}) {
    let color
    if(status === 'accepted'){
        color = 'green'
    }else if(status === 'rejected'){
        color = 'red'
    }else{
        color = 'orange'
    }

  return (
    <div style={{color:color}}>{status}</div>
  )
}
