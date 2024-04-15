import { addComment, addPost, addReply, deleteComment, deletePost, deleteReply, getPost, getPosts, updateComment, updatePost, updateReply } from './local_storage_helper';



export const get = async (url, config = {}) => {
  let action = null
//   switch(baseUrl) {
//     case '/api/posts':
//       action = getPosts
//       break;
//     case '/api/post/':

//       action = getpost
//       break;
//     default:
//       throw new Error('Unsupported URL');
//  } 스위치 문으로 하려다가 실패..
  if(url === '/api/posts'){
    action = getPosts
  }else if(url.includes('/api/post/')){
    const postId = url.replace('/api/post/', ''); // postId 추출
    action = () => getPost(postId);
  }
  
  // else if(url.include('/api/comments')){
  //   action = getComments()
  // }else if(url.include('/api/comment')){
  //   action = getReplies()
  // }
  // 보통 댓글과 대댓글은 백엔드에 api를 따로 요청하는지 궁금함.(한개의 api로 한꺼번에 처리하는지)

  return new Promise((resolve, reject) => {
    try {
      const data = action()
      const response = {
        status:200,
        data:data
      }
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const post = async (url, data, config = {}) => {
   let action = null
  if(url.includes('/api/post')){
    action = () => addPost(data.title, data.content)
  }else if(url.includes('/api/comment')){
    action = () => addComment(data.postData, data.comment)
  }else if(url.includes('/api/reply')){
    action = () => addReply(data.comment, data.reply)
  }
  return new Promise((resolve, reject) => {
    try {
      const data = action()
      const response = {
        status:200,
        data:data
      } // 보통 프론트에서 post요청하고 넣은데이터를 결과값으로 받는지?(확인 용도 혹은 리렌더링 용도?)
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const put = async (url, data, config = {}) => {
   let action = null  
   const urlParts = url.split('?')
   const baseUrl = urlParts[0]; // 기본 URL
   const queryString = urlParts[1] ? urlParts[1] : ''; // 쿼리 파라미터
  if(baseUrl.includes('/api/post/')){
    const postId = baseUrl.replace('/api/post/', ''); // postId 추출
    action = () => updatePost(postId, data.title, data.content);
  }else if(baseUrl.includes('/api/comment/')){
    const commentId = baseUrl.replace('/api/comment/', ''); // commentId 추출
    action = () => updateComment(queryString.replace('postId=',''), commentId, data);
  }else if(baseUrl.includes('/api/reply/')){
    const replyId = baseUrl.replace('/api/reply/', ''); // replyId 추출
    action = () => updateReply(data.comment, replyId, data.reply);
  }
  return new Promise((resolve, reject) => {
    try {
      const data = action()
      const response = {
        status:200,
        data:data
      } // 보통 프론트에서 put요청하고 넣은데이터를 결과값으로 받는지?(확인 용도 혹은 리렌더링 용도?)
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const del = async (url, data, config = {}) => {
   let action = null  
   const urlParts = url.split('?')
   const baseUrl = urlParts[0]; // 기본 URL
   const queryString = urlParts[1] ? urlParts[1] : ''; // 쿼리 파라미터
   
  if(baseUrl.includes('/api/post/')){
    const postId = baseUrl.replace('/api/post/', ''); // postId 추출
    action = () => deletePost(postId);
  }else if(baseUrl.includes('/api/comment/')){
    const commentId = baseUrl.replace('/api/comment/', ''); // commentId 추출
    action = () => deleteComment(queryString.replace('postId=',''), commentId);
  }else if(baseUrl.includes('/api/reply/')){
    const replyId = baseUrl.replace('/api/reply/', ''); // replyId 추출
    action = () => deleteReply(data, replyId);
  }
  return new Promise((resolve, reject) => {
    try {
      action()
      const response = {
        status:200
      }
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};