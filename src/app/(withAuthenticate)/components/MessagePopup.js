import messagePopupSlice from "@/redux/messagePopupSlice"
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../../../api"
import { WebSocketContext } from "@/app/layout"

const MessagePopup = () => {
    const messagePopup = useSelector(state => state.messagePopup)
    return (
        <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 'var(--z-index-navigate-bar)' }}>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column-reverse' }}>
                <div className="setting-button darker" style={{ margin: '8px 0 0px 16px', borderRadius: '100%', width: 48, height: 48, background: 'white', boxShadow: 'rgba(150,150,150,0.5) 1px 1px 10px 1px' }}>
                    <svg width="48" height="48" viewBox="-1.92 -1.92 27.84 27.84" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="File / Note_Edit"> <path id="Vector" d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
                </div>
                {
                    messagePopup.inactive.map(i =>
                        <ClosingItem key={i._id} data={i} />
                    )
                }
            </div>
            <div style={{ display: 'flex', position: 'absolute', bottom: 0, right: 80, flexDirection: 'row-reverse' }}>
                {
                    messagePopup.active.map(i =>
                        <OpeningItem key={i._id} data={i} />
                    )
                }
            </div>
        </div>
    )
}
export default MessagePopup

const initialInput = {
    content: '',
    attachments: []
}
const OpeningItem = ({ data }) => {
    const ws = useContext(WebSocketContext)
    const [isActive, setIsActive] = useState(true)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [input, setInput] = useState(initialInput)
    const ref = useRef()
    const handleKeyDown = e => {
        switch (e.key) {
            case 'Enter':
                if (input.content == '' && !input.attachments.length) return
                api.SEND_MESSAGE(data._id, input)
                setInput(initialInput)
                break;
            case 'Escape':
                dispatch(messagePopupSlice.actions.removePopup(data._id))
            default:
                break;
        }
    }
    useEffect(() => {
        const checkIfClickOutside = e => {
            if (!ref.current.contains(e.target) && e.target !== ref.current) {
                setIsActive(false)
            }
        }
        if (isActive) document.addEventListener('click', checkIfClickOutside)
        else document.removeEventListener('click', checkIfClickOutside)
        return () => document.removeEventListener('click', checkIfClickOutside)
    }, [isActive])
    useEffect(() => {
        if (isLoading) api.GET_MESSAGE(data._id, { after: messages[0]?._id }).then(res => {
            setMessages(res.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isLoading])
    useEffect(() => {
        ref.current.getElementsByTagName('input')[0].focus()
        ws.current.addEventListener('message', e => {
            let response = JSON.parse(e.data)
            if (response.eventName == 'receiveMessage' && response.targetId == data._id) setMessages(prev => [response.data, ...prev])
        })

    }, [])
    return (
        <div ref={ref} onClick={() => { setIsActive(true); ref.current.getElementsByTagName('input')[0].focus() }} style={{ height: 455, width: 328, background: 'white', borderRadius: '8px 8px 0 0', boxShadow: 'rgba(150,150,150,0.35) 1px 1px 10px 0.25px', marginLeft: 10 }}>
            <div style={{ height: 44, borderRadius: '8px 8px 0 0', padding: 6, display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--e5)' }}>
                <div style={{ display: 'flex', padding: 0, width: '100%' }} className="setting-button ">
                    <img src={data.avatar} className=" avatar" style={{ height: 32, width: 32, padding: 0 }} />
                    <div>
                        <div style={{ fontWeight: 500 }}>{data.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--secondary-icon)' }}>Active now</div>
                    </div>
                </div>
                <div role='action'>
                    <div style={{ display: 'flex' }}>
                        <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)', transition: 'none' }} height="26px" viewBox="-5 -5 30 30" width="26px"><path d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648a15.9 15.9 0 011.713 1.147c.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z" fill="var(--disabled-icon)" /><path d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648.824.484 1.394.898 1.713 1.147.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z" fill="none" stroke="var(--disabled-icon)" /></svg>
                        <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)', transition: 'none' }} height="26px" viewBox="-5 -5 30 30" width="26px"><path d="M19.492 4.112a.972.972 0 00-1.01.063l-3.052 2.12a.998.998 0 00-.43.822v5.766a1 1 0 00.43.823l3.051 2.12a.978.978 0 001.011.063.936.936 0 00.508-.829V4.94a.936.936 0 00-.508-.828zM10.996 18A3.008 3.008 0 0014 14.996V5.004A3.008 3.008 0 0010.996 2H3.004A3.008 3.008 0 000 5.004v9.992A3.008 3.008 0 003.004 18h7.992z" fill="var(--disabled-icon)" /></svg>
                        <svg onClick={() => dispatch(messagePopupSlice.actions.closePopup(data._id))} className="setting-button" style={{ borderRadius: '100%', padding: 0 }} width="26" height="26" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M6 11H18V13H6V11Z" fill={isActive ? 'var(--primary-color)' : 'var(--icon-inactive)'} /> </g></svg>
                        <svg onClick={() => dispatch(messagePopupSlice.actions.removePopup(data._id))} className="setting-button" style={{ borderRadius: '100%', padding: 0 }} width="28" height="28" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke={isActive ? 'var(--primary-color)' : 'var(--icon-inactive)'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
                    </div>
                </div>
            </div>
            <div role='message' style={{ height: 347, padding: 8, overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'end' }}>
                {
                    messages.map(i =>
                        <MessageItem key={i._id} data={i} />
                    )
                }
            </div>
            <div role='input' style={{ height: 60, marginTop: 5, display: 'flex', alignItems: 'center' }} >
                <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, margin: 6, minWidth: 20, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)' }} height="20px" viewBox="0 0 24 24" width="20px"><g ><polygon fill="none" points="-6,30 30,30 30,-6 -6,-6 " /><path d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12" /></g></svg>
                <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, margin: input.content == '' ? 6 : 0, minWidth: input.content == '' ? 20 : 0, width: 0, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)' }} width="22" height="22" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path fill={isActive ? 'var(--primary-color)' : 'var(--icon-inactive)'} fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v6.5a1 1 0 0 1-.032.25A1 1 0 0 1 22 12v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3a1 1 0 0 1 .032-.25A1.002 1.002 0 0 1 2 15.5V5zm2.994 9.83c-.348.006-.68.022-.994.046V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6.016c-4.297.139-7.4 1.174-9.58 2.623.826.293 1.75.71 2.656 1.256 1.399.84 2.821 2.02 3.778 3.583a1 1 0 1 1-1.706 1.044c-.736-1.203-1.878-2.178-3.102-2.913-1.222-.734-2.465-1.192-3.327-1.392a15.466 15.466 0 0 0-3.703-.386h-.022zm1.984-8.342A2.674 2.674 0 0 1 8.5 6c.41 0 1.003.115 1.522.488.57.41.978 1.086.978 2.012 0 .926-.408 1.601-.978 2.011A2.674 2.674 0 0 1 8.5 11c-.41 0-1.003-.115-1.522-.489C6.408 10.101 6 9.427 6 8.5c0-.926.408-1.601.978-2.012z" clipRule="evenodd" /></g></svg>
                <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, margin: input.content == '' ? 6 : 0, minWidth: input.content == '' ? 20 : 0, width: 0, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)' }} height="20px" viewBox="0 0 17 16" width="20px" x="0px" y="0px"><g fillRule="evenodd"><circle cx="5.5" cy="5.5" fill="none" r={1} /><circle cx="11.5" cy="4.5" fill="none" r={1} /><path d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z" fill="none" /><path d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z" /><path d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fillRule="nonzero" /></g></svg>
                <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, margin: input.content == '' ? 6 : 0, minWidth: input.content == '' ? 20 : 0, width: 0, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)' }} height="20px" viewBox="0 0 16 16" width="20px" x="0px" y="0px"><path d="M.783 12.705c.4.8 1.017 1.206 1.817 1.606 0 0 1.3.594 2.5.694 1 .1 1.9.1 2.9.1s1.9 0 2.9-.1 1.679-.294 2.479-.694c.8-.4 1.157-.906 1.557-1.706.018 0 .4-1.405.5-2.505.1-1.2.1-3 0-4.3-.1-1.1-.073-1.976-.473-2.676-.4-.8-.863-1.408-1.763-1.808-.6-.3-1.2-.3-2.4-.4-1.8-.1-3.8-.1-5.7 0-1 .1-1.7.1-2.5.5s-1.417 1.1-1.817 1.9c0 0-.4 1.484-.5 2.584-.1 1.2-.1 3 0 4.3.1 1 .2 1.705.5 2.505zm10.498-8.274h2.3c.4 0 .769.196.769.696 0 .5-.247.68-.747.68l-1.793.02.022 1.412 1.252-.02c.4 0 .835.204.835.704s-.442.696-.842.696H11.82l-.045 2.139c0 .4-.194.8-.694.8-.5 0-.7-.3-.7-.8l-.031-5.631c0-.4.43-.696.93-.696zm-3.285.771c0-.5.3-.8.8-.8s.8.3.8.8l-.037 5.579c0 .4-.3.8-.8.8s-.8-.4-.8-.8l.037-5.579zm-3.192-.825c.7 0 1.307.183 1.807.683.3.3.4.7.1 1-.2.4-.7.4-1 .1-.2-.1-.5-.3-.9-.3-1 0-2.011.84-2.011 2.14 0 1.3.795 2.227 1.695 2.227.4 0 .805.073 1.105-.127V8.6c0-.4.3-.8.8-.8s.8.3.8.8v1.8c0 .2.037.071-.063.271-.7.7-1.57.991-2.47.991C2.868 11.662 1.3 10.2 1.3 8s1.704-3.623 3.504-3.623z" fillRule="nonzero" /></svg>
                <input onKeyDown={handleKeyDown} placeholder="Aa" value={input.content} onChange={e => setInput(prev => ({ ...prev, content: e.target.value }))} />
                <svg className="setting-button" style={{ borderRadius: '100%', padding: 0, margin: 6, minWidth: 20, fill: isActive ? 'var(--primary-color)' : 'var(--icon-inactive)' }} aria-hidden="true" height={20} viewBox="0 0 16 16" width={20}><path d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z" /><path d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z" /></svg>
            </div>
        </div >
    )
}
const MessageItem = ({ data }) => {
    const yourId = useSelector(state => state.user?.value?._id)
    const isYourMessage = yourId === data.owner?._id
    return (
        <div style={{ display: 'flex', justifyContent: isYourMessage ? 'right' : 'left', alignItems: 'center' }}>
            <img hidden={isYourMessage} src={data.owner.avatar} style={{ height: 28, width: 28, borderRadius: '100%', marginRight: 8 }} />
            <div style={{ display: 'inline-flex', wordBreak: 'break-word', justifySelf: 'right', margin: 1, borderRadius: 20, background: isYourMessage ? 'var(--primary-color)' : 'var(--gray)', color: isYourMessage ? 'white' : 'black', padding: '8px 12px' }}>
                {data.content}
            </div>
        </div>
    )
}
const ClosingItem = ({ data }) => {
    const dispatch = useDispatch()
    return (
        <div className="hover-show-hidden" style={{ position: 'relative' }}>
            <img onClick={() => dispatch(messagePopupSlice.actions.openPopup(data._id))} style={{ cursor: 'pointer', height: 48, width: 48, borderRadius: '100%', margin: '8px 0 0px 16px', boxShadow: 'rgba(150,150,150,0.5) 1px 1px 10px 1px' }} src={data.avatar} />
            <svg onClick={() => dispatch(messagePopupSlice.actions.removePopup(data._id))} className="setting-button hidden" style={{ borderRadius: '100%', padding: 0, background: 'white', position: 'absolute', top: 0, right: -6 }} width="24" height="24" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke='black' strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
        </div>
    )
}