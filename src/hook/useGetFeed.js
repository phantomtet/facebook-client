import { useEffect, useRef, useState } from "react";
import useSavingPreviousState from "./useSavingPreviousState";
import api from "../../api";

const useGetFeed = (params = {}) => {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(!feedData.length);
  const lastFetchDataTimestampRef = useRef();

  const getFeed = () => {
    let sortedData = [...feedData].sort(
      (a, b) => Date(b.createdAt) - Date(a.createdAt)
    );
    api
      .GET_FEED({
        after: sortedData[sortedData.length - 1]?._id,
        beforeTimestamp: lastFetchDataTimestampRef.current,
        ...params,
      })
      .then((res) => {
        lastFetchDataTimestampRef.current = new Date();
        if (!res.data.length) return;
        setFeedData([...feedData, ...res.data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { feedData, setFeedData, getFeed };
};
export default useGetFeed;
