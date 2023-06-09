let websocket = null

export const CONNECT = (userId) => {
    websocket = new WebSocket(`ws://localhost:8000/chat?userId=${userId}&a=1`)
}

export default websocket