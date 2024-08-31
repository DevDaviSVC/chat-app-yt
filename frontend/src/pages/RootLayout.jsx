import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

export default function RootLayout() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
        <Toaster />
        <Outlet />
    </div>
  )
}
