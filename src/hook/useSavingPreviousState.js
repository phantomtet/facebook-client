import { usePathname, useSearchParams } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import useValueRef from "./useValueRef"

const useSavingPreviousState = (defaultState, name = '') => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const key = name + '__' + pathname + searchParams
    const [state, setState] = useState(JSON.parse(sessionStorage.getItem(key)) || defaultState)
    const refValue = useValueRef(state)
    useLayoutEffect(() => {
        sessionStorage.removeItem(key)
        return () => {
            sessionStorage.setItem(key, JSON.stringify([...refValue.current]))
        }
    }, [])
    return [state, setState]
}
export default useSavingPreviousState