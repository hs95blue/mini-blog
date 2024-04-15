import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "../url_helper"
import { getPost, getPosts } from './local_storage_helper'



const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)

  mock.onGet(url.GET_POSTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getPosts()
        if (data) {
          resolve([200, data])
        } else {
          reject([400, "Cannot get data"])
        }
      })
    })
  })

  mock.onGet(url.GET_POST).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getPost(event.target.value)
        if (data) {
          resolve([200, data])
        } else {
          reject([400, "Cannot get data"])
        }
      })
    })
  })

  mock.onPost(url.ADD_POST).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          resolve([200, event.data])
        } else {
          reject([400, "Cannot add event"])
        }
      })
    })
  })

  mock.onPut(url.UPDATE_POST).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot update event"])
        }
      })
    })
  })

  mock.onDelete(url.DELETE_POST).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event])
        } else {
          reject([400, "Cannot delete event"])
        }
      })
    })
  })

  mock.onGet(url.GET_COMMENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          resolve([200, events])
        } else {
          reject([400, "Cannot get events"])
        }
      })
    })
  })

  mock.onPost(url.ADD_COMMENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot add event"])
        }
      })
    })
  })

  mock.onPut(url.UPDATE_COMMENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot update event"])
        }
      })
    })
  })

  mock.onDelete(url.DELETE_COMMENT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event])
        } else {
          reject([400, "Cannot delete event"])
        }
      })
    })
  })


  mock.onGet(url.GET_REPLIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          resolve([200, events])
        } else {
          reject([400, "Cannot get events"])
        }
      })
    })
  })

  mock.onPost(url.ADD_REPLY).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot add event"])
        }
      })
    })
  })

  mock.onPut(url.UPDATE_REPLY).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot update event"])
        }
      })
    })
  })

  mock.onDelete(url.DELETE_REPLY).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event])
        } else {
          reject([400, "Cannot delete event"])
        }
      })
    })
  })

}

export default fakeBackend
