import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { Container } from '../../styles/styles';
import { addPost, updatePost } from  '../../helper/local_storage_helper'
import { data } from '../../helper/local_storage_helper';
import { post, put } from '../../helper/api_helper';
const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;



function PostFormPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const postData = postId && data.find(p => p.id === Number(postId)); // data 배열 내의 주소값을 가져옴
    const [title, setTitle] = useState(postId?postData.title:'');
    const [content, setContent] = useState(postId?postData.content:'');
    const handleAddPost = () => {
        post(`/api/post`,{title:title,content:content}).then(() =>{
            navigate('/');
        })
    };
    const handleUpdatePost = () => {
        postId && put(`/api/post/${postId}`,{title:title,content:content}).then(response =>{
            navigate('/');  
        })
    };

    return (
        <Wrapper>
            <Container>
                <TextInput
                    width={32}
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput
                    width={32}
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />

                {!postId ? 
                <Button
                    title='글 작성하기'
                    onClick={handleAddPost}
                />
                :
                <Button
                title='수정'
                onClick={handleUpdatePost}
                />
                }
            </Container>
        </Wrapper>
    );
}

export default PostFormPage;
