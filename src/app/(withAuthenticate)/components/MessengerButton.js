import { useEffect, useLayoutEffect, useState } from "react"
import api from "../../../../api"
import usePopup from "@/hook/usePopup"
import { useDispatch, useSelector } from "react-redux"
import { getDifferentTime } from "@/misc/function"
import messagePopupSlice from "@/redux/messagePopupSlice"

const MessengerButton = () => {
    const [togglePopUp, isOpen] = usePopup('#message-channel-popup')
    const [messageChannels, setMessageChannels] = useState([])
    const dispatch = useDispatch()
    const handleClickItem = (data) => {
        dispatch(messagePopupSlice.actions.createPopup(data.participants[0]))
        togglePopUp()
    }
    useEffect(() => {
        api.GET_MESSAGE_CHANNEL().then(res => {
            setMessageChannels(res.data)
        })
    }, [])
    return (
        <div>
            <div onClick={togglePopUp} className="avatar" style={{ height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray)' }}>
                <svg viewBox="0 0 28 28" fill="currentColor" height={20} width={20}><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z" /></svg>
            </div>
            <div role='dialog' className="message-channel avatar-popup-container" id='message-channel-popup' style={{ width: 345 }} >
                {
                    messageChannels.map(i =>
                        <MessageChannelItem key={i._id} data={i} onClick={handleClickItem} />
                    )
                }
            </div>
        </div>
    )
}
export default MessengerButton
const MessageChannelItem = ({ data, onClick }) => {
    const user = useSelector(state => state.user.value)
    return (
        <div style={{ height: 72, display: 'flex' }} className="setting-button" onClick={() => onClick(data)}>
            <img src={data.participants[0].avatar} style={{ height: 56, width: 56 }} className="avatar" />
            <div style={{ width: '100%' }}>
                <div style={{ fontSize: 15 }}>{data.participants[0].name}</div>
                <div style={{ display: 'flex', alignItems: 'end', color: 'var(--secondary-icon)' }}>
                    <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '60%', overflow: 'hidden' }}>{data.latestMessage?.owner._id == user._id ? 'You: ' : ''}{data.latestMessage?.content}</div>
                    <div style={{ fontSize: 12, marginLeft: 5 }}><span style={{ marginBottom: 5 }}>.</span>{getDifferentTime(data.latestMessage?.createdAt)}</div>
                </div>
            </div>
        </div>
    )
}