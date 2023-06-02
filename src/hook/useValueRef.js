import { useEffect, useRef } from "react"

const useValueRef = (state) => {
    const ref = useRef(state)
    useEffect(() => {
        ref.current = state
    }, [state])
    return ref
}
export default useValueRef