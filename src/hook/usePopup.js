"use client";

import { useEffect, useState } from "react";

const usePopup = (selector, defaultValue) => {
    const [isOpen, setIsOpen] = useState(defaultValue)
    const togglePopUp = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const popup = document.querySelector(selector)
        if (!popup) return
        const fn = e => {
            if (popup !== e.target && !popup.contains(e.target)) setIsOpen(false)
        }
        if (!isOpen) {
            popup.classList.remove('open')
            document.removeEventListener('click', fn)
        }
        else {
            popup.classList.add('open')
            document.addEventListener('click', fn)
        }
        return () => document.removeEventListener('click', fn)
    }, [isOpen])
    return [togglePopUp, isOpen, setIsOpen]
}
export default usePopup