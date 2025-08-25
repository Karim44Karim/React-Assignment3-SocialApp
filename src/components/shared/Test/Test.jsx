import React, { useContext } from 'react'
import AppButton from '../AppButton/AppButton'
import { CounterContext } from '../../../context/CounterContext'

export default function Test() {
    const {increment, decrement} = useContext(CounterContext);
  return (
    <>
        <AppButton onClick={increment}>+</AppButton>
        <AppButton onClick={decrement}>-</AppButton>
    </>
  )
}
