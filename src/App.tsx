import { Box } from "@mui/material";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import "./App.css";
import HomePage from "./page/home-page";
import Login from "./page/login";
import { AutoLogin } from "./store/auth/action";
import { selectAuth } from "./store/auth/reducer";

const Wrapper = styled(Box)`
  background-image: url("https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww&w=1000&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-width: 100%;
  min-height: 100vh;
  height: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  useLayoutEffect(() => {
    const token = localStorage.getItem("chatToken");
    if (token) dispatch(AutoLogin.request());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {user._id && (
              <>
                {" "}
                <Route path="/allchat" element={<HomePage />} />
                <Route path="/chat/:id" element={<HomePage />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </Wrapper>
  );
}

export default App;
