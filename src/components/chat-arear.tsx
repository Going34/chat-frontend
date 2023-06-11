/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { styled } from "styled-components";
import { Message, MessageInfo } from "../interface/message";
import { Input, InputAreaWrapper } from "../page/home-page";
import { LoginFormTitle } from "../page/login";
import { selectAuth } from "../store/auth/reducer";
import { FetchAllActionChat } from "../store/chat/action";
import { GetMessageAction, MessageSendAction } from "../store/message/action";
import { selectMessage, selectSendMessage } from "../store/message/reducer";
import { Flex } from "../style/common";
import DubbleTick from "../svg/dubble-tick";
import SingleTick from "../svg/single-tick";
import ChatTopBar from "./chat-userInfo-topbar";
import animationData from "./data.json";
import { NotificationGetAction } from "../store/notification/action";
import { selectNotification } from "../store/notification/reducer";

const ChatArea = styled(Box)`
  background-color: #f0eeee;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  /* border-top-right-radius: 0px;
  border-bottom-right-radius: 0px; */
  padding: 8px 4px;
  margin: 0px;
  overflow-x: auto;
  scroll-behavior: smooth;

  /* Customizing the scroll */
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e9dcdc;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  @media (max-width: 730px) {
    margin-top: -52px;
  }
`;

const ChatMessage = styled(Flex)<{ isAuth: boolean }>`
  padding: 4px 8px;
  background-color: ${(props) => (props.isAuth ? "#d2ec96" : "#dae7cd")};
  width: fit-content;
  margin: 6px;
  border-radius: 8px;
  min-width: 80px;
  flex-direction: column;
  max-width: 300px;
  /* word-break: break-all; */
  @media (max-width: 730px) {
    max-height: 200px;
  }
`;

const FixedContainer = styled(Flex)`
  position: fixed;
  width: auto;
  justify-content: center;
  bottom: 0;
  right: 4px;
  left: 340px;
  margin-bottom: 12px;
  flex-direction: column;
  @media (max-width: 730px) {
    left: 24px;
  }
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const UserChatShow = styled(LoginFormTitle)<{ selectChat: boolean }>`
  margin: 0px;
  font-size: initial;
  margin: 12px;
  display: initial;
  height: calc(100vh - 90px);
  overflow-x: auto;
  @media (max-width: 730px) {
    width: 100%;
    display: ${(props) => (props.selectChat ? "none" : "initial")};
  }
`;

const UserChatArea = styled(UserChatShow)<{ selectChat: boolean }>`
  width: 100%;
  height: calc(100vh - 0px);
  margin: 0px;
  border-radius: 0px;
  display: ${(props) => (props.selectChat ? "intial" : "flex")};
  position: relative;
  @media (max-width: 730px) {
    margin: 0;
    display: ${(props) => (props.selectChat ? "flex" : "none")};
  }
`;

function convertTimestampToTime(timestamp: string) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }

  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

function getDayFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
}
interface IChatArea {
  selectChat: boolean;
  chatId: string;
  socket: Socket;
  selectedChatCompare: string;
  setSelectedChat: () => void;
}

const MessageSendByUser = styled(Box)`
  font-size: 12px;
  margin: -3px -7px;
  margin-bottom: 4px;
  padding: 3px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: gray;
  color: #fff;
`;

const MessageDisplay = (props: IChatArea) => {
  const { selectChat, chatId, socket, selectedChatCompare, setSelectedChat } =
    props;
  const chatContainerRef = useRef<HTMLDivElement>();
  const [getMessage, setGetMessage] = useState<Message>({});
  const [messgeText, setMessageText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState<MessageInfo[]>([]);

  const auth = useSelector(selectAuth);

  const { id } = useParams();

  const backendNotification = useSelector(selectNotification);

  useEffect(() => {
    if (socket && backendNotification._id) {
      socket.emit("unreadBy", {
        messageIds: backendNotification.messageIds,
        userId: auth._id,
        chatId,
      });
    }
  }, [backendNotification]);

  useEffect(() => {
    dispatch(NotificationGetAction.request({ chatId, token: auth.token }));
    const messageIds = notification
      .filter((item) => item.chat?._id === id)
      .map((item) => item._id);
    console.log(messageIds);
    const notificationArray = notification.filter(
      (item) => item.chat?._id !== id
    );
    setNotification(notificationArray);
    if (socket && messageIds)
      socket.emit("unreadBy", { messageIds, userId: auth._id, chatId });
  }, [chatId, backendNotification]);

  const Message = useSelector(selectMessage);

  const sendMessage = useSelector(selectSendMessage);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (chatContainerRef.current)
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  // });

  useEffect(() => {
    setGetMessage(Message);
  }, [Message]);

  const handleGetMessage = () => {
    dispatch(
      GetMessageAction.request({
        chatId,
        token: auth.token,
        newChat: false,
        pageNumber: getMessage.page + 1,
        pageSize: 30,
      })
    );
  };

  useEffect(() => {
    setGetMessage((pre) => ({
      ...pre,
      messages: [...pre.messages, sendMessage],
      loading: false,
    }));
    if (socket) {
      socket.emit("new message", sendMessage);
      socket.emit("notification", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    if (getMessage.messages)
      console.log(
        getMessage.messages[getMessage.messages.length - 1],
        "update1"
      );
  }, [getMessage]);

  useEffect(() => {
    let flag = true;
    if (socket)
      socket.on("messageReceived", (newMessageRecieved: MessageInfo) => {
        console.log("notification", notification);
        if (
          !selectedChatCompare ||
          selectedChatCompare !== newMessageRecieved.chat?._id
        ) {
          //
          if (!notification.includes(newMessageRecieved))
            console.log(notification, "notification");
          setNotification((pre) =>
            pre.length > 0 ? [...pre, newMessageRecieved] : [newMessageRecieved]
          );
          dispatch(
            FetchAllActionChat.request({
              token: auth.token,
            })
          );
        } else if (!getMessage.messages.includes(newMessageRecieved) && flag) {
          setGetMessage((pre) => {
            return {
              ...pre,
              messages: [
                ...pre.messages,
                { ...newMessageRecieved, readBy: [chatId] },
              ],
            };
          });
          dispatch(
            FetchAllActionChat.request({
              token: auth.token,
            })
          );

          socket.emit("unreadBy", {
            messageIds: [newMessageRecieved._id],
            userId: auth._id,
            chatId,
          });

          flag = false;
        }
      });
    if (socket)
      return () => {
        socket.off("messageReceived");
      };
  });

  const handleMessageSend = () => {
    dispatch(
      MessageSendAction.request({
        chatId,
        content: messgeText,
        token: auth.token,
      })
    );
    if (socket) socket.emit("stop typing", chatId);
    const fetch = setTimeout(() => {
      dispatch(
        FetchAllActionChat.request({
          token: auth.token,
        })
      );
      clearTimeout(fetch);
    }, 500);
    setMessageText("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", (obj) =>
        obj.auth !== auth._id && obj.chatId === chatId
          ? setIsTyping(true)
          : setIsTyping(false)
      );
      socket.on("stop typing", () => setIsTyping(false));
    }

    // eslint-disable-next-line
  });

  const typingHandler = (e: any) => {
    setMessageText(e.target.value);

    if (!socketConnected) return;
    // eslint-disable-next-line prefer-const
    let clear;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { chatId, auth: auth._id });
    }
    clearTimeout(clear);
     clear = setTimeout(() => {
      socket.emit("stop typing", chatId);
      setTyping(false);
    }, 3000);
  };
  const [newMessage, setNewMessage] = useState<MessageInfo[]>([]);

  useEffect(() => {
    setGetMessage((prevMessages) => {
      const messageCount = Math.min(
        newMessage.length,
        prevMessages.messages.length
      );
      const updatedMessages = { ...prevMessages };

      for (let i = 1; i <= messageCount; i++) {
        const index = prevMessages.messages.length - i;
        const message = prevMessages.messages[index];
        const newReadBy = "newReadBy"; // Replace "newReadBy" with the actual value you want to update

        // eslint-disable-next-line no-prototype-builtins
        if (message.hasOwnProperty("readBy")) {
          updatedMessages.messages[index] = {
            ...message,
            readBy: [newReadBy],
          };
        }
      }
      return updatedMessages;
    });
  }, [newMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("readby", (updatedData: MessageInfo[]) => {
        setNewMessage(updatedData);
      });
    }
  });

  return (
    <UserChatArea selectChat={selectChat}>
      {!selectChat && <Flex>select chat</Flex>}
      {selectChat && (
        <ChatTopBar setSelectedChat={setSelectedChat} isTyping={istyping} />
      )}
      {selectChat && (
        <>
          <ChatArea
            id="scrollableDiv"
            position="relative"
            ref={chatContainerRef}
            style={{
              height: "calc(100vh - 140px)",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <InfiniteScroll
              dataLength={getMessage.messages.length}
              next={handleGetMessage}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              inverse={true}
              hasMore={true}
              loader={getMessage.loading && <h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <div  >
                {!getMessage.loading ? (
                  getMessage.messages.map((message, index) => {
                    const { content, createdAt, sender, chat } = message;
                    const day = getDayFromTimestamp(createdAt);
                    const time = convertTimestampToTime(createdAt);
                    const previousDay =
                      index > 0
                        ? getDayFromTimestamp(
                            getMessage.messages[index - 1].createdAt
                          )
                        : null;
                    const isAuthUser = message.sender._id === auth._id;
                    if (
                      index > 0 &&
                      getMessage.messages[index - 1]._id === message._id
                    ) {
                      return;
                    }
                    return (
                      <Box>
                        {day !== previousDay && (
                          <Flex textAlign={"center"} justifyContent="center">
                            {day}
                          </Flex>
                        )}
                        <Flex
                          justifyContent={
                            isAuthUser ? "flex-end" : "flex-start"
                          }
                        >
                          <ChatMessage isAuth={isAuthUser}>
                            {!isAuthUser && chat?.isGroupChat && (
                              <MessageSendByUser>
                                {sender.name}
                              </MessageSendByUser>
                            )}
                            <Box sx={{ wordBreak: "break-all" }}>{content}</Box>
                            <Typography
                              sx={{
                                color: "#b85959",
                                fontSize: "12px",
                                textAlign: "end",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {time}
                              {isAuthUser &&
                                (message.readBy.length > 0 ? (
                                  <DubbleTick />
                                ) : (
                                  <SingleTick />
                                ))}
                            </Typography>
                          </ChatMessage>
                        </Flex>
                      </Box>
                    );
                  })
                ) : (
                  <></>
                )}
                <Box ref={chatContainerRef} />
                {istyping && (
                  <Box marginBottom={1}>
                    {" "}
                    <Lottie
                      options={defaultOptions}
                      width={70}
                      style={{ marginBottom: 12, marginLeft: 0 }}
                    />
                  </Box>
                )}
              </div>
            </InfiniteScroll>
          </ChatArea>

          <Flex justifyContent="center"></Flex>

          <FixedContainer>
            <Flex>
              <InputAreaWrapper>
                <Input
                  type="text"
                  placeholder="send"
                  value={messgeText}
                  onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
                  onChange={typingHandler}
                />
              </InputAreaWrapper>
              <Button
                sx={{ marginLeft: "16px", marginRight: "12px" }}
                variant="contained"
                onClick={handleMessageSend}
              >
                Send
              </Button>
            </Flex>
          </FixedContainer>
        </>
      )}
    </UserChatArea>
  );
};

export default MessageDisplay;
