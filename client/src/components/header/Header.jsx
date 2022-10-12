import React from 'react'
import './style.css'

function Header({ setElementType, elementType }) {
  return (
    <header>
        <div className='radio__inputs' style={{ position: 'fixed' }}>
        <input
          type='radio'
          id='line'
          checked={elementType === 'line'}
          onChange={() => setElementType('line')}
        />
        <label htmlFor='line'>Line</label>
        <input
          type='radio'
          id='rectangle'
          checked={elementType === 'rectangle'}
          onChange={() => setElementType('rectangle')}
        />
        <label htmlFor='rectangle'>Rectangle</label>
        <input
          type='radio'
          id='arc'
          checked={elementType === 'arc'}
          onChange={() => setElementType('arc')}
        />
        <label htmlFor='line'>Circle</label>
        </div>
    </header>
  )
}

export default Header