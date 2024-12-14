import React from 'react'
import { Footer, Signup as SignupComponent } from '../components'
function Signup() {
  return (
    <div>
    <div className='min-h-screen flex items-center justify-center'>
        <SignupComponent/>
    </div>
    <Footer/>
    </div>
  )
}

export default Signup