import Link from "next/link"
import { useSelector } from "react-redux"

const LeftBar = () => {
    const user = useSelector(state => state.user.value)
    return (
        <div className="use-auto-hide-scrollbar sidebar leftbar hidden-under-1100">
            <div style={{ height: '100%', fontWeight: 500 }}>
                <Link href={`/${user._id}`} className="setting-button darker" style={{ height: 52 }}>
                    <img src={user.avatar} className="avatar" style={{ height: 36, width: 36 }} />
                    {user.name}
                </Link>
                <Link href='/friends' className="setting-button darker" style={{ height: 52 }}>
                    <i style={{ height: 36, width: 36, marginRight: 8, backgroundImage: 'url(/leftbar-icon.png)', backgroundPosition: '0 -296px' }} />
                    Friends
                </Link>
                <Link href='/' className="setting-button darker" style={{ height: 52 }}>
                    <i style={{ height: 36, width: 36, marginRight: 8, backgroundImage: 'url(/leftbar-icon.png)', backgroundPosition: '0 -407px' }} />
                    Marketplace
                </Link>
                <Link href='/' className="setting-button darker" style={{ height: 52 }}>
                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png' style={{ height: 36, width: 36, marginRight: 8, }} />
                    Feeds
                </Link>
                <Link href='/' className="setting-button darker" style={{ height: 52 }}>
                    <i style={{ height: 36, width: 36, marginRight: 8, backgroundImage: 'url(/leftbar-icon.png)', backgroundPosition: '0 -37px' }} />
                    Groups
                </Link>
                <Link href='/' className="setting-button darker" style={{ height: 52 }}>
                    <i style={{ height: 36, width: 36, marginRight: 8, backgroundImage: 'url(/leftbar-icon.png)', backgroundPosition: '0 -518px' }} />
                    Watch
                </Link>
            </div>

            <div style={{ fontSize: 13, color: 'var(--secondary-icon)', width: '100%', wordBreak: 'break-word', padding: 16, fontWeight: 400, }}>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Privacy</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Terms</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Advertising</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Ad&nbsp;Choices</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Cookies</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>More</span>
                <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>.</span>
                <Link href='https://www.facebook.com/vnl000/' target="_blank">
                    <span className="underline-when-hover" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>LV © 2023</span>
                </Link>
            </div>
        </div>
    )
}
export default LeftBar