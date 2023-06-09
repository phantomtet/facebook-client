'use client';
import useNotifyWhenScroll from "@/hook/useNotifyWhenScroll";
import Feed from "./components/Feed";
import './style.css'
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";

export default function Home() {
  // const [isReachThreshold, setIsReachThreshold, ref] = useNotifyWhenScroll(300, '.sidebar')
  return (
    <div className="homepage-container">
      <LeftBar />
      <Feed />
      <RightBar />

    </div>
  )
}
