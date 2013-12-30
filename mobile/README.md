##我理想状态下的mobile项目架构##

此项目用于3G wifi 2.7G网络状态下的触屏版开发，从高配开始，最大的本地化体验。

底层代码结构组织：nameSpace module 

中间UI层结构组织：zepto ES5  template touch animate

上层业务逻辑结构组织：REQUSET config  ->  module 

###技术选型###
 
底层代码结构，除了nameSpace的方式，我使用requirejs来进行module化开发，对requset的部分由config配置文件的方式去一一配置，这是业务逻辑层的组织方式。往上，它是构建在修改兼容版的zepto上，其中本地存储，postMessage跨域通信，cookie，URL解析等皆基于zepto插件的形式进行了封装处理，大部分的工具函数，皆使用ES5 API进行处理。

touch模块，mvp，皆改自github上很优秀的开源框架，以zepto插件的形式重新封装，动画模块，使用了jsmorph与css3动画，并且利用多线程去对动画逻辑计算进行处理。

服务端的技术选型使用了restful架构，既面向服务开发的方式，于是需要在前端使用cookie，本地存储进行状态管理，小额数据，使用URL DATA的方式进行处理，中等规模的数据使用localStorage来进行存储，在状态改变时删除或变更。大规模的数据，使用了本地数据库进行处理，于在线状态下提交服务器。cookie的处理是用于对用户登陆状态的管理，而本地session机制则是对钱包，交易所的状态管理，需要它与服务器通信，构建一个简单的token。

敏感数据的交互，使用伪数字证书的方式对敏感数据加密。用户登陆时，从服务器请求下来公共密钥，初始化量，公共唯一标识。在前端使用公共密钥初始化量进行AES算法加密，开启HTTPS数字证书，在提交的中，把密文与公共唯一标识发送给服务器，由服务器进行解密。并由服务器动态生成数字证书，时间，设备，响应给前端，前端使用数字证书，进行其他操作。

页面模型开发的方式，类似于SPA应用，使用URL的解析来呈现其他页面。

编译打包方式，对于使用requirejs来开发的module，用r.js来进行统一打包。其他文件，使用grunt进行打包发布。

###使用技术###

require.js -> zepto{依赖zepto开发的大量插件} -> ES5  ->template

<a href="https://github.com/UnableToParse/Draenor">配套项目库模块</a>

### mobile技术资料 ###

<a href="http://www.requirejs.org/">http://www.requirejs.org/</a>

<a href="http://zeptojs.com/">http://zeptojs.com/</a>

<a href="https://github.com/EightMedia/hammer.js">https://github.com/EightMedia/hammer.js</a>

<a href="https://code.google.com/p/crypto-js/">https://code.google.com/p/crypto-js/</a>

<a href="https://github.com/aui/artTemplate">https://github.com/aui/artTemplate</a>

<a href="https://github.com/jrburke/r.js">https://github.com/jrburke/r.js</a>

<a href="http://www.jsmorph.com/documentation.html">jsmorph</a>

<a href="https://moot.it/riotjs/">https://moot.it/riotjs/</a>

<a href="https://github.com/AlloyTeam/Mars">https://github.com/AlloyTeam/Mars</a>

<a href="https://github.com/jtyjty99999/mobileTech">https://github.com/jtyjty99999/mobileTech</a>

<a href="http://caniuse.com/">http://caniuse.com/</a>

<a href="http://stackoverflow.com/">http://stackoverflow.com/</a>

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects">ES5</a>

<a href="https://www.ibm.com/developerworks/cn/">HTML5应用资料</a>

<a href="http://jinlong.github.io/blog/2013/09/23/safari-ios7-html5-problems-apis-review/">ios7 safari变化</a>