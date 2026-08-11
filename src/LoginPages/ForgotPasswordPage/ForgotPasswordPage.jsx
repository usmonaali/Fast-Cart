import React from 'react'
import Welcome from '../../components/welcome/Welcome'
import ForgotPassword from '../../components/forgotemail/ForgotPassword'

const ForgotPasswordPage = () => {
  return (
    <div className={`flex`}>
        <Welcome/>
        <ForgotPassword/>
    </div>
  )
}

export default ForgotPasswordPage