"use client";

import usePopup from "@/hook/usePopup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link'

const AvatarButton = () => {
    const user = useSelector(state => state.user?.value)
    const [togglePopUp, isOpen] = usePopup('.avatar-popup-container')
    const [menuIndex, setMenuIndex] = useState(0)
    useEffect(() => {
        switch (menuIndex) {
            case 1:
                document.querySelector('.avatar-popup-container>.menu-0').classList.add('hide')
                document.querySelector('.avatar-popup-container>.menu-1').classList.remove('hide')
                break;
            case 0:
                document.querySelector('.avatar-popup-container>.menu-0').classList.remove('hide')
                document.querySelector('.avatar-popup-container>.menu-1').classList.add('hide')
            default:
                break;
        }
    }, [menuIndex])
    useEffect(() => {
        if (!isOpen) setMenuIndex(0)
    }, [isOpen])
    return (
        <div className="button-container">
            <img src={user.avatar} style={{ height: 36, width: 36 }} className="avatar" onClick={togglePopUp} />
            <div className="avatar-popup-container">
                <div className="menu-0">
                    <div className="" style={{ minWidth: 250, marginBottom: 15, borderRadius: 6, padding: 3, boxShadow: 'rgba(150,150,150,0.25) 1px 1px 10px 0.25px' }}>
                        <Link className="setting-button" href={`/${user?._id}`} >
                            <img className="avatar" src={user?.avatar} href={`/${user?._id}`} />
                            <div style={{ fontSize: 15 }}>{user?.name}</div>
                        </Link>
                        <div className='divider' style={{ margin: '3px 8px' }} />
                        <div className="setting-button" style={{ height: 40, display: 'flex', alignItems: 'center' }}>
                            <div style={{ color: 'var(--primary-color)' }}>See all profiles</div>
                        </div>
                    </div>
                    <SettingPrivacyButton onClick={() => setMenuIndex(1)} />
                    <HelpSupportButton />
                </div>
                <SettingPrivacyDetail onGoBack={() => setMenuIndex(0)} />
            </div>
        </div>
    )
}
const SettingPrivacyButton = ({ ...props }) => {

    return (
        <div className="setting-button" style={{ justifyContent: 'space-between' }} {...props}>
            <div>Settings & Privacy</div>
            <svg width="33" height="33" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M19.159 16.767l0.754-0.754-6.035-6.035-0.754 0.754 5.281 5.281-5.256 5.256 0.754 0.754 3.013-3.013z" fill="#000000"> </path> </g></svg>
        </div>
    )
}
const SettingPrivacyDetail = ({ onGoBack }) => {
    return (
        <div className="menu-1">
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 18, fontWeight: 'bold', margin: '10px 0 10px 8px' }}>
                <div onClick={onGoBack} className="round-button darker-when-hover" style={{ display: 'flex', cursor: 'pointer', height: 30, width: 30, marginRight: 10 }}>
                    <svg width="20" height="20" viewBox="0 -6.5 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>right-arrow</title> <desc>Created with Sketch.</desc> <g id="icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-212.000000, -159.000000)" fill="#252528" fillRule="nonzero"> <g id="square-filled" transform="translate(50.000000, 120.000000)"> <path d="M187.108012,39.2902857 L197.649804,49.7417043 L197.708994,49.7959169 C197.889141,49.9745543 197.986143,50.2044182 198,50.4382227 L198,50.5617773 C197.986143,50.7955818 197.889141,51.0254457 197.708994,51.2040831 L197.6571,51.2479803 L187.108012,61.7097143 C186.717694,62.0967619 186.084865,62.0967619 185.694547,61.7097143 C185.30423,61.3226668 185.30423,60.6951387 185.694547,60.3080911 L194.702666,51.3738496 L162.99947,51.3746291 C162.447478,51.3746291 162,50.9308997 162,50.3835318 C162,49.8361639 162.447478,49.3924345 162.99947,49.3924345 L194.46779,49.3916551 L185.694547,40.6919089 C185.30423,40.3048613 185.30423,39.6773332 185.694547,39.2902857 C186.084865,38.9032381 186.717694,38.9032381 187.108012,39.2902857 Z M197.115357,50.382693 L186.401279,61.0089027 L197.002151,50.5002046 L197.002252,50.4963719 L196.943142,50.442585 L196.882737,50.382693 L197.115357,50.382693 Z" id="right-arrow"> </path> </g> </g> </g> </g></svg>
                </div>
                <div>Settings & Privacy</div>
            </div>
            <div className="setting-button" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="round-button" style={{ display: 'flex', background: 'var(--dark-gray)', cursor: 'pointer', height: 30, width: 30, marginRight: 10 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="#292D32" /> </g></svg>
                </div>
                <div>Settings</div>
            </div>
            <div className="setting-button" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="round-button" style={{ display: 'flex', background: 'var(--dark-gray)', cursor: 'pointer', height: 30, width: 30, marginRight: 10 }}>
                    <svg width="20" height="20" viewBox="-327.68 -327.68 1679.36 1679.36" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M981.3 170.7H320c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h661.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7zM981.3 938.7H320c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h661.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7zM981.3 554.7H320c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h661.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7z" fill="#000000" /><path d="M106.7 128m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#000000" /><path d="M106.7 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#000000" /><path d="M106.7 896m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#000000" /></g></svg>
                </div>
                <div>Activity log</div>
            </div>
            <div className="setting-button" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="round-button" style={{ display: 'flex', background: 'var(--dark-gray)', cursor: 'pointer', height: 30, width: 30, marginRight: 10 }}>
                    <svg width="20" height="20" viewBox="-4.8 -4.8 33.60 33.60" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fill="none" stroke="#000000" strokeWidth="0.9120000000000001" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8" /> </g></svg>
                </div>
                <div>Language</div>
            </div>
        </div>
    )
}
const HelpSupportButton = () => {

    return (
        <div className="setting-button" style={{ justifyContent: 'space-between' }}>
            <div>Help & Support</div>
            <svg width="33" height="33" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M19.159 16.767l0.754-0.754-6.035-6.035-0.754 0.754 5.281 5.281-5.256 5.256 0.754 0.754 3.013-3.013z" fill="#000000"> </path> </g></svg>
        </div>
    )
}
export default AvatarButton