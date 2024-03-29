"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Post from "./post";
import api from "../../../../api";
import { useSelector } from "react-redux";
import useGetFeed from "@/hook/useGetFeed";
import useIntersectionObserver from "@/hook/useNotifyWhenScroll";

const Feed = () => {
  const { feedData, setFeedData, getFeed } = useGetFeed();
  const handleCreateNewPost = (res) => {
    setFeedData((prev) => [res.data, ...prev]);
  };
  const target = useIntersectionObserver(() => {
    getFeed();
  }, [feedData]);
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="feed-container">
      <CreateNewPostComponent onCreateNewPost={handleCreateNewPost} />
      {feedData.map((item, index) => (
        <Post key={item._id} initialData={item} />
      ))}
      <div ref={target} />
    </div>
  );
};
export default Feed;

const CreateNewPostComponent = React.memo(({ onCreateNewPost }) => {
  const user = useSelector((state) => state.user.value);
  const fileInputRef = useRef();
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const handleKeyDown = (e) => {
    if (input == "" && !attachments.length) return;
    if (e.key == "Enter") {
      const formData = new FormData();
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
      formData.append("content", input);
      api
        .CREATE_NEW_POST(formData)
        .then(onCreateNewPost)
        .finally(() => {
          setInput("");
          setAttachments([]);
        });
    }
  };
  const handleSelectFile = (e) => {
    setAttachments((prev) => [...prev, ...e.target.files]);
  };
  return (
    <div
      className="card"
      style={{
        borderRadius: 8,
        background: "white",
        width: "100%",
        marginBottom: 15,
        padding: "12px 16px 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img className="avatar" src={user.avatar} />
        <input
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"What's on your mind, " + user.name + "?"}
        />
      </div>
      <div className="divider" style={{ margin: "12px 0 8px" }} />
      <div
        style={{
          display: "flex",
          color: "var(--secondary-icon)",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        <div
          onClick={() => sessionStorage.setItem("ada", { a: 1 })}
          className="setting-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            height={24}
            width={24}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/epGAMnVkMsy.png"
          />
          &nbsp;Live video
        </div>
        <div
          onClick={() => fileInputRef.current.click()}
          className="setting-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            height={24}
            width={24}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png"
          />
          &nbsp;Photo/video
        </div>
        <div
          className="setting-button hidden-under-430"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            height={24}
            width={24}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/_RWOIsUgWGL.png"
          />
          &nbsp;Feeling/activity
        </div>
        <input
          hidden
          type="file"
          ref={fileInputRef}
          onChange={handleSelectFile}
          multiple
          accept="image/*, video/mp4, video/*"
        />
      </div>
      <div style={{ display: "flex" }}>
        {attachments.map((file, index) => (
          <FileItemPreview key={index} data={file} />
        ))}
      </div>
    </div>
  );
});

const FileItemPreview = ({ data }) => {
  const url = useMemo(() => URL.createObjectURL(data), [data]);
  if (data.type.startsWith("image/"))
    return <img src={url} style={{ borderRadius: 8, width: 64, height: 64 }} />;
  if (data.type.startsWith("video/"))
    return (
      <video src={url} style={{ borderRadius: 8, width: 64, height: 64 }} />
    );
};
