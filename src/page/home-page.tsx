/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { styled } from "styled-components";
import MessageDisplay from "../components/chat-arear";
import CreateGroup from "../components/create-group";
import TopBar from "../components/top-bar";
import ChatDisplay from "../components/user-display";
import { useDebounce } from "../customHook/debounce";
import { AllChat } from "../interface/display-chat";
import { selectAuth } from "../store/auth/reducer";
import { CreateChatAction, FetchAllActionChat } from "../store/chat/action";
import { selectChatInfo, selectCreateChatDetails } from "../store/chat/reducer";
import { GetMessageAction } from "../store/message/action";
import { selectSendMessage } from "../store/message/reducer";
import { SearchAction } from "../store/user/action";
import { selectSearch } from "../store/user/reducer";
import { Flex } from "../style/common";
import { LoginFormTitle } from "./login";

export const UserChatShow = styled(LoginFormTitle)<{ selectChat: boolean }>`
  margin: 0px;
  font-size: initial;
  /* margin: 12px; */
  display: initial;
  max-width: 328px;
  border-radius: 0px;
  width: 328px;
  min-width: 328px;
  padding-top: 0px;
  height: calc(100vh - 0px);
  /* overflow-x: auto; */
  @media (max-width: 730px) {
    width: 100%;
    max-width: 100%;
    min-width: auto;
    display: ${(props) => (props.selectChat ? "none" : "initial")};
  }
  &::-webkit-scrollbar {
    width: 4px;
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
    background-color: white;
  }
`;
const ExistingUserContainer = styled(Flex)`
  flex-direction: column;
  gap: 8px;
  width: 312px;
  margin-top: 120px;
  height: calc(100vh - 184px);
  padding-right: 12px;

  overflow-x: auto;
  @media (max-width: 730px) {
    width: 100%;
  }
  &::-webkit-scrollbar {
    width: 4px;
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
    background-color: white;
  }
`;

const TabSwitch = styled.div`
  position: fixed;
  background-color: white;
  width: 290px;
  z-index: 9;
  padding-top: 12px;
  padding-bottom: 12px;
  @media (max-width: 730px) {
    width: calc(100% - 50px);
  }
`;

const CustomButton = styled("button")`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: #e2f1f0;
`;

export const InputAreaWrapper = styled(Flex)`
  border: 1px solid #ca9d9d;
  border-radius: 4px;
  width: calc(100%);
  flex: 1;
  padding: 4px;

  &:focus-within {
    border-color: blue;
  }
`;

const Tab = styled(Flex)<{ isChatTabSelected: boolean }>`
  width: 100%;
  padding: 5px 10px;
  justify-content: center;
  border-radius: 8px;
  transition: 0.3s;
  background-color: ${(props) => props.isChatTabSelected && "#f4f4fa"};
  color: ${(props) => props.isChatTabSelected && "#727292"};
`;

export const Input = styled("input")`
  outline: none;
  border: none;
  height: 40px;
  font-size: 16px;
  min-width: 100%;
  padding: 0px 8px;
`;

const ENDPOINT = "https://chat-backend-ge69.onrender.com:8000";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: string;

const HomePage = () => {
  
  const [searchUser, setSearchUser] = useState("");
  const [selectTab, setSelectTab] = useState("chat");
  const [selectChat, setSelectChat] = useState(false);
  const [isOpen, setIsClose] = useState(false);
  const [chatId, setChatId] = useState("");
  const auth = useSelector(selectAuth);

  const [getChat, setGetChat] = useState<AllChat[]>([]);

  const allChat = useSelector(selectChatInfo);
  const newChat = useSelector(selectCreateChatDetails);
  const { id } = useParams();
  useEffect(() => {
    if (id && auth.token) {
      setChatId(id);
      console.log("dddddddd", id);
    }
  }, [id]);
  const navigate = useNavigate();
  useEffect(() => {
    setGetChat((pre) => [...pre, newChat]);
    if (newChat._id) setSelectChat(true);
    setChatId(newChat._id);
    if (newChat._id) navigate(`/chat/${newChat._id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChat]);

  useEffect(() => {
    setGetChat(allChat);
  }, [allChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth);
    // eslint-disable-next-line
  }, []);

  const sendMessage = useSelector(selectSendMessage);

  useEffect(() => {
    socket.emit("new message", sendMessage);
  }, [sendMessage]);

  const debouncedSearchTerm = useDebounce(searchUser, 300);

  const userInfo = useSelector(selectSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    const chatConnect = id || chatId;
    dispatch(
      GetMessageAction.request({
        chatId: chatConnect,
        token: auth.token,
        newChat: true,
        pageNumber: 1,
        pageSize: 30,
      })
    );
    setChatId(chatConnect);
    socket.emit("join chat", chatConnect);
    selectedChatCompare = chatConnect;

    if (id) setSelectChat(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, id]);

  useEffect(() => {
    dispatch(
      FetchAllActionChat.request({
        token: auth.token,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const phoneNumber = debouncedSearchTerm;
    if (phoneNumber.length > 8) {
      dispatch(
        SearchAction.request({
          search: phoneNumber,
          token: auth.token,
        })
      );
    } else {
      dispatch(
        SearchAction.request({
          search: phoneNumber,
          token: auth.token,
        })
      );
    }
  }, [debouncedSearchTerm, dispatch, auth.token]);

  const isChatTabSelected = selectTab === "chat";

  const handleCreateChatWithNewUser = (userId: string) => {
    dispatch(CreateChatAction.request({ userId, token: auth.token }));
  };
  return (
    <Box>
      <CreateGroup
        userInfo={userInfo}
        isOpen={isOpen}
        setIsClose={setIsClose}
      />
      <Flex>
        <UserChatShow selectChat={selectChat}>
          <TopBar />
          <TabSwitch>
            <Flex justifyContent="space-between" alignItems="center">
              <Typography>My Chat</Typography>
              <CustomButton onClick={() => setIsClose(true)}>
                {" "}
                New Group{" "}
              </CustomButton>
            </Flex>
            <Flex marginTop={2}>
              <Tab
                isChatTabSelected={isChatTabSelected}
                onClick={() => setSelectTab("chat")}
              >
                Chat
              </Tab>
              <Tab
                isChatTabSelected={!isChatTabSelected}
                onClick={() => setSelectTab("")}
              >
                New user
              </Tab>
            </Flex>
          </TabSwitch>
          {!isChatTabSelected ? (
            <Box marginTop={1}>
              <Flex width="100%" marginTop={13}>
                <InputAreaWrapper>
                  <Input
                    type="text"
                    placeholder="Search user..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </InputAreaWrapper>
              </Flex>
              <Flex
                style={{
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                {userInfo.length > 0 &&
                  debouncedSearchTerm &&
                  userInfo.map((user) => (
                    <Box onClick={() => handleCreateChatWithNewUser(user._id)}>
                      <ChatDisplay key={user._id} userInfo={user} />
                    </Box>
                  ))}
              </Flex>
            </Box>
          ) : (
            <ExistingUserContainer>
              {getChat.map((item) => {
                return (
                  <Box
                    onClick={() => {
                      setChatId(item._id);
                    }}
                  >
                    <Link to={`/chat/${item._id}`}>
                      <ChatDisplay chat={item} />
                    </Link>
                  </Box>
                );
              })}
            </ExistingUserContainer>
          )}
        </UserChatShow>

        <MessageDisplay
          chatId={chatId}
          setSelectedChat={() => setSelectChat(false)}
          selectChat={selectChat}
          selectedChatCompare={selectedChatCompare}
          socket={socket}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;
