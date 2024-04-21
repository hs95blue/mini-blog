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
    // const data = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    return data
}

export const getPost = (postId) =>{
    const post = data.find(p => p.id === Number(postId));
    return post
}


const getComment = commentId => {
  // 먼저 해당 조건에 맞는 post를 찾음
  const post = data.find(post => 
        post.comments.some(comment => comment.id === Number(commentId))
    );

    // 찾은 post가 존재하면, 그 안의 comments에서 원하는 comment를 찾아 반환
    if (post) {
        return post.comments.find(comment => comment.id === Number(commentId));
    }

    // 해당 commentId를 가진 comment가 없다면, null 또는 undefined를 반환
    return null;
    }

const getReply = replyId => data.find((post) => 
    post.comments.find(
        comment => comment.replies.find(
            reply => reply.id === replyId
        )
))


// 로컬스토리지에 저장
export const addPost = (title, content) => {
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

export const addComment = (postId, comment) => {
    const newCommentId = getNextCommentId(data); // 새 댓글 ID 생성
    const newComment = {
        id: newCommentId,
        content: comment,
        replies: []
    };
    const post = data.find(p => p.id === Number(postId));
    post.comments.push(newComment); // 주소값을 가져온거라 data배열 자체가 업데이트됨.
    localStorage.setItem('posts', JSON.stringify(data));
};

export const addReply = (commentId, replyContent) => {
    const newReplyId = getNextReplyId(data); // 대댓글에도 고유 ID 생성
    const newReply = {
        id: newReplyId,
        content: replyContent
    };
    console.log(commentId)
    console.log(replyContent)
    const comment = getComment(commentId)
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

export const updateReply = (commentId, replyId, newContent) => {

  const comment = getComment(commentId)
  const reply = comment.replies.find(r => r.id === Number(replyId));
    if (reply) {
        reply.content = newContent;
        localStorage.setItem('posts', JSON.stringify(data));
    }
};

export const deletePost = (postId) => {
    console.log(data)

  const index = data.findIndex(post => post.id === Number(postId));
  if (index !== -1) {
    data.splice(index, 1); // 삭제
    localStorage.setItem('posts', JSON.stringify(data));
    }
};

export const deleteComment = (postId, commentId) => {
    const post = getPost(postId)
    const index = post.comments.findIndex(comment => comment.id === Number(commentId));
    console.log(postId, commentId)
    if (index !== -1) {
        post.comments.splice(index, 1); // 삭제
        localStorage.setItem('posts', JSON.stringify(data));
      }

};

export const deleteReply = (commentId, replyId) => {
    const comment = getComment(commentId)
    const index = comment.replies.findIndex(reply => reply.id === Number(replyId));
    if (index !== -1) {
        comment.replies.splice(index, 1); // 삭제
        localStorage.setItem('posts', JSON.stringify(data));
      }
     
};