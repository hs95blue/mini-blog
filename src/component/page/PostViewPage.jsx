import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const data = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    const post = data.find(p => p.id === Number(postId)); // data 배열 내의 주소값을 가져옴
    const [comment, setComment] = useState('');

    
    const getNextCommentId = data => data.reduce((max, post) => 
        Math.max(max, ...post.comments.map(comment => comment.id)), 0) + 1;
           
    
    const addComment = () => {
        const newCommentId = getNextCommentId(data); // 새 댓글 ID 생성
        const newComment = {
            id: newCommentId,
            content: comment
        };
        post.comments.push(newComment); // 주소값을 가져온거라 data배열 자체가 업데이트됨.
        localStorage.setItem('posts', JSON.stringify(data));
        setComment(''); // 상태변경으로 리렌더링 
    };


    return (
        <Wrapper>
            <Container>
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <PostContainer>
                    <TitleText>{post && post.title}</TitleText>
                    <ContentText>{post && post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post && post.comments} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={addComment}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
