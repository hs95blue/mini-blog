export const data = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []





// post ID 구하기
const getNextPostId = data => data.reduce((max, post) => Math.max(max, post.id), 0) + 1;

// comment ID 구하기
const getNextCommentId = data => data.reduce((max, post) => 
    Math.max(max, ...post.comments.map(comment => comment.id)), 0) + 1;
       
// reply ID 구하기
const getNextReplyId = data => {
    return data.reduce((maxPost, post) => {
        // 각 포스트의 댓글에서 대댓글 ID를 추출
        const maxReplyInPost = post.comments.reduce((maxComment, comment) => {
            const maxReplyInComment = comment.replies.reduce((maxReply, reply) => Math.max(maxReply, reply.id), 0);
            return Math.max(maxComment, maxReplyInComment);
        }, 0);
        return Math.max(maxPost, maxReplyInPost);
    }, 0) + 1;
};

export const getPosts = () =>{
    const data = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    return data
}

export const getPost = (postId) =>{
    const post = data.find(p => p.id === Number(postId));
    return post
}


// 로컬스토리지에 저장
export const addPost = (title, content) => {
    console.log(title)
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
};

export const addComment = (post, comment) => {
    const newCommentId = getNextCommentId(data); // 새 댓글 ID 생성
    const newComment = {
        id: newCommentId,
        content: comment,
        replies: []
    };
    post.comments.push(newComment); // 주소값을 가져온거라 data배열 자체가 업데이트됨.
    localStorage.setItem('posts', JSON.stringify(data));
};

export const addReply = (comment, replyContent) => {

    const newReplyId = getNextReplyId(data); // 대댓글에도 고유 ID 생성
    const newReply = {
        id: newReplyId,
        content: replyContent
    };

    // 대댓글을 해당 댓글의 replies 배열에 추가
    comment.replies.push(newReply);

    // 변경된 data를 LocalStorage에 저장
    localStorage.setItem('posts', JSON.stringify(data));
};
export const updatePost = (postId, newTitle, newContent) => {
    const post = data.find(post => post.id === Number(postId));
    if (post) {
        post.title = newTitle;
        post.content = newContent;
        localStorage.setItem('posts', JSON.stringify(data));
    }
};
export const updateComment = (postId, commentId, newContent) => {
  const post = getPost(postId)
  const comment = post.comments.find(c => c.id === Number(commentId));
  if (comment) {
      comment.content = newContent;
      localStorage.setItem('posts', JSON.stringify(data));
  }
};

export const updateReply = (comment, replyId, newContent) => {
  const reply = comment.replies.find(r => r.id === Number(replyId));
    if (reply) {
        reply.content = newContent;
        localStorage.setItem('posts', JSON.stringify(data));
    }
};

export const deletePost = (postId) => {
  const index = data.findIndex(post => post.id === Number(postId));
  if (index !== -1) {
    data.splice(index, 1); // 삭제
    localStorage.setItem('posts', JSON.stringify(data));
    }
};

export const deleteComment = (postId, commentId) => {
    const post = getPost(postId)
    const index = post.comments.findIndex(comment => comment.id === Number(commentId));
    if (index !== -1) {
        post.comments.splice(index, 1); // 삭제
        localStorage.setItem('posts', JSON.stringify(data));
      }

};

export const deleteReply = (comment, replyId) => {
    const index = comment.replies.findIndex(reply => reply.id === Number(replyId));
    if (index !== -1) {
        comment.replies.splice(index, 1); // 삭제
        localStorage.setItem('posts', JSON.stringify(data));
      }
     
};