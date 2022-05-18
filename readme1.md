# 步骤
* 创建目录 
1. qq.com里有一个server.js,用来模拟QQ空间
2. frank.com里也有一个server.js,用来模拟钓鱼网站

* qq.com
1. /index.html是首页
2. /qq.js是js脚本文件
3. /friend.json是模拟好友数据

* frank.com
1. /index.html 是钓鱼网站首页
2. /frank.js JS脚本文件


* 修改hosts 设置本地域名映射    
* windows下打开hosts文件
1. 打开windows --> system32 --> drivers --> etc(显示所有)
  
* 在node.js中后台路由中加入 response.setHeader('Access-Control-Allow-Origin','协议+域名+端口号')
