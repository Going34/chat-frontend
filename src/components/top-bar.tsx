import { Avatar, Box } from "@mui/material";
import { styled } from "styled-components";
import { Flex } from "../style/common";
import IconMenu from "../svg/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOutAction } from "../store/auth/action";
import { selectAuth } from "../store/auth/reducer";

const NavBar = styled(Box)`
  width: 100%;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 12px;
`;

const CustomButton = styled(Flex)`
  font-size: 14px;
  cursor: pointer;
  padding: 20px;
  /* padding-bottom: 0px; */
  &:hover {
    background-color: aliceblue;
  }
`;

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the popup
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(LogOutAction.request());
    localStorage.removeItem("chatToken");
    window.location.href = "/";
  };

  return (
    <NavBar>
      <Box>Welcome</Box>
      <Flex
        onClick={() => setIsOpen(true)}
        sx={{
          backgroundColor: "#e9e9f0",
          padding: "6px 18px",
          height: "fit-content",
          borderRadius: "28px",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          position: "relative",
        }}
      >
        <Avatar sx={{ width: "40px", height: "40px" }} src={auth.pic} />
        <IconMenu />{" "}
        {isOpen && (
          <Flex
            sx={{
              flexDirection: "column",
              position: "absolute",
              marginRight: "123px",
              marginTop: "70px",
              zIndex: 999,
              top: "0px",
              backgroundColor: "white",
              width: "200px",
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
            }}
            ref={popupRef}
          >
            <CustomButton >MyProfile</CustomButton>
            <CustomButton onClick={LogOut} >
              LogOut
            </CustomButton>
          </Flex>
        )}
      </Flex>
    </NavBar>
  );
};

export default TopBar;
