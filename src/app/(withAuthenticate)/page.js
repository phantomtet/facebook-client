import Feed from "./components/Feed";
import './style.css'

export default function Home() {
  return (
    <div className="homepage-container">
      <div className="use-auto-hide-scrollbar sidebar" style={{ position: 'sticky', top: 50, minWidth: 300, maxWidth: 300, height: 'calc(100vh - 50px)' }}>
        <div style={{ height: '' }}>dsadsdasdasdsad asdasdas  a a a a a a a aa a a a a a a adasdas asdasdas dasdsadasdasdas asdsad asdas dsads</div>
      </div>
      <Feed />
      <div className="use-auto-hide-scrollbar sidebar" style={{ position: 'sticky', top: 50, minWidth: 300, maxWidth: 300, height: 'calc(100vh - 50px)' }}>
        <div style={{ height: '' }}></div>
      </div>

    </div>
  )
}