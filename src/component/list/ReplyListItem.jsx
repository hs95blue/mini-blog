import React, { useState } from "react";
import styled from "styled-components";
import TextInput from '../ui/TextInput';
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin-bottom:0 !important;
    position:relative;
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

const ReplyDiv = styled.div`
width: calc(100% - 70px);
padding: 8px 16px;
display: flex;
align-items: flex-start;
justify-content: space-between;
border: 1px solid grey;
border-radius: 8px;
margin-bottom:5px !important;
&:before{
    content: "ㄴ";
    display: block;
    position: absolute;
    left: 10px;
    top: 20px;      
    font-size: 12px;
    color: grey;
    font-weight:bold;
}
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

const ButtonDiv = styled.div`
display:flex;
min-width:90px;
`;


function ReplyListItem(props) {
    const { reply, comment, onUpdateReply, onDeleteReply } = props;
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState(reply.content)

    const handleReplyUpdate = ()=>{
        onUpdateReply(reply.id, content)
        setEdit(false)
    }
    const handleReplyDelete = ()=>{
        onDeleteReply(reply.id)
    }
    
    return (
        <Wrapper>
            <ReplyDiv>
                {edit ? 
                 <TextInput 
                 height={40} 
                 width={10}
                 value={content}  
                 defaultValue={reply.content} 
                 onChange={(event) => {
                    setContent(event.target.value);
                }} />
                :
                <ContentText>{reply.content}</ContentText>
                }
                <ButtonDiv>
                    {!edit ? 
                    <Button onClick={()=>setEdit(true)}>수정</Button>
                    :
                    <Button onClick={handleReplyUpdate}>완료</Button>
                    }
                    <Button onClick={handleReplyDelete}>삭제</Button>
                </ButtonDiv>
            </ReplyDiv>
        </Wrapper>
    );
}

export default ReplyListItem;
