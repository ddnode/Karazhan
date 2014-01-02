##HTTP restful ##

<a href="http://wenren.ddnode.com/node_restful_demo.html">在线例子</a>

处理get,post请求，建立静态文件服务器，动态读取数据库数据，插入数据。

get：对应读取

post：对应插入

####解决思路####

这里会使用三个模块，分别为http，url，mysql。

静态文件服务器，通过识别url来分别读取文件，输出。

在识别是否为ajax请求时，通过request.headers['x-requested-with']来进行识别。get请求处理，则使用request.url request.method来识别，可以通过url.parse()来解析url，分别获取get请求地址，get请求参数，来做其他处理。而post请求，则是通过监听data,end事件来处理。nodejs在处理post请求时会把参数数据分割成N个小数据片段，所以需要拼接成真实的数据，在end数据接收完成事件中进行下一步的处理。