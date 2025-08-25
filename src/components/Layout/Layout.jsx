import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNav from '../Layout/Navbar/Nabbar'
import AppFooter from '../Layout/Footer/Footer'
import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";


export default function Layout() {
  return (
    <>
      <main className="flex flex-col justify-between min-h-screen dark:bg-gray-900 dark: text-gray-100">
        <AppNav />
        <div>
          <Offline>
            <Toast className='fixed top-16 right-4 z-30'>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                You Are Offline
              </div>
              <ToastToggle />
            </Toast>
            <h1 className="text-2xl text-center text-red-500">
              You Are Offline
            </h1>
          </Offline>

          {/* <Online>
            <Toast className='fixed top-16 right-4 z-30'>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">You Are Online</div>
              <ToastToggle />
            </Toast>
            <h1 className="text-2xl text-center text-green-500">
              You Are Online
            </h1>
          </Online> */}
        </div>
        <div>
          <Outlet />
        </div>
        <AppFooter />
      </main>
    </>
  );
}
