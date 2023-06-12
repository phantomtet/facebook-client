'use client'

import Post from "../components/post"
import useGetFeed from "@/hook/useGetFeed"

export default function ({ params }) {
    const { feedData } = useGetFeed({ fromUserId: params.id })
    return (
        <div style={{ paddingTop: 16, display: 'flex', maxWidth: 940 }}>
            <div className="hidden-under-900" about="left-div" style={{ position: 'sticky', bottom: 0, height: '100%', alignSelf: 'flex-end' }}>
                <div align='left' className="card" about="intro" style={{ background: 'white', padding: '20px 0 20px', marginBottom: 16, width: 360, borderRadius: 8 }}>
                    <div align='left' style={{ padding: '0 16px', fontWeight: 700, fontSize: 20 }}>Intro</div>
                    <div align='center' style={{ paddingTop: 20, color: 'var(--secondary-icon)' }}>
                        Default intro
                    </div>
                    <div className="divider" style={{ margin: '16px' }} />
                    <div className="secondary-text" style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 512 512" version="1.1" fill="var(--secondary-icon)" style={{ margin: '0 12px 0 16px' }}><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>work-case</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="Combined-Shape" fill="var(--secondary-icon)" transform="translate(42.666667, 64.000000)"> <path d="M277.333333,1.42108547e-14 L298.666667,21.3333333 L298.666,64 L426.666667,64 L426.666667,362.666667 L3.55271368e-14,362.666667 L3.55271368e-14,64 L128,64 L128,21.3333333 L149.333333,1.42108547e-14 L277.333333,1.42108547e-14 Z M42.6664912,220.935181 L42.6666667,320 L384,320 L384.000468,220.935097 C341.375319,233.130501 298.701692,240.759085 256.000479,243.809455 L256,277.333333 L170.666667,277.333333 L170.666323,243.809465 C127.965163,240.759108 85.2915887,233.130549 42.6664912,220.935181 Z M384,106.666667 L42.6666667,106.666667 L42.6668606,176.433085 C99.6386775,193.933257 156.507113,202.666667 213.333333,202.666667 C270.159803,202.666667 327.028489,193.933181 384.000558,176.432854 L384,106.666667 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"> </path> </g> </g> </g></svg>
                        <span>Works on&nbsp;</span><span className="primary-text" style={{ fontWeight: 600 }}> Earth</span>
                    </div>
                    <div className="secondary-text" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ margin: '0 12px 0 16px' }}><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.6139 1.21065C12.2528 0.929784 11.7472 0.929784 11.3861 1.21065L2.38606 8.21065C2.14247 8.4001 2 8.69141 2 9V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V9C22 8.69141 21.8575 8.4001 21.6139 8.21065L12.6139 1.21065ZM16 20H20V9.48908L12 3.26686L4 9.48908V20H8V12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12V20ZM10 20V13H14V20H10Z" fill="var(--secondary-icon)" /> </g></svg>
                        <span>Live on&nbsp;</span><span className="primary-text" style={{ fontWeight: 600 }}> Earth</span>
                    </div>

                </div>
                <div align='left' className="card" about="photos" style={{ background: 'white', padding: '20px 0 20px', marginBottom: 16, width: 360, borderRadius: 8 }}>
                    <div align='left' style={{ padding: '0 16px', fontWeight: 700, fontSize: 20 }}>Photos</div>
                    <div align='center' style={{ marginTop: 10 }}>
                        {
                            [...Array(9)].map((i, index) =>
                                <img key={index} src='/sponsorImage.png' width='30%' style={{ marginRight: 5 }} />
                            )
                        }
                    </div>
                </div>
                <div align='left' className="card" about="friends" style={{ background: 'white', padding: '20px 0 20px', marginBottom: 16, width: 360, borderRadius: 8 }}>
                    <div align='left' style={{ padding: '0 16px', fontWeight: 700, fontSize: 20 }}>Friends</div>
                    <div align='center' style={{ marginTop: 10 }}>
                        {
                            [...Array(9)].map((i, index) =>
                                <img key={index} src='/sponsorImage.png' width='30%' style={{ marginRight: 5 }} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div about="right-div" align='left' style={{ width: '100%', marginLeft: 16 }}>
                {
                    feedData.length ? feedData.map(item =>
                        <Post key={item._id} initialData={item} />
                    )
                        :
                        <div>This user has no post yet</div>
                }
            </div>
        </div>
    )
}