import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "./url_helper"
import { addComment, addPost, addReply, deleteComment, deletePost, deleteReply, getPost, getPosts, updateComment, updatePost, updateReply } from './local_storage_helper'



const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)

  mock.onGet('/api/posts').reply(() => {
    console.log(222)

    return new Promise((resolve, reject) => {
      try{
        const data = getPosts()
          resolve([200, data])
      }catch{
        reject([400, "Cannot get data"])
      }
       
    })
  })

  mock.onGet(url.GET_POST).reply(id => {
    return new Promise((resolve, reject) => {
        const data = getPost(id)
        if (data) {
          resolve([200, data])
        } else {
          reject([400, "Cannot get data"])
        }
    })
  })

  mock.onPost(url.ADD_POST).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        addPost(params.title, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_POST).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        updatePost(params.postId, params.title, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_POST).reply(postId => {
    return new Promise((resolve, reject) => {
      try{
        deletePost(postId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  // mock.onGet(url.GET_COMMENTS).reply(params => {
  //   return new Promise((resolve, reject) => {
  //     try{
  //       getComment(params.comment, params.replyId) 
  //       resolve([200, 'success!'])
  //     }catch{
  //       reject([400, "failed.."])
  //     }
  //   })
  // })

  mock.onPost(url.ADD_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        addComment(params.post, params.comment) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        updateComment(params.postId, params.commentId, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        deleteComment(params.postId, params.commentId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })


  // mock.onGet(url.GET_REPLIES).reply(params => {
  //   return new Promise((resolve, reject) => {
  //     try{
  //       deleteReply(params.comment, params.replyId) 
  //       resolve([200, 'success!'])
  //     }catch{
  //       reject([400, "failed.."])
  //     }
  //   })
  // })

  mock.onPost(url.ADD_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        addReply(params.comment, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        updateReply(params.comment, params.replyId, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        deleteReply(params.comment, params.replyId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

}

export default fakeBackend
