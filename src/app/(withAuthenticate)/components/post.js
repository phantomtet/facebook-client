import { createContext, useContext, useState } from "react"
import { useSelector } from "react-redux"
import api from "../../../../api"

const PostDataContext = createContext()

const Post = ({ data }) => {

    return (
        <PostDataContext.Provider value={data}>
            <div className="post">
                <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
                    <img className="avatar" width='36px' height='36px' src={data.ownerAvatar} />
                    <div className="" style={{ width: '100%' }}>
                        <div style={{ fontSize: 15 }}>{data.ownerName}</div>
                        <div style={{ fontSize: 11 }}>1h</div>
                    </div>
                    <div className="round-button darker-when-hover" style={{ cursor: 'pointer' }}>
                        <svg width="25" height="25" viewBox="-3.84 -3.84 31.68 31.68" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z" fill="#000000" /> <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#000000" /> <path d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z" fill="#000000" /> </g></svg>
                    </div>
                </div>
                <div className="content" style={{ margin: '10px' }}>
                    {data.content}
                </div>
                <CommentList />
                <CommentInput />
            </div>
        </PostDataContext.Provider>
    )
}

export default Post

const CommentInput = () => {
    const postData = useContext(PostDataContext)
    const [input, setInput] = useState()
    const [attachments, setAttachments] = useState([])
    const user = useSelector(state => state.user.value)
    const handleKeyDown = e => {
        if (e.key == 'Enter') api.COMMENT({
            postId: postData._id,
            content: input,
            attachments
        })
    }
    return (
        <div style={{ margin: '0 10px', display: 'flex' }}>
            <img className="avatar" style={{ height: 25, width: 25, marginTop: 2 }} src={user.avatar} alt='' />
            <div style={{ display: 'flex', width: '100%' }}>
                <input value={input} onKeyDown={handleKeyDown} onChange={e => setInput(e.target.value)} placeholder="Write an answer..." style={{ outline: 'none', border: 'none', background: 'var(--light-gray)', borderRadius: '20px 0 0 20px', width: '100%', height: 30, paddingLeft: 12, fontSize: 13 }} />
                <div className="attachments" style={{ display: 'flex', justifyContent: 'right', paddingRight: 8, right: 0, top: 5, borderRadius: '0 20px 20px 0', background: 'var(--light-gray)', width: '', height: 30 }}>
                    <div className="round-button darker-when-hover" style={{ cursor: 'pointer' }}>
                        <svg width="25" height="25" viewBox="-4.32 -4.32 32.64 32.64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M14.2792 3C15.1401 3 15.9044 3.55086 16.1766 4.36754L16.7208 6H19C20.6569 6 22 7.34315 22 9V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V9C2 7.34315 3.34315 6 5 6H7.27924L7.82339 4.36754C8.09562 3.55086 8.8599 3 9.72076 3H14.2792ZM14.2792 5H9.72076L9.17661 6.63246C8.90438 7.44914 8.1401 8 7.27924 8H5C4.44772 8 4 8.44772 4 9V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V9C20 8.44772 19.5523 8 19 8H16.7208C15.8599 8 15.0956 7.44914 14.8234 6.63246L14.2792 5ZM9.5 12.5C9.5 11.1193 10.6193 10 12 10C13.3807 10 14.5 11.1193 14.5 12.5C14.5 13.8807 13.3807 15 12 15C10.6193 15 9.5 13.8807 9.5 12.5ZM12 8C9.51472 8 7.5 10.0147 7.5 12.5C7.5 14.9853 9.51472 17 12 17C14.4853 17 16.5 14.9853 16.5 12.5C16.5 10.0147 14.4853 8 12 8Z" fill="#000000" /> </g></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
const CommentList = () => {
    const postData = useContext(PostDataContext)
    const [commentList, setCommentList] = useState(postData.latestComments || [])
    return (
        <div style={{ margin: '10px' }}>
            {
                commentList.map(item =>
                    <SingleComment key={item._id} data={item} />
                )
            }
        </div>
    )
}
const SingleComment = ({ data }) => {

    return (
        <div className="comment">
            {data.content}
        </div>
    )
}