import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

const Defalt = ({children}) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default Defalt
