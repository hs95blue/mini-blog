import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './component/page/MainPage';
import PostFormPage from './component/page/PostFormPage';
import PostViewPage from './component/page/PostViewPage';
import fakeBackend from "./helper/fakeBackend";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    fakeBackend()
    return (
        <BrowserRouter>
            <MainTitleText>현식의 미니 블로그</MainTitleText>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="post-form" element={<PostFormPage />} />
                <Route path="post-form/:postId" element={<PostFormPage />} />
                <Route path="post/:postId" element={<PostViewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
