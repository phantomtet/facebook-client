"use client";
import { useEffect, useState } from "react";
import Post from "./post";
import api from "../../../../api";

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
        <div style={{ borderRadius: 8, background: 'white', width: '100%', height: 124, marginBottom: 15 }}>
            <input onKeyDown={handleKeyDown} value={input} onChange={e => setInput(e.target.value)} />
        </div>
    )
}