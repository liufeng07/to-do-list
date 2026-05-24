const baseURL = import.meta.env.VITE_API_BASE_URL

// 这里用 Promise 模拟 fetch 请求，重点演示“请求拦截”和“响应拦截”。
function mockFetch(config) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (config.mockStatus === 401) {
        reject({
          code: 401,
          message: 'access_token 已过期',
        })
        return
      }

      resolve({
        code: 200,
        message: '请求成功',
        data: {
          url: config.url,
          token: config.token,
        },
      })
    }, 500)
  })
}

export function request(url, options) {
  const config = {
    url: baseURL + url,
    token: options.token,
    mockStatus: options.mockStatus,
  }

  // 请求拦截：真实项目一般在这里统一添加 token。
  console.log('[请求拦截]', config)

  return mockFetch(config)
    .then(function (res) {
      // 响应拦截：真实项目一般在这里统一处理成功结果。
      console.log('[响应拦截成功]', res)
      return res
    })
    .catch(function (error) {
      // 响应拦截：真实项目一般在这里统一处理错误。
      console.log('[响应拦截失败]', error)
      return Promise.reject(error)
    })
}
