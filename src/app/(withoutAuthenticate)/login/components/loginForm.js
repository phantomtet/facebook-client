"use client";

import { useState } from "react";
import api from "../../../../../api";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify'
import { ReduxUserActions } from "@/redux/userSlice";
import { useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation()
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const handleChangeInput = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        api.LOGIN(input).then(res => {
            if (res.status == 200) {
                dispatch(ReduxUserActions.storeUser(res.data))
                localStorage.setItem('token', res.data.token)
                router.push('/')
            }
        })
            .catch(error => {
                toast.error(t(error.message))
            })
    }

    return (
        <div className="login-box">
            <form onSubmit={handleSubmit} >
                <input className="input" autoComplete="new-password" name='email' placeholder='Email address or phone number' value={input.email} onChange={handleChangeInput} />
                <input className="input" autoComplete="new-password" name='password' placeholder='Password' value={input.password} onChange={handleChangeInput} />
                <button type='submit' onClick={handleSubmit} className='button login-button'>Log in</button>
                <a className="a">Forgotten password?</a>
                <div className='divider' />
                <button className='button create-new-account-button'>Create new account</button>
            </form>
        </div>
    )
}