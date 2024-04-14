import React from 'react';
import styled from 'styled-components';
import CommentListItem from './CommentListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function CommentList(props) {
    const { comments, onUpdateComment, onDeleteComment } = props;

    return (
        <Wrapper>
            {comments && comments.map((comment, index) => {
                return (
                    <CommentListItem
                        key={comment.id}
                        comment={comment}
                        onUpdateComment={onUpdateComment}
                        onDeleteComment={onDeleteComment}
                    />
                );
            })}
        </Wrapper>
    );
}

export default CommentList;
