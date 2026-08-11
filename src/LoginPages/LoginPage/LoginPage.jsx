import React from 'react'
import Welcome from '../../components/welcome/Welcome'
import Login from '../../components/login/Login'

const LoginPage = () => {
  return (
    <div className={`flex`}>
        <Welcome/>
        <Login/>
    </div>
  )
}

export default LoginPage