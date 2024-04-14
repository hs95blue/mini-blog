import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { data, addComment, addReply, deleteComment, updateComment, getPost } from '../../helper/local_storage_helper.js'
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
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const [render, setRender] = useState('');
    

    useEffect(()=>{
        getPost(postId).then((response)=>{
            setPost(response)
        })
    },[])

    const handleDeletePost = () => {
        deleteComment(postId, () => {
            navigate('/');
        });
    };

    const handleUpdateComment = (commentId, newContent) => {
        updateComment(post, commentId, newContent, () => {
            setComment('')
        });
    };

    const handleDeleteComment = (commentId) => {
        deleteComment(post, commentId, () => {
            setRender(!render)
        });
    };

    const handleAddComment = () =>{
        addComment(post, comment, ()=>{
            setComment('')
        } )
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
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} onUpdateComment={handleUpdateComment} onDeleteComment={handleDeleteComment} />
                
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
