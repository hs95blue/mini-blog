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
        console.log(data)
        if (data) {
          resolve([200, data])
        } else {
          reject([400, "Cannot get data"])
        }
    })
  })

  mock.onPost(url.ADD_POST).reply(config => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(config.data)
        addPost(data.title, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_POST).reply(config => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(config.data)
        updatePost(data.postId, data.title, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_POST).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        deletePost(params.postId) 
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

  mock.onPost(url.ADD_COMMENT).reply( config => {
    return new Promise((resolve, reject) => {
      try{
        const params = JSON.parse(config.data)
        addComment(params.postId, params.comment) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_COMMENT).reply(config => {
    return new Promise((resolve, reject) => {
      try{
        let data = JSON.parse(config.data)

        updateComment(data.postId, data.commentId, data.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_COMMENT).reply(data => {
    return new Promise((resolve, reject) => {
      try{
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

  mock.onPost(url.ADD_REPLY).reply(config => {
    return new Promise((resolve, reject) => {
      try{
        const params = JSON.parse(config.data)
        addReply(params.commentId, params.reply) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onPut(url.UPDATE_REPLY).reply(config => {
    return new Promise((resolve, reject) => {
      try{
        const params = JSON.parse(config.data)
        updateReply(params.commentId, params.replyId, params.content) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

  mock.onDelete(url.DELETE_REPLY).reply(params => {
    return new Promise((resolve, reject) => {
      try{
        deleteReply(params.commentId, params.replyId) 
        resolve([200, 'success!'])
      }catch{
        reject([400, "failed.."])
      }
    })
  })

}

export default fakeBackend
