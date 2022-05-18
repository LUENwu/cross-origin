

console.log('欢迎来到盗版QQ空间')
// const request =new XMLHttpRequest();
// request.open('GET','http://qq.com:8888/friends.json')
// request.onreadystatechange=()=>{
//   if(request.readyState===4 && request.status===200){
//     console.log(request.response)
//   }
// }
// request.send()




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
jsonp('http://localhost:8888/friends.js').then((data)=>{
  console.log(data)
})