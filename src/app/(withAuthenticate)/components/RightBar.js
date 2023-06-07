import { useEffect, useState } from "react"
import api from "../../../../api"
import { useDispatch } from "react-redux"
import messagePopupSlice from "@/redux/messagePopupSlice"

const sponsorData = [
    { imageUrl: '/sponsorImage.png', url: 'try.codecademy.com', title: 'Try it for free' },
]

const RightBar = () => {
    const [contactData, setContactData] = useState([])
    useEffect(() => {
        api.GET_CONTACT().then(res => {
            setContactData(res.data)
        })
    }, [])
    return (
        <div className="use-auto-hide-scrollbar sidebar " style={{ position: 'sticky', top: 56, minWidth: 360, maxWidth: 360, height: 'calc(100vh - 56px)', paddingLeft: 8 }}>
            <div className="sponsor " style={{}}>
                <div style={{ marginBottom: 10, color: 'var(--secondary-icon)', fontWeight: 500 }}>Sponsores</div>
                {
                    sponsorData.map((i, index) =>
                        <div key={index} style={{ padding: 8, display: 'flex', alignItems: 'center' }} className="setting-button darker">
                            <img style={{ height: 131, width: 131, borderRadius: 8, marginRight: 8 }} src={i.imageUrl} />
                            <div>
                                <div style={{ fontSize: 15, }}>{i.title}</div>
                                <div style={{ fontSize: 13, color: 'var(--secondary-icon)' }}>{i.url}</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="divider" />
            <div style={{ marginBottom: 10, color: 'var(--secondary-icon)', fontWeight: 500 }}>Contacts</div>
            {
                contactData.map((i, index) =>
                    <ContactItem index={index} data={i} key={i._id} />
                )
            }
        </div>
    )
}
export default RightBar

const ContactItem = ({ data, index }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(messagePopupSlice.actions.createPopup(data))
    }
    return (
        <li onClick={handleClick} style={{ padding: 8, display: 'flex' }} className="setting-button darker">
            <img src={data.avatar} style={{ height: 36, width: 36 }} className="avatar" />
            <div style={{ fontWeight: 500 }}>{data.name}</div>
        </li>
    )
}