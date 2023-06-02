"use client";
import { useEffect, useState } from "react";
import Post from "./post";
import api from "../../../../api";
import { useSelector } from "react-redux";

const Feed = () => {
    const [feedData, setFeedData] = useState([])
    useEffect(() => {
        api.GET_FEED().then(res => {
            setFeedData(res.data)
        })
    }, [])
    return (
        <div className="feed-container">
            <CreateNewPostComponent />
            {
                feedData.map(item =>
                    <Post key={item._id} data={item} />
                )
            }
        </div>
    )
}
export default Feed

const CreateNewPostComponent = () => {
    const user = useSelector(state => state.user.value)
    const [input, setInput] = useState('')
    const handleKeyDown = e => {
        if (e.key == 'Enter') {
            api.CREATE_NEW_POST({
                content: input
            }).then(res => {

            })
        }
    }
    return (
        <div style={{ borderRadius: 8, background: 'white', width: '100%', marginBottom: 15, padding: '12px 16px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className="avatar" src={user.avatar} />
                <input onKeyDown={handleKeyDown} value={input} onChange={e => setInput(e.target.value)} placeholder={'What\'s on your mind, ' + user.name + '?'} />
            </div>
            <div className="divider" style={{ margin: '12px 0 8px' }} />
            <div style={{ display: 'flex', color: 'var(--secondary-icon)', fontWeight: 600, fontSize: 15 }}>
                <div className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/epGAMnVkMsy.png' />
                    &nbsp;Live video
                </div>
                <div className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png' />
                    &nbsp;Photo/video
                </div>
                <div className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/_RWOIsUgWGL.png' />
                    &nbsp;Feeling/activity
                </div>
            </div>
        </div>
    )
}