import React from 'react'
import RegisterUserForm from '../../components/registerUserForm/registerUserForm'

const registerUser = () => {
  return (
    <div className='registerUser'>
        <div className='registerUserBody'>
            <h2>
              Register
            </h2>
            <RegisterUserForm  />
        </div>

    </div>
  )
}


export default registerUser