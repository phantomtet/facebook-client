"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Post from "./post";
import api from "../../../../api";
import { useSelector } from "react-redux";
import useSavingPreviousState from "@/hook/useSavingPreviousState";

const Feed = () => {
    const [feedData, setFeedData] = useSavingPreviousState([], 'feedData')
    const [isLoading, setIsLoading] = useState(!feedData.length)
    const lastFetchDataTimestampRef = useRef()
    const getFeed = () => {
        let sortedData = [...feedData].sort((a, b) => Date(b.createdAt) - Date(a.createdAt))
        api.GET_FEED(
            { after: sortedData[sortedData.length - 1]?._id, beforeTimestamp: lastFetchDataTimestampRef.current }
        ).then(res => {
            lastFetchDataTimestampRef.current = new Date()
            setFeedData([...feedData, ...res.data])
        })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const handleChangePostData = (data) => {
        const dataIndex = feedData.findIndex(i => i._id == data._id)
        let newFeedData = [...feedData]
        newFeedData[dataIndex] = data
        setFeedData(newFeedData)
    }
    const handleCreateNewPost = (res) => {
        setFeedData(prev => [res.data, ...prev])
    }
    useEffect(() => {
        if (isLoading) getFeed()
    }, [isLoading])
    useEffect(() => {
        window.onscroll = e => {
            let target = e.target.documentElement
            if (target.scrollHeight - target.scrollTop - target.clientHeight <= 300) setIsLoading(true)
        }
    }, [])
    return (
        <div className="feed-container">
            <CreateNewPostComponent onCreateNewPost={handleCreateNewPost} />
            {
                feedData.map(item =>
                    <Post key={item._id} data={item} onChange={handleChangePostData} />
                )
            }
        </div>
    )
}
export default Feed

const CreateNewPostComponent = ({ onCreateNewPost }) => {
    const user = useSelector(state => state.user.value)
    const [input, setInput] = useState('')
    const handleKeyDown = e => {
        if (e.key == 'Enter') {
            api.CREATE_NEW_POST({
                content: input
            }).then(onCreateNewPost)
                .finally(() => setInput(''))
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
                <div onClick={() => sessionStorage.setItem('ada', { a: 1 })} className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/epGAMnVkMsy.png' />
                    &nbsp;Live video
                </div>
                <div className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png' />
                    &nbsp;Photo/video
                </div>
                <div className="setting-button hidden-under-430" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/_RWOIsUgWGL.png' />
                    &nbsp;Feeling/activity
                </div>
            </div>
        </div>
    )
}