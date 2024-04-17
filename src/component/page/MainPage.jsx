import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import { getPosts } from '../../helper/fakebackend_helper';
const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function MainPage(props) {
    const navigate = useNavigate();
    const [data,setData] = useState([])

    useEffect(()=>{
        getPosts().then(response => {
            console.log(response)
            setData(response.data)
        })
    },[])
    return (
        <Wrapper>
            <Container>
                <Button
                    title='글 작성하기'
                    onClick={() => {
                        navigate('/post-form');
                    }}
                />

               {data && data.length > 0 && <PostList
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />}
            </Container>
        </Wrapper>
    );
}

export default MainPage;
