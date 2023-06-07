'use client';
import useNotifyWhenScroll from "@/hook/useNotifyWhenScroll";
import Feed from "./components/Feed";
import './style.css'
import RightBar from "./components/RightBar";

export default function Home() {
  // const [isReachThreshold, setIsReachThreshold, ref] = useNotifyWhenScroll(300, '.sidebar')
  return (
    <div className="homepage-container">
      <div className="use-auto-hide-scrollbar sidebar" style={{ position: 'sticky', top: 56, minWidth: 360, maxWidth: 360, height: 'calc(100vh - 56px)' }}>
        <div style={{ height: '200vh' }}>dsadsdasdasdsad asdasdas  a a a a a a a aa a a a a a a adasdas asdasdas dasdsadasdasdas asdsad asdas dsads</div>
      </div>
      <Feed />
      <RightBar />

    </div>
  )
}
