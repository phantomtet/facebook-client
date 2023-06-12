'use client'
import Link from "next/link"
import { useLayoutEffect, useState } from "react"
import api from "../../../../api"
import { usePathname } from "next/navigation"

const config = ['about', 'followers', 'photos', 'videos', 'groups']

export default function Layout({ children, params }) {
    const [userData, setUserData] = useState()
    const pathname = usePathname()
    useLayoutEffect(() => {
        api.GET_USER_PROFILE(params.id).then(res => {
            setUserData(res.data)
        })
    }, [])
    if (userData) return (
        <div>
            <div align='center' >
                <div style={{ height: '37vw', maxHeight: 348, position: 'relative', background: 'white' }}>
                    <img src='/sponsorImage.png' height='100%' style={{ position: 'absolute', maxWidth: 940, maxHeight: 348, width: '100%', top: 0, objectFit: 'cover', transform: 'translateX(-50%)', borderRadius: '0 0 8px 8px' }} />
                </div>
                <div style={{ background: 'white' }}>
                    <div style={{ maxWidth: 940, display: 'flex', marginBottom: -30 }}>
                        <img src={userData.avatar} style={{ outline: '5px solid white', height: 168, width: 168, borderRadius: '100%', border: '1px solid var(--e5)', position: 'relative', bottom: 30, left: 30, marginRight: 16 }} />
                        <div align='left' style={{ marginLeft: 30, paddingBottom: 20, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 700, fontSize: 32 }}>{userData.name}</div>
                            <div style={{ fontWeight: 600, color: 'var(--secondary-icon)' }}>2000 friends. 19999 following</div>
                            <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'left', paddingLeft: 6, margin: '6px 0' }}>
                                {
                                    [1, 2, 3, 4].map(i =>
                                        <img key={i} src='/react-icon-7.png' style={{ height: 32, width: 32, borderRadius: '100%', marginLeft: -6, border: '2px solid white' }} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider" style={{ marginBottom: 0, maxWidth: 940 }} />
                <div style={{ position: 'sticky', top: 56, left: 0, margin: 0, background: 'white', width: '100%', zIndex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 940 }}>
                        <div style={{ display: 'flex' }} >
                            <Link href={`/${params.id}`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname == `/${params.id}` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px' }}>Posts</div></Link>
                            <Link className="hidden-under" href={`/${params.id}/about`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname === `/${params.id}/about` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}/about` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>About</div></Link>
                            <Link className="hidden-under-250" href={`/${params.id}/followers`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname === `/${params.id}/followers` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}/followers` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>Followers</div></Link>
                            <Link className="hidden-under-350" href={`/${params.id}/photos`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname === `/${params.id}/photos` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}/photos` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>Photos</div></Link>
                            <Link className="hidden-under-450" href={`/${params.id}/videos`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname === `/${params.id}/videos` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}/videos` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>Videos</div></Link>
                            <Link className="hidden-under-550" href={`/${params.id}/groups`} style={{ paddingTop: 4, borderBottom: `4px solid ${pathname === `/${params.id}/groups` ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == `/${params.id}/groups` ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>Groups</div></Link>
                            {/* {
                                config.map(i => {
                                    const path = `/${params.id}/${i}`
                                    return <Link key={path} href={path} style={{ paddingTop: 4, borderBottom: `4px solid ${path === pathname ? 'var(--primary-color)' : 'transparent'}` }}><div className="setting-button" style={{ color: pathname == path ? 'var(--primary-color)' : 'var(--secondary-icon)', fontWeight: 600, height: 60, padding: '0 16px', textTransform: 'capitalize' }}>{i}</div></Link>
                                })
                            } */}

                        </div>
                        <div className="setting-button darker" style={{ height: 36, background: 'var(--gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: 48, padding: '0 12px' }}>
                            <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xlup9mm x1kky2od"><circle cx={12} cy={12} r="2.5" /><circle cx="19.5" cy={12} r="2.5" /><circle cx="4.5" cy={12} r="2.5" /></svg>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
    return (
        <div>

        </div>
    )
}
