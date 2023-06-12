import messagePopupSlice from "@/redux/messagePopupSlice"
import Link from "next/link"
import { useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

const ProfilePopup = ({ children, data }) => {
    const dispatch = useDispatch()
    const ref = useRef()
    const timeoutRef = useRef()
    const checkIfClickOutSide = useCallback((e) => {
        if (!ref.current?.contains(e.target)) {
            ref.current.classList.remove('show')
            document.removeEventListener('click', checkIfClickOutSide)
        }
    }, [])
    const showPopup = async (e) => {
        clearTimeout(timeoutRef.current)
        if (ref.current.classList.contains('show')) return
        timeoutRef.current = setTimeout(() => {
            ref.current.classList.add('show')
            document.addEventListener('click', checkIfClickOutSide)
        }, 500)
    }
    const hidePopup = async () => {
        clearTimeout(timeoutRef.current)
        if (!ref.current.classList.contains('show')) return
        timeoutRef.current = setTimeout(() => {
            ref.current.classList.remove('show')
            document.removeEventListener('click', checkIfClickOutSide)
        }, 100)

    }
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
            document.removeEventListener('click', checkIfClickOutSide)

        }
    }, [])
    return (
        <div style={{ width: 'max-content', position: 'relative' }}>
            <div style={{ overflow: 'hidden' }}>
                <Link href={data._id}>
                    {typeof (children) == 'function' ? children(showPopup, hidePopup) : children}
                </Link>
                <div ref={ref} className="popup" onMouseEnter={showPopup} onMouseLeave={(hidePopup)} style={{ borderRadius: 8, left: '50%', top: '100%', position: 'absolute', width: 400, padding: 16, transform: 'translateX(-50%)', background: 'white', zIndex: 2, boxShadow: 'rgba(150,150,150,0.25) 1px 1px 10px 1px' }}>
                    <div>
                        <div style={{ display: 'flex', padding: '0 12px' }}>
                            <img src={data.avatar} style={{ height: 80, width: 80, borderRadius: '100%', border: '1px solid var(--e5)' }} />
                            <div style={{ marginLeft: 8 }}>
                                <Link href={data._id} style={{ margin: '0 16px 10px', fontSize: 20, fontWeight: 700, display: 'inline-flex' }}>
                                    <div className="underline-when-hover">{data.name}</div>
                                </Link>
                                <div className="secondary-text" style={{ display: 'flex', alignItems: 'center' }}>
                                    <svg width="20" height="20" viewBox="0 0 512 512" version="1.1" fill="var(--secondary-icon)" style={{ margin: '0 12px 0 16px' }}><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>work-case</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="Combined-Shape" fill="var(--secondary-icon)" transform="translate(42.666667, 64.000000)"> <path d="M277.333333,1.42108547e-14 L298.666667,21.3333333 L298.666,64 L426.666667,64 L426.666667,362.666667 L3.55271368e-14,362.666667 L3.55271368e-14,64 L128,64 L128,21.3333333 L149.333333,1.42108547e-14 L277.333333,1.42108547e-14 Z M42.6664912,220.935181 L42.6666667,320 L384,320 L384.000468,220.935097 C341.375319,233.130501 298.701692,240.759085 256.000479,243.809455 L256,277.333333 L170.666667,277.333333 L170.666323,243.809465 C127.965163,240.759108 85.2915887,233.130549 42.6664912,220.935181 Z M384,106.666667 L42.6666667,106.666667 L42.6668606,176.433085 C99.6386775,193.933257 156.507113,202.666667 213.333333,202.666667 C270.159803,202.666667 327.028489,193.933181 384.000558,176.432854 L384,106.666667 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"> </path> </g> </g> </g></svg>
                                    <span>Works on&nbsp;</span><span className="primary-text" style={{ fontWeight: 600 }}>Earth</span>
                                </div>
                                <div className="secondary-text" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ margin: '0 12px 0 16px' }}><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.6139 1.21065C12.2528 0.929784 11.7472 0.929784 11.3861 1.21065L2.38606 8.21065C2.14247 8.4001 2 8.69141 2 9V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V9C22 8.69141 21.8575 8.4001 21.6139 8.21065L12.6139 1.21065ZM16 20H20V9.48908L12 3.26686L4 9.48908V20H8V12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12V20ZM10 20V13H14V20H10Z" fill="var(--secondary-icon)" /> </g></svg>
                                    <span>Live on&nbsp;</span><span className="primary-text" style={{ fontWeight: 600 }}>Earth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', fontWeight: 500 }}>
                        <div className="setting-button darker" style={{ height: 36, background: 'var(--gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: '100%', padding: '0 12px', marginRight: 10 }}>Friends</div>
                        <div className="setting-button primary" onClick={() => dispatch(messagePopupSlice.actions.createPopup(data))} style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: '100%', padding: '0 12px', marginRight: 10 }}>Message</div>
                        <div className="setting-button darker" style={{ height: 36, background: 'var(--gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: 48, padding: '0 12px' }}>
                            <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xlup9mm x1kky2od"><circle cx={12} cy={12} r="2.5" /><circle cx="19.5" cy={12} r="2.5" /><circle cx="4.5" cy={12} r="2.5" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePopup