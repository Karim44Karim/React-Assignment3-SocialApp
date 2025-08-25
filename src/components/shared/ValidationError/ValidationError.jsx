import React from 'react'

export default function ValidationError({error}) {
  return (
    <p className='text-red-500'>{error}</p>
  )
}
