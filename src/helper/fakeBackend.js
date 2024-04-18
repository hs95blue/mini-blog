import MockAdapter from "axios-mock-adapter"
import * as url from "./url_helper"
import { addComment, addPost, addReply, deleteComment, deletePost, deleteReply, getPost, getPosts, updateComment, updatePost, updateReply } from './local_storage_helper'
import { axiosApi } from './api_helper'



const fakeBackend = () => {

  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosApi)

  mock.onGet('/api/posts').reply(() => {
    return new Promise((resolve, reject) => {
      try{
        const data = getPosts()
          resolve([200, data])
      }catch{
        reject([400, "Cannot get data"])
      }
       
    })
  })

  mock.onGet(new RegExp(`${url.GET_POST}/?(.*)`)).reply((config) => {
    return new Promise((resolve, reject) => {
        const id = config.url.split('/')[3]
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
        let data = JSON.parse(params.data)
        addPost(data.title, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_POST).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        updatePost(data.postId, data.title, data.content) 
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
  //       getComment(data.comment, data.replyId) 
  //       resolve([200, 'success!'])
  //     }catch{
  //       reject([400, "failed.."])
  //     }
  //   })
  // })

  mock.onPost(url.ADD_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        addComment(data.post, data.comment) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      
      try{
        let data = JSON.parse(params.data)
        updateComment(data.postId, data.commentId, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_COMMENT).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        deleteComment(data.postId, data.commentId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })


  // mock.onGet(url.GET_REPLIES).reply(params => {
  //   return new Promise((resolve, reject) => {
  //     try{
  //       deleteReply(data.comment, data.replyId) 
  //       resolve([200, 'success!'])
  //     }catch{
  //       reject([400, "failed.."])
  //     }
  //   })
  // })

  mock.onPost(url.ADD_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        addReply(data.comment, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        updateReply(data.comment, data.replyId, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(params.data)
        deleteReply(data.comment, data.replyId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

}

export default fakeBackend
