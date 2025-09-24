import React from 'react'

export default function Alert({text, color}) {
  return (
    <div> <p style={{color:color}}>{text}</p></div>
  )
}
