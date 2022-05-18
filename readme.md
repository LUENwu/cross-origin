#  同源策略
* 源
1. 在控制台输入window.origin或location.origin 可以得到当前的源
2. 源= 协议 + 域名 + 端口号

* 如何分别两个url是同源的
1. 协议,域名,端口号 完全一致的两个url即为同源

* 举例
1. https://qq.com 、https://www.qq.com 不同源 
2. https://baidu.com、www.baidu.com 不同源
3. 完全一致才算同源 

## 1. 那同源策略是什么呢?
1. 如果JS运行在源A里,只能获取源A的数据.不能获取源B得数据,即不允许跨域
2. 不允许跨域是浏览器自身的功能
3. 不同源的页面之间,不允许互相访问数据

* 同源策略的目的作用是什么?
1. 保护用户隐私
2. 问题的根源在于浏览器无法区分发送者:页面里面的JS与黑客页面里JS发出几乎毫无区别
3. 若后台开发者没有检查referrer,任何页面都能偷取用户的数据
4. 所以浏览器得主动预防这种行为,伪类用户的隐私,设置了严格的同源策略

* 为什么可以跨域使用CSS、JS和图片等?
* 答:同源策略限制的是数据访问,引用CSS与JS和图片时,并不知道其中的内容,我们只是在引用. 

## 2.请问如何跨域,浏览器默认不同源之间不能互相访问数据,但2个不同域名网站都是我方网站,如何解决? 

> 解决方法1:CORS
* 什么情况下需要 CORS ？ (cross-origin sharing standard)
* Access-Control-Allow-Origin:http://qq.com:8888
```
response.setHeader('Access-Control-Allow-Origin','http://frank.com:8889')
```
* 详情可查看[文档链接](https://developer.mozilla.org/zh-CN/docs/web/http/cors#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E9%9C%80%E8%A6%81_cors_%EF%BC%9F)

> 解决方法2 : JSONP
*  如果要兼容IE 6 7 8 9 该如何处理?
1. 没有CORS,不能访问别的源,无法读取数据.但是能引JS,让JS包含数据包
2. 直接请求JS,把JSON的数据替换掉friends.js中的占位符,以此跳过CORS获得数据
3. 监听script.onload 获得数据
```
else if(path ==='/friends.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    const string =fs.readFileSync(`./public/friends.js`).toString()
    const data = fs.readFileSync(`./public/friends.json`).toString()
    const string2 = string.replace('{data}',data)
    response.write(string2)
    response.end()
```
* frank.com访问qq.com
1. qq.com把数据写入/friends.js
2. frank.com使用script标签引用/friends.js
3. /friends.js执行预先定义好的window.xxx函数
4. 为防止数据泄漏需要在后台设置 路由 request.headers["referer"].indexOf(' 协议域名端口号 ')===0)
5. 使用随机数代表函数名,执行script后删除
```
const random = Math.random()
window[random] = (data)=>{
  console.log(data)
}
const script= document.createElement('script')
script.src=`http://qq.com:8888/friends.js?callBack=${random}`
script.onload=()=>{
  script.remove()
}
document.body.appendChild(script)
```
6. 封装JSONP
```
function jsonp(url){
  return new Promise((resolve,reject)=>{
    const random = Math.random()
    window[random] = (data )=>{
     resolve(data);
    }
    const script= document.createElement('script')
    script.src=`${url}?callBack=${random}`
    script.onload=()=>{
    script.remove()
    }
    document.body.appendChild(script)
   
  })
}
jsonp('http://qq.com:8888/friends.js').then((data)=>{
  console.log(data)
})
```

## promise 的基本用法
（1）使用new实例化一个Promise对象，Promise的构造函数中传递一个参数。这个参数是一个函数，该函数用于处理异步任务。

（2）并且传入两个参数：resolve和reject，分别表示异步执行成功后的回调函数和异步执行失败后的回调函数；

（3）通过 promise.then() 处理返回结果。这里的 p 指的是 Promise实例  
[闲情链接]https://www.cnblogs.com/qianguyihao/p/12660393.html