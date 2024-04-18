import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { del, get, post, put } from '../../helper/api_helper.js';
import { getPost, delPost } from '../../helper/fakebackend_helper.js';
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

const ButtonDiv = styled.div`
display:flex;
justify-content:space-between;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [postData, setPostData] = useState({});
    const [comment, setComment] = useState('');
    const [render, setRender] = useState('');
    

    useEffect(()=>{
        getPost(postId).then((response)=>{
            setPostData(response)
        })
    },[])

    const handleDeletePost = () => {
        delPost(postId).then(response => {
            if(response.status === 200){ 
                // 그냥 status를 넣었으니까 써봤는데,,, 실무에서는 어떻게 하는지?(이미 resolve된거라,.,)
                // 백엔드에서도 에러가 나거나 예외가 발생했을때 어떤 코드를 주는지 궁금함.
                // 회사에서는 단순히 000, 001 이런 의미 없는 코드를 응답해서 예외를 처리하고 있음.
                alert('포스트가 삭제되었습니다!')
                navigate('/');
            }
        })
    };

    const handleUpdateComment = (commentId, newContent) => {
        put(`/api/comment/${commentId}?postId=${postId}`, newContent).then(response =>{
            setComment('')
        })
    };

    const handleDeleteComment = (commentId) => {
        del(`/api/comment/${commentId}?postId=${postId}`).then(response =>{
            setRender(!render)
        })
    };

    const handleAddComment = () =>{
        post(`/api/comment`, {postData:postData,comment:comment}).then(response => {
            setComment('')
        })
       
    }

    return (
        <Wrapper>
            <Container>
                <ButtonDiv>
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <div>
                <Button
                    title='수정'
                    onClick={()=>{navigate(`/post-form/${postId}`);}}
                />
                <Button
                    title='삭제'
                    onClick={handleDeletePost}
                />
                </div>
             
                </ButtonDiv>
                <PostContainer>
                    <TitleText>{postData.title}</TitleText>
                    <ContentText>{postData.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={postData.comments} onUpdateComment={handleUpdateComment} onDeleteComment={handleDeleteComment} />
                
                <TextInput
                    width={32}
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={handleAddComment}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
