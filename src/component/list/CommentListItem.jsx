import React, { useState } from "react";
import styled from "styled-components";
import ReplyList from './ReplyList';
import { addReply, deleteReply, updateReply } from '../../helper/local_storage_helper';
import TextInput from '../ui/TextInput';
import { del, post, put } from '../../helper/api_helper';
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom:0 !important;
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

const CommentDiv = styled.div`
width: calc(100% - 32px);
padding: 8px 16px;
display: flex;
align-items: flex-start;
justify-content: space-between;
border: 1px solid grey;
border-radius: 8px;
margin-bottom:5px !important;

`;

const Button = styled.button`
border-radius:5px;
border: 1px solid lightgray;
margin-right: 2px;
margin-bottom: auto;
cursor: pointer;
background: white;
:hover {
    background: lightgrey;
}
`;

const ReplyButton = styled.button`
border-radius:5px;
border: 1px solid lightgray;
width:100px;
margin-bottom: auto;
cursor: pointer;
:hover {
    background: lightgrey;
}
`;

const ButtonDiv = styled.div`
display:flex;
min-width:130px;
`;

const ReplyDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-end;
align-items:flex-end;
width:100%;
margin-bottom:5px;
`;
function CommentListItem(props) {
    const { comment, onUpdateComment, onDeleteComment } = props;
    const [ replyFlag, setReplyFlag ] = useState(false);
    const [ reply, setReply ] = useState('');
    const [ render, setRender ] = useState('');
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState(comment.content)
   
    
    const handleUpdateComment = ()=>{
        onUpdateComment(comment.id, content)
        setEdit(false)
    }
    const handleDeleteComment = ()=>{
        onDeleteComment(comment.id)
    }
    

    const handleUpdateReply = (replyId, newContent) => {
        put(`/api/reply/${replyId}`,{comment:comment, reply:newContent}).then(()=>{
            setReply('')
        })
    };

    const handleDeleteReply = (replyId) => {
        del(`/api/reply/${replyId}`, comment).then(()=>{
            setRender(!render)
        })
    };
    const handleAddReply = () =>{
        post(`/api/reply`,{comment:comment, reply:reply}).then(()=>{
            setReply('')
            setReplyFlag(false)
        })
    }
    return (
        <Wrapper>
                <CommentDiv>
                    {edit ? 
                    <TextInput
                    width={100}
                    height={40} 
                    value={content}  
                    onChange={(event) => {
                        setContent(event.target.value);
                    }} />
                    :
                    <ContentText>{comment.content}</ContentText>
                    }
                    <ButtonDiv>
                        <Button onClick={()=>setReplyFlag(!replyFlag)}>답글</Button>
                        {!edit ? 
                        <Button onClick={()=>setEdit(true)}>수정</Button>
                        :
                        <Button onClick={handleUpdateComment}>완료</Button>
                        }
                        <Button onClick={handleDeleteComment}>삭제</Button>
                    </ButtonDiv>
                </CommentDiv>
                <ReplyDiv>
                {comment.replies && comment.replies.length > 0 &&
                    <ReplyList comment={comment} onUpdateReply={handleUpdateReply} onDeleteReply={handleDeleteReply} />
                }
                {replyFlag && 
                <>
                <TextInput
                    width={70}
                    height={40}
                    value={reply}
                    onChange={(event) => {
                        setReply(event.target.value);
                    }}
                />
                <ReplyButton onClick={handleAddReply}>등록</ReplyButton>
                </>
                }
                </ReplyDiv>
        </Wrapper>
    );
}

export default CommentListItem;
