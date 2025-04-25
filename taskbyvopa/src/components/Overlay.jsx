import React from 'react'

function Overlay({onEvent}) {
  return (
    <div className='min-h-screen min-w-full bg-black/60 fixed top-0 z-40' onClick={onEvent}></div>
  )
}

export default Overlay
