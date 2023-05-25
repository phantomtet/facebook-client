"use client";
import { useState } from 'react'
import './style.css'

export default function LogIn() {
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const handleChangeInput = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        alert()
    }
    return (
        <div className='login-container'>
            <title>Facebook - log in or sign up</title>
            <div className='description-container'>
                <img src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
                <div className='description'>Facebook helps you connect and share with the people in your life.</div>
            </div>
            <div className="login-box">
                <form onSubmit={handleSubmit} >
                    <input name='email' placeholder='Email address or phone number' value={input.email} onChange={handleChangeInput} />
                    <input name='password' placeholder='Password' value={input.password} onChange={handleChangeInput} />
                    <button type='submit' onClick={handleSubmit} className='login-button'>Log in</button>
                    <a>Forgotten password?</a>
                    <div className='divider' />
                    <button className='create-new-account-button'>Create new account</button>
                </form>
            </div>
        </div>
    )
}