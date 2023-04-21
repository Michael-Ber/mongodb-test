import React from 'react'
import Header from '../header/Header'

export const Layout = ({children}) => {
  return (
    <div className="layout">
        <Header />
        {children}
    </div>
  )
}
