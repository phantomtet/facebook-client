import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import api from "../../../../api";
import { getDifferentTime } from "@/misc/function";
import dayjs from "dayjs";
import ProfilePopup from "./common/profilePopup";
import { useForm } from "react-hook-form";

const PostDataContext = createContext();

export const Post = React.memo(({ initialData }) => {
  const [data, setData] = useState(initialData);
  return (
    <PostDataContext.Provider value={[data, setData]}>
      <div
        className="post card"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{ margin: "0 16px", display: "flex", alignItems: "center" }}
        >
          <ProfilePopup data={data.owner}>
            {(showPopup, hidePopup) => (
              <img
                onMouseEnter={showPopup}
                onMouseLeave={hidePopup}
                className="avatar"
                style={{ height: 40, width: 40 }}
                src={data.owner.avatar}
              />
            )}
          </ProfilePopup>
          <div style={{ width: "100%" }}>
            <ProfilePopup data={data.owner}>
              {(showPopup, hidePopup) => (
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                  }}
                  className="underline-when-hover"
                  onMouseEnter={showPopup}
                  onMouseLeave={hidePopup}
                >
                  {data.owner.name}
                </div>
              )}
            </ProfilePopup>
            <div
              style={{ fontSize: 13, color: "var(--text-gray-color)" }}
              title={dayjs(data.createdAt).format(
                "dddd, MMMM DD, YYYY [at] hh:mm A"
              )}
            >
              {getDifferentTime(data.createdAt)}
            </div>
          </div>
          <div
            className="round-button darker-when-hover"
            style={{ cursor: "pointer" }}
          >
            <svg
              width="36"
              height="36"
              viewBox="-3.84 -3.84 31.68 31.68"
              fill="var(--secondary-icon)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z"
                  fill="var(--secondary-icon)"
                />{" "}
                <path
                  d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                  fill="var(--secondary-icon)"
                />{" "}
                <path
                  d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                  fill="var(--secondary-icon)"
                />{" "}
              </g>
            </svg>
          </div>
        </div>
        <div className="content" style={{ margin: "6px 16px", fontSize: 15 }}>
          {data.content}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            marginBottom: 10,
          }}
        >
          {data.attachments
            .filter((_, index) => index < 5)
            .map((i, index, array) => (
              <FileOnPost
                key={index}
                index={index}
                data={i}
                totalFile={array.length}
              />
            ))}
        </div>
        <PostAction />
        <CommentList />
        <CommentInput />
      </div>
    </PostDataContext.Provider>
  );
});

export default Post;
const PostAction = () => {
  const [postData, setPostData] = useContext(PostDataContext);
  const totalReaction = postData.reaction.reduce((a, b) => a + b.count, 0);
  const handleReactPost = (type) => {
    api.REACT_TO_POST(postData._id, { type }).then((res) => {
      setPostData({ ...postData, ...res.data });
    });
  };
  const renderReactButton = () => {
    const key = postData.currentReaction;
    switch (postData.currentReaction) {
      default:
        return (
          <React.Fragment>
            <svg
              key={key}
              className="react-icon-with-animation"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                  stroke="var(--secondary-icon)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
            <div style={{ marginLeft: 6, transition: "none" }}>Like</div>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <svg
              key={key}
              className="react-icon-with-animation"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="var(--primary-color)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                  stroke="var(--primary-color)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
            <div
              style={{
                marginLeft: 6,
                transition: "none",
                color: "var(--primary-color)",
              }}
            >
              Like
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-2.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#f33e58" }}
            >
              Love
            </div>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-3.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#f7b125" }}
            >
              Care
            </div>
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-4.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#F7B125" }}
            >
              Haha
            </div>
          </React.Fragment>
        );
      case 5:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-5.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#F7B125" }}
            >
              Wow
            </div>
          </React.Fragment>
        );
      case 6:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-6.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#F7B125" }}
            >
              Sad
            </div>
          </React.Fragment>
        );
      case 7:
        return (
          <React.Fragment>
            <img
              key={key}
              className="react-icon-with-animation"
              src="/react-icon-7.png"
              height="18"
              width="18"
            />
            <div
              style={{ marginLeft: 6, transition: "none", color: "#E9710F" }}
            >
              Angry
            </div>
          </React.Fragment>
        );
    }
  };
  return (
    <div
      style={{
        padding: "0 16px",
        fontSize: 15,
        fontWeight: 600,
        color: "var(--secondary-icon)",
      }}
    >
      <div
        style={{
          fontWeight: 400,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {postData.reaction
            .sort((a, b) => b.count - a.count)
            .filter((i, idx) => idx < 2 && i.count > 0)
            .map((i, index) => (
              <img
                className="clickable"
                key={i.type}
                src={`/react-icon-${i.type}.png`}
                style={{
                  height: 20,
                  zIndex: index == 0 && 1,
                  border: "2px solid white",
                  borderRadius: "100%",
                  width: 20,
                  marginLeft: index == 1 && -4,
                }}
              />
            ))}
          <span
            className="clickable underline-when-hover"
            style={{ marginLeft: 3, display: totalReaction ? "" : "none" }}
          >
            {totalReaction}
          </span>
        </div>
        <div>
          <span
            className="clickable underline-when-hover"
            style={{
              display: postData.totalComment ? "flex" : "none",
              alignItems: "center",
            }}
          >
            {postData.totalComment}&nbsp;
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:0.9120000000000001;}",
                    }}
                  />
                </defs>
                <path
                  className="cls-1"
                  d="M1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H7.23v2.86L13,18.66h5.73a3.82,3.82,0,0,0,3.82-3.82V5.3a3.82,3.82,0,0,0-3.82-3.82H5.32A3.82,3.82,0,0,0,1.5,5.3Z"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>
      <div className="divider" style={{ margin: "3px 0" }} />
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <FullReactionPopup
            value={postData.currentReaction}
            onClick={handleReactPost}
          >
            {(showPopup, hidePopup, onClick) => (
              <div
                onClick={onClick}
                onMouseDown={showPopup}
                onMouseEnter={showPopup}
                onMouseLeave={hidePopup}
                className="setting-button"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {renderReactButton()}
              </div>
            )}
          </FullReactionPopup>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          className="setting-button"
          onClick={() =>
            document.querySelector(`.comment-input__${postData._id}`)?.focus()
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:0.9120000000000001;}",
                  }}
                />
              </defs>
              <path
                className="cls-1"
                d="M1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H7.23v2.86L13,18.66h5.73a3.82,3.82,0,0,0,3.82-3.82V5.3a3.82,3.82,0,0,0-3.82-3.82H5.32A3.82,3.82,0,0,0,1.5,5.3Z"
              />
            </g>
          </svg>
          <div style={{ marginLeft: 6, transition: "none" }}>Comment</div>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          className="setting-button hidden-under-350"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20.7914 12.6075C21.0355 12.3982 21.1575 12.2936 21.2023 12.1691C21.2415 12.0598 21.2415 11.9403 21.2023 11.831C21.1575 11.7065 21.0355 11.6019 20.7914 11.3926L12.3206 4.13202C11.9004 3.77182 11.6903 3.59172 11.5124 3.58731C11.3578 3.58348 11.2101 3.6514 11.1124 3.77128C11 3.90921 11 4.18595 11 4.73942V9.03468C8.86532 9.40813 6.91159 10.4898 5.45971 12.1139C3.87682 13.8846 3.00123 16.176 3 18.551V19.163C4.04934 17.8989 5.35951 16.8766 6.84076 16.166C8.1467 15.5395 9.55842 15.1684 11 15.0706V19.2607C11 19.8141 11 20.0909 11.1124 20.2288C11.2101 20.3487 11.3578 20.4166 11.5124 20.4128C11.6903 20.4084 11.9004 20.2283 12.3206 19.8681L20.7914 12.6075Z"
                stroke="#000000"
                strokeWidth="0.8399999999999999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>
          <div style={{ marginLeft: 6, transition: "none" }}>Share</div>
        </div>
      </div>
      <div className="divider" style={{ margin: "3px 0" }} />
    </div>
  );
};
const CommentInput = () => {
  const [postData, setPostData] = useContext(PostDataContext);
  const [input, setInput] = useState("");
  const {
    formState: { isDirty },
    register,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      attachments: [],
    },
  });
  const user = useSelector((state) => state.user.value);
  const handleKeyDown = (e) => {
    const { content, attachments } = getValues();
    if (content == "" && !attachments.length) return;
    if (e.key == "Enter")
      api
        .COMMENT({
          postId: postData._id,
          content: input,
          attachments,
        })
        .then((res) => {
          setPostData({
            ...postData,
            totalComment: (postData.totalComment || 0) + 1,
            latestComments: [res.data, ...postData.latestComments],
          });
        })
        .finally(() => {
          reset();
        });
  };
  return (
    <div style={{ margin: "0 10px", display: "flex" }}>
      <img
        className="avatar"
        style={{ height: 32, width: 32, marginTop: 2 }}
        src={user.avatar}
        alt=""
      />
      <div style={{ display: "flex", width: "100%" }}>
        <input
          {...register("content")}
          className={`comment-input__${postData._id}`}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          style={{
            borderRadius: "20px 0 0 20px",
            height: 36,
            paddingLeft: 12,
            fontSize: 15,
          }}
        />
        <div
          className="attachments"
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: 8,
            right: 0,
            top: 5,
            borderRadius: "0 20px 20px 0",
            background: "var(--light-gray)",
            width: "",
            height: 36,
          }}
        >
          <div
            className="round-button darker-when-hover"
            style={{ cursor: "pointer" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="-4.32 -4.32 32.64 32.64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.2792 3C15.1401 3 15.9044 3.55086 16.1766 4.36754L16.7208 6H19C20.6569 6 22 7.34315 22 9V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V9C2 7.34315 3.34315 6 5 6H7.27924L7.82339 4.36754C8.09562 3.55086 8.8599 3 9.72076 3H14.2792ZM14.2792 5H9.72076L9.17661 6.63246C8.90438 7.44914 8.1401 8 7.27924 8H5C4.44772 8 4 8.44772 4 9V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V9C20 8.44772 19.5523 8 19 8H16.7208C15.8599 8 15.0956 7.44914 14.8234 6.63246L14.2792 5ZM9.5 12.5C9.5 11.1193 10.6193 10 12 10C13.3807 10 14.5 11.1193 14.5 12.5C14.5 13.8807 13.3807 15 12 15C10.6193 15 9.5 13.8807 9.5 12.5ZM12 8C9.51472 8 7.5 10.0147 7.5 12.5C7.5 14.9853 9.51472 17 12 17C14.4853 17 16.5 14.9853 16.5 12.5C16.5 10.0147 14.4853 8 12 8Z"
                  fill="var(--secondary-icon)"
                />{" "}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const CommentList = () => {
  const [postData, setPostData] = useContext(PostDataContext);
  const handleGetMoreComments = () => {
    let comments = api.GET_MORE_COMMENTS(postData._id, {
      after: postData.latestComments[postData.latestComments.length - 1]?._id,
      before: postData.latestComments[0]?._id,
    });
    let reaction = api.GET_POST_REACTION(postData._id);
    Promise.all([comments, reaction]).then((res) => {
      let latestComments = [...res[0].data, ...postData.latestComments].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      let { reaction, totalComment } = res[1].data;

      setPostData({ ...postData, reaction, totalComment, latestComments });
    });
  };
  return (
    <div
      style={{
        margin: "10px 16px",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {postData.latestComments.map((item) => (
        <SingleComment key={item._id} data={item} />
      ))}
      <div
        onClick={handleGetMoreComments}
        className="underline-when-hover"
        hidden={(postData.totalComment || -1) <= postData.latestComments.length}
        style={{
          marginBottom: 10,
          color: "var(--secondary-icon)",
          fontWeight: 550,
          cursor: "pointer",
        }}
      >
        View more comments
      </div>
    </div>
  );
};
const SingleComment = ({ data }) => {
  return (
    <div className="comment" style={{ display: "flex" }}>
      <img
        className="avatar"
        src={data.owner.avatar}
        style={{ height: 32, width: 32, marginTop: 5 }}
      />
      <div>
        <div
          style={{
            padding: "8px 12px",
            borderRadius: 15,
            background: "var(--light-gray)",
          }}
        >
          <ProfilePopup data={data.owner}>
            {(showPopup, hidePopup) => (
              <div
                className="underline-when-hover"
                onMouseEnter={showPopup}
                onMouseLeave={hidePopup}
                style={{ fontWeight: 600, fontSize: 13 }}
              >
                {data.owner.name}
              </div>
            )}
          </ProfilePopup>

          <div style={{ fontSize: 15, wordBreak: "break-word" }}>
            {data.content}
          </div>
        </div>

        <div
          className="reaction"
          style={{
            display: "flex",
            fontSize: 12,
            padding: "0 8px",
            margin: "2px 0",
            color: "var(--text-gray-color)",
          }}
        >
          <span style={{ marginRight: 10, fontWeight: 600, cursor: "pointer" }}>
            Like
          </span>
          <span style={{ marginRight: 10, fontWeight: 600, cursor: "pointer" }}>
            Reply
          </span>
          <span
            title={dayjs(data.createdAt).format(
              "dddd, MMMM DD, YYYY [at] hh:mm A"
            )}
          >
            {getDifferentTime(data.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
const FullReactionPopup = ({ children, onClick, value = 0 }) => {
  const ref = useRef();
  const timeoutRef = useRef();
  const checkIfClickOutSide = useCallback((e) => {
    if (!ref.current?.contains(e.target)) {
      ref.current.classList.remove("show");
      document.removeEventListener("click", checkIfClickOutSide);
    }
  }, []);
  const showPopup = async (e) => {
    clearTimeout(timeoutRef.current);
    if (ref.current.classList.contains("show")) return;
    timeoutRef.current = setTimeout(() => {
      ref.current.classList.add("show");
      document.addEventListener("click", checkIfClickOutSide);
    }, 500);
  };
  const hidePopup = async () => {
    clearTimeout(timeoutRef.current);
    if (!ref.current.classList.contains("show")) return;
    timeoutRef.current = setTimeout(() => {
      ref.current.classList.remove("show");
      document.removeEventListener("click", checkIfClickOutSide);
    }, 1000);
  };
  const handleClick = (type) => {
    clearTimeout(timeoutRef.current);
    document.removeEventListener("click", checkIfClickOutSide);
    ref.current.classList.remove("show");
    onClick?.(type);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("click", checkIfClickOutSide);
    };
  }, []);

  return (
    <>
      {typeof children == "function"
        ? children(showPopup, hidePopup, () => handleClick(value || 1))
        : children}
      <div
        onMouseEnter={showPopup}
        onMouseLeave={hidePopup}
        ref={ref}
        className="react-icon-container"
        style={{
          position: "absolute",
          zIndex: 1,
          whiteSpace: "nowrap",
          padding: 3,
          borderRadius: 30,
          alignItems: "center",
          background: "white",
          border: "1px solid var(--dark-gray)",
        }}
      >
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(1)}
          className="react-icon"
          src="/react-icon-1.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(2)}
          className="react-icon"
          src="/react-icon-2.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(3)}
          className="react-icon"
          src="/react-icon-3.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(4)}
          className="react-icon"
          src="/react-icon-4.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(5)}
          className="react-icon"
          src="/react-icon-5.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(6)}
          className="react-icon"
          src="/react-icon-6.png"
        />
        <img
          onMouseUp={(e) => e.button == 0 && handleClick(7)}
          className="react-icon"
          src="/react-icon-7.png"
        />
      </div>
    </>
  );
};

const FileOnPost = ({ data, totalFile, index }) => {
  return (
    <div
      style={{
        width: config[totalFile - 1][index][0],
        paddingBottom: config[totalFile - 1][index][1],
        height: 0,
        position: "relative",
        paddingRight: 5,
      }}
    >
      {data.contentType.startsWith("image/") ? (
        <img
          src={data.url}
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            position: "absolute",
            border: "2px solid transparent",
          }}
        />
      ) : (
        <video
          src={data.url}
          width="100%"
          height="100%"
          style={{ position: "absolute", border: "2px solid transparent" }}
        />
      )}
    </div>
  );
};

const config = [
  [["100%", "100%"]],
  [
    ["50%", "50%"],
    ["50%", "50%"],
  ],
  [
    ["100%", "50%"],
    ["50%", "50%"],
    ["50%", "50%"],
  ],
  [
    ["50%", "50%"],
    ["50%", "50%"],
    ["50%", "50%"],
    ["50%", "50%"],
  ],
  [
    ["50%", "50%"],
    ["50%", "50%"],
    ["33.33%", "33.33%"],
    ["33.33%", "33.33%"],
    ["33.33%", "33.33%"],
  ],
];
