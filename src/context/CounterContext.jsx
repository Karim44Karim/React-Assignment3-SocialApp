import { createContext, useState } from "react";

export const CounterContext = createContext(0)

export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState("Ahmed");

  function increment() {
    console.log("test")
    setCounter(counter + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }

  return (
    <CounterContext.Provider value={{counter, userName, increment, decrement}}>
        {children}
    </CounterContext.Provider>
  )
}
