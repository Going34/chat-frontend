import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { Flex } from "../style/common";
import { AllChat } from "../interface/display-chat";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/auth/reducer";
import { IUser } from "../store/auth/action";

const UserDisplay = styled(Flex)`
  padding: 8px 12px;
  border-radius: 8px;
  gap: 12px;
  align-items: center;
  background-color: #e2f1f0;
  width: 100%;

  &:hover {
    background-color: #c9dad8;
  }
`;

const Ellipsis = styled(Typography)`
  width: 200px; /* Set the width of the container */
  white-space: nowrap; /* Prevent the text from wrapping */
  overflow: hidden; /* Hide the overflowing content */
  text-overflow: ellipsis;
  font-size: 14px;
  @media (max-width:730px) {
    width: 130px;
  }
`;

const ChatDisplay = (props: { chat?: AllChat; userInfo?: IUser }) => {
  const { chat, userInfo } = props;
  const auth = useSelector(selectAuth);

  const name = chat?.isGroupChat
    ? chat?.chatName
    : chat?.users?.[0]?.participants?._id === auth._id
    ? chat?.users?.[1]?.participants?.name
    : chat?.users?.[0]?.participants?.name || userInfo?.name;

  const avatar = chat?.isGroupChat ? chat.pic :
    chat?.users?.[0]?.participants?._id === auth._id
      ? chat.users?.[1]?.participants?.pic
      : chat?.users?.[0]?.participants?.pic || userInfo?.pic;

  const latestMessage = chat?.latestMessage?.content;

  const lastMessageSentBy =
    chat?.latestMessage?.sender?._id === auth._id
      ? "You"
      : chat?.latestMessage?.sender?.name;

  return (
    <UserDisplay>
      <Avatar src={avatar} />
      <Box>
        <Typography fontSize={20}>{name}</Typography>
        {lastMessageSentBy && (
          <Ellipsis>{`${lastMessageSentBy}: ${latestMessage}`}</Ellipsis>
        )}
      </Box>
    </UserDisplay>
  );
};

export default ChatDisplay;
