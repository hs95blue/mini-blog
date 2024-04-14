import { getPost, getPosts } from './local_storage_helper';



export const get = async (url, config = {}) => {
  let action = null
  const urlParts = url.split('?'); // URL 파라미터 분리
  const baseUrl = urlParts[0]; // 기본 URL
  const queryString = urlParts[1] ? urlParts[1] : ''; // 쿼리 파라미터
//   switch(baseUrl) {
//     case '/api/posts':
//       action = getPosts
//       break;
//     case '/api/post/':

//       action = getpost
//       break;
//     default:
//       throw new Error('Unsupported URL');
//  } 
  if(url === '/api/posts'){
    action = getPosts();
  }else if(url.include('/api/post/')){
    const postId = url.replace('/api/post/', ''); // postId 추출
    action = getPost(postId);
  }
  
  // else if(url.include('/api/comments')){
  //   action = getComments()
  // }else if(url.include('/api/comments')){
  //   action = getReplies()
  // }
  // 보통 댓글과 대댓글은 백엔드에 api를 따로 요청하는지 궁금함.

  return new Promise((resolve, reject) => {
    try {
      action()
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const post = async (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const put = async (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const del = async (url, config = {}) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};