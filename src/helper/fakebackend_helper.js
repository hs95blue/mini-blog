import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// get Posts
export const getPosts = () => get(url.GET_POSTS)

// add Post
export const addPost = post => post(url.ADD_POST,post)

// update Post
export const updatePost = id => put(url.UPDATE_POST, id)

// delete Post
export const deletePost = id => del(url.DELETE_POST)
