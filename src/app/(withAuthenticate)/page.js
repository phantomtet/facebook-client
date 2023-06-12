'use client';
import useNotifyWhenScroll from "@/hook/useNotifyWhenScroll";
import Feed from "./components/Feed";
import './style.css'
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";
import { useParams, useSearchParams } from "next/navigation";

export default function Home(props) {
  const params = useSearchParams()
  console.log(props)
  return (
    <div className="homepage-container">
      <LeftBar />
      <Feed />
      <RightBar />

    </div>
  )
}
