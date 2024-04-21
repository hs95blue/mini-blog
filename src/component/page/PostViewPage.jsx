import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { delComment, delPost, delReply, getPost, postComment, postReply, putComment, putReply } from '../../helper/fakebackend_helper.js';
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
    },[render])

    const handleDeletePost = () => {
    
        delPost({postId:postId}).then(response => {
                alert('포스트가 삭제되었습니다!')
                navigate('/');
        })
    };

    const handleUpdateComment = (commentId, newContent) => {
        putComment({postId:postId, commentId:commentId,content:newContent}).then(response =>{
            setRender(!render)
        })
    };

    const handleDeleteComment = (commentId) => {
        delComment({commentId:commentId,postId:postId}).then(response =>{
            setRender(!render)
        })
    };

    const handleAddComment = () =>{
        postComment({postId:postId,comment:comment}).then(response => {
            setRender(!render)
            setComment('')
        })
       
    }
    
    const handleAddReply = (commentId, reply) =>{
        postReply({commentId:commentId, reply:reply}).then((response)=>{
            setRender(!render)
        })
    }

    const handleUpdateReply = (commentId, replyId, newContent) => {
        putReply({commentId:commentId, replyId:replyId, content:newContent}).then(()=>{
            setRender(!render)
        })
    };

    const handleDeleteReply = (commentId, replyId) => {
        delReply({commentId:commentId, replyId:replyId}).then(()=>{
            setRender(!render)
        })
    };

    

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
                <CommentList comments={postData.comments} 
                    onAddComment={handleAddComment} 
                    onUpdateComment={handleUpdateComment} 
                    onDeleteComment={handleDeleteComment} 
                    onAddReply={handleAddReply} 
                    onUpdateReply={handleUpdateReply} 
                    onDeleteReply={handleDeleteReply}
                />
                
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
