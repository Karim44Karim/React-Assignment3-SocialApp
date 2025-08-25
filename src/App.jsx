import { RouterProvider } from 'react-router-dom'
import './App.css'
import {router} from './routing/AppRoute'
import CounterContextProvider from './context/CounterContext'
import AuthContextProvdider from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvdider>
          <CounterContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
            <ReactQueryDevtools />
          </CounterContextProvider>
        </AuthContextProvdider>
      </QueryClientProvider>
    </>
  );
}

export default App
