import { useEffect, useRef, useState } from "react"
import useSavingPreviousState from "./useSavingPreviousState"
import api from "../../api"

const useGetFeed = (params = {}) => {
    const [feedData, setFeedData] = useSavingPreviousState([], 'feedData')
    const [isLoading, setIsLoading] = useState(!feedData.length)
    const lastFetchDataTimestampRef = useRef()

    const handleChangePostData = (data) => {
        const dataIndex = feedData.findIndex(i => i._id == data._id)
        let newFeedData = [...feedData]
        newFeedData[dataIndex] = data
        setFeedData(newFeedData)
    }
    const getFeed = () => {
        let sortedData = [...feedData].sort((a, b) => Date(b.createdAt) - Date(a.createdAt))
        api.GET_FEED(
            { after: sortedData[sortedData.length - 1]?._id, beforeTimestamp: lastFetchDataTimestampRef.current, ...params }
        ).then(res => {
            lastFetchDataTimestampRef.current = new Date()
            setFeedData([...feedData, ...res.data])
        })
            .finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        window.onscroll = e => {
            let target = e.target.documentElement
            if (target.scrollHeight - target.scrollTop - target.clientHeight <= 300) setIsLoading(true)
        }
    }, [])

    useEffect(() => {
        if (isLoading) getFeed()
    }, [isLoading])

    return { feedData, setFeedData, handleChangePostData, getFeed }
}
export default useGetFeed