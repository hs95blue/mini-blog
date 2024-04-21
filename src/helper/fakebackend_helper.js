import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// get Posts
export const getPosts = () => get(url.GET_POSTS)

// get Posts
export const getPost =  id => get(`${url.GET_POST}/${id}`)

// add Post
export const postPost = data => post(url.ADD_POST,data)

// update Post
export const putPost = params => put(url.UPDATE_POST, params)

// delete Post
export const delPost = id => del(url.DELETE_POST, id)

// get Comments
export const getComments = () => get(url.GET_COMMENTS)

// get Comment
export const getComment = () => get(url.GET_COMMENT)

// add Comment
export const postComment = comment => post(url.ADD_COMMENT,comment)

// update Comment
export const putComment = params => put(url.UPDATE_COMMENT, params)

// delete Comment
export const delComment = params => del(url.DELETE_COMMENT, params)

// get Posts
export const getReplies = () => get(url.GET_REPLIES)

// get Posts
export const getReply = id => get(url.GET_REPLY, id)

// add Reply
export const postReply = reply => post(url.ADD_REPLY,reply)

// update Reply
export const putReply = params => put(url.UPDATE_REPLY, params)

// delete Reply
export const delReply = params => del(url.DELETE_REPLY, params)
