import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

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

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const data = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    
  
    // post ID 구하기
    const getNextPostId = data => data.reduce((max, post) => Math.max(max, post.id), 0) + 1;

    // 로컬스토리지에 저장
    const addPost = () => {
        const newPostId = getNextPostId(data); // 새 글 ID 생성
        const newPost = {
            id: newPostId,
            title: title,
            content: content,
            comments: []
        };
        data.push(newPost)
        // 로컬스토리지는 메인스레드에서 실행되고 완료까지 다른 스크립트 실행 막음. 동기적
        localStorage.setItem('posts', JSON.stringify(data));
        alert('글 작성이 완료되었습니다!')
        // 다 끝난 후 화면이동
        navigate('/');
    };


    
    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />

                <Button
                    title='글 작성하기'
                    onClick={addPost}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
