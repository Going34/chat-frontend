import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../customHook/debounce";
import { Input, InputAreaWrapper } from "../page/home-page";
import { IUsers, SearchAction } from "../store/user/action";
import { Flex } from "../style/common";
import Cross from "../svg/cross";
import ModalAnimation from "./animation-modal";
import ChatDisplay from "./user-display";
import { GroupCreateAction } from "../store/group/action";
import { selectAuth } from "../store/auth/reducer";

interface ICreateGroup {
  userInfo: IUsers[];
  isOpen: boolean;
  setIsClose: (e: boolean) => void;
}

const CreateGroup = (props: ICreateGroup) => {
  const { userInfo, isOpen, setIsClose } = props;

  const [selectUserForGroupChat, setUserForGroupChat] = useState<IUsers[]>([]);
  const [serachUserGroup, setSearchGroup] = useState("");
  const [chatName, setChatName] = useState("");
  const auth = useSelector(selectAuth);

  const debouncedSearchTerm = useDebounce(serachUserGroup, 300);

  const handleClick = (user: IUsers) => {
    setUserForGroupChat((pre) => (pre ? [...pre, user] : [user]));
  };

  const handleRemoveUserSelect = (user: IUsers) => {
    setUserForGroupChat((pre) => pre.filter((innerUser) => innerUser !== user));
  };

  const filteredUserInfo = useMemo(() => {
    if (Array.isArray(userInfo) && userInfo.length > 0) {
      return userInfo.filter((user) => !selectUserForGroupChat.includes(user));
    }
    return [];
  }, [userInfo, selectUserForGroupChat]);

  const dispatch = useDispatch();

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
  }, [auth.token, debouncedSearchTerm, dispatch]);

  const groupArray = useMemo(() => {
    if (
      Array.isArray(selectUserForGroupChat) &&
      selectUserForGroupChat.length > 0
    ) {
      return selectUserForGroupChat.map((user) => user._id);
    }
    return [];
  }, [selectUserForGroupChat]);

  const handleGroupCreate = () => {
    dispatch(
      GroupCreateAction.request({
        chatName,
        group: JSON.stringify(groupArray),
        token: auth.token,
      })
    );
    setIsClose(false)
  };

  return (
    <ModalAnimation isOpen={isOpen} close={() => setIsClose(false)}>
      <Flex width="100%" marginTop={5} gap={2}>
        <InputAreaWrapper>
          <Input
            type="text"
            placeholder="Search user..."
            value={serachUserGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
          />
        </InputAreaWrapper>
        <InputAreaWrapper>
          <Input
            type="text"
            placeholder="group name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
        </InputAreaWrapper>
        <Button variant="contained" onClick={handleGroupCreate}>
          create
        </Button>
      </Flex>
      <Flex gap={2} flexWrap="wrap">
        {selectUserForGroupChat.map((user) => {
          return (
            <Flex
              color="white"
              alignItems="center"
              sx={{
                backgroundColor: "blue",
                padding: "4px 8px",
                gap: "8px",
                marginTop: "12px",
                borderRadius: "8px",
              }}
            >
              <Box>{user.name}</Box>

              <Cross onClick={() => handleRemoveUserSelect(user)} />
            </Flex>
          );
        })}
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        {filteredUserInfo.length > 0 &&
          debouncedSearchTerm &&
          filteredUserInfo.map((user) => (
            <Box onClick={() => handleClick(user)}>
              <ChatDisplay
                key={user._id}
                userInfo={user}
              />
            </Box>
          ))}
      </Flex>
    </ModalAnimation>
  );
};

export default CreateGroup;
