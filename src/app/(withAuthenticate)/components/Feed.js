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
    const fileInputRef = useRef()
    const [input, setInput] = useState('')
    const [attachments, setAttachments] = useState([])
    const handleKeyDown = e => {
        if (input == '' && !attachments.length) return
        if (e.key == 'Enter') {
            api.CREATE_NEW_POST({
                content: input,
                attachments
            }).then(onCreateNewPost)
                .finally(() => setInput(''))
        }
    }
    const handleSelectFile = (e) => {
        const files = [...e.target.files].forEach((file) => {
            const fileReader = new FileReader()
            fileReader.onload = e => {
                console.log(e.target.result)
                setAttachments(prev => [...prev, e.target.result])
            }
            fileReader.readAsDataURL(file)
        })
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
                <div onClick={() => fileInputRef.current.click()} className="setting-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png' />
                    &nbsp;Photo/video
                </div>
                <div className="setting-button hidden-under-430" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img height={24} width={24} src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/_RWOIsUgWGL.png' />
                    &nbsp;Feeling/activity
                </div>
                <input hidden type='file' ref={fileInputRef} onChange={handleSelectFile} multiple accept="image/*" />
            </div>
            <div style={{ display: 'flex' }}>
                {
                    attachments.map((file, index) =>
                        <FileItem key={index} data={file} />
                    )
                }
            </div>
        </div>
    )
}

const FileItem = ({ data }) => {

    return (
        <img src={data} style={{ borderRadius: 8, width: 64, height: 64 }} />
    )
}