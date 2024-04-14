import React from 'react';
import styled from 'styled-components';
import CommentListItem from './CommentListItem';
import ReplyListItem from './ReplyListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width:100%;
    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function ReplyList(props) { 
    const { comment, onUpdateReply, onDeleteReply } = props;
    const replies = comment.replies
    return (
        <Wrapper>
            {replies && replies.map((reply, index) => {
                return (
                    <ReplyListItem
                        key={reply.id}
                        reply={reply}
                        comment={comment}
                        onUpdateReply={onUpdateReply} 
                        onDeleteReply={onDeleteReply} 
                    />
                );
            })}
        </Wrapper>
    );
}

export default ReplyList;
