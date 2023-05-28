
export default function Layout({ children }) {

    return (
        <div>
            {children}
            <Test />
        </div>
    )
}
export const Test = () => <div>{Math.random()}</div>