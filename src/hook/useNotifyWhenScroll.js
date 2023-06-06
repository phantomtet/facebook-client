import { useEffect, useRef, useState } from "react"

const useNotifyWhenScroll = (threshold = 10) => {
    const ref = useRef()
    const [isReachThreshold, setIsReachThreshold] = useState(ref.current?.scrollHeight - threshold <= Math.abs(ref.current?.scrollTop) + ref.current?.offsetHeight)
    useEffect(() => {
        console.log(ref.current?.scrollHeight, ref.current.scrollTop, ref.current.offsetHeight, ref.current.documentELement)
        ref.current.onscroll = e => alert
        // if (element) element.onscroll = e => {
        //     console.log('scrolll')
        //     let target = e.target
        //     if (querySelector == 'body') {
        //         let totalHeight = document.body.scrollHeight;
        //         let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //         let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //         let remainingHeight = totalHeight - scrollTop - clientHeight;
        //         if (remainingHeight <= threshold) setIsReachThreshold(true)
        //     }
        //     else if (target.scrollHeight - threshold <= Math.abs(target.scrollTop) + target.offsetHeight) {
        //         setIsReachThreshold(true)
        //     }
        // }
        console.log(ref, isReachThreshold, ref.current.documentElement)
    }, [])
    return [isReachThreshold, setIsReachThreshold, ref]
}
export default useNotifyWhenScroll