var fs = require('fs');
module.exports = function(grunt){
    var pkg = grunt.file.readJSON('package.json');
    //grunt插件，对项目分配运行命令，将进行代码检测，文件合并，文件压缩，单元测试等服务。
    grunt.initConfig({
        pkg:pkg,
        banner:'/*\n'+
            '*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>\n'+
            '*  Author <%=pkg.author%>\n'+
            '*/\n',
        jshint:{  //代码检查
            yanex:{    //分配项目运行命令 
                files:[
                    {
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>',
                        src: ['./*.js']
                    }
                ],
                options:{

                } 
            }
        },
        concat:{  //文件合并
            yanex:{      //分配项目运行命令 
                options:{
                    banner:'<%=banner%>'
                },
                files:[

                ]
            }
        },
        uglify:{  //文件压缩
            yanex:{        //分配项目运行命令 
                options:{
                    banner:'<%=banner%>'
                },
                files:[
                    {
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>',
                        src: ['./*.js'],
                        dest: '<%=pkg.address.yanex%>resources/',                         
                        ext: '.min.js',
                    },
                    {
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>concat/',
                        src: ['./*.js'],
                        dest: '<%=pkg.address.yanex%>resources/',                         
                        ext: '.min.js', 
                    }
                ]
            },
            library:{
                options:{
                    banner:'<%=banner%>'
                },
                files:[
                    {
                        expand: true,
                        cwd: 'libs/',
                        src: ['./*.js'],
                        dest: 'libs/resources/',                         
                        ext: '.min.js',
                    }
                ]
            },
            purse:{
                options:{
                    banner:'<%=banner%>'
                },
                files:[
                    {
                        expand:true,
                        cwd:'<%=pkg.address.purse%>',
                        src:['./*.js'],
                        dest:'<%=pkg.address.purse%>resources/',
                        ext:'.min.js'
                    }
                ]
            }
        }
    });
    //定制task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //分配命令执行
    grunt.registerTask('yanex',['concat:yanex','uglify:yanex']);
    grunt.registerTask('libs',['uglify:library']);
    grunt.registerTask('js',['jshint:yanex']);
    //分配默认任务，检查前端系统文件。
    grunt.registerTask('default',function() {
        var regx = /(\.min)+\.js/,entire = [],e = 0;
        for(var f in pkg.address){  //从package.json中find项目地址
            var value = pkg.address[f],dir = fs.readdirSync(value);
            entire.push({
                "project":f,"resources":[],"systeminfo":[]
            });
            for(var i = 0,len = dir.length;i<len;i++){ //循环目录结构，存储.js文件
                var _dir = dir[i],stat = fs.lstatSync(value + _dir); //判断是否为文件
                if(!stat.isDirectory()){
                    if(!regx.test(_dir)){  //过滤*min.js文件
                        entire[e].resources.push(value + _dir);
                    }
                }
            }
            e++; 
        }
        // console.log(entire);
        var extractinfo = function(){
            for(var i = 0,len = entire.length;i<len;i++){
                var resources = entire[i].resources;
                var systeminfo = entire[i].systeminfo;
                for(var k = 0,le = resources.length;k<le;k++){  //循环真实的.js文件，准备检查文件内容
                    // console.log(resources[k]);
                    var info = fs.statSync(resources[k]);  //文件流信息
                    var cont = grunt.file.read(resources[k]); //读取文件
                    var index = cont.split('\n'); //统计行数
                    var first = JSON.parse(index[0].replace('//',"")); //提取头信息
                    systeminfo.push({  //将头信息,js文件，行数进行存储
                        "name":first.name,
                        "fs":resources[k],
                        "len":index.length,
                        "author":first.author
                    });
                }
            }
            // console.log(entire);
        }
        extractinfo();
        var resolveflow = function(){
            var agoname,agofs,index = 0,reconstruction = [],x = 0;
            //根据不同的项目，分析entire中systeminfo字段的数据，进行依次归类。
            for(var i = 0,len = entire.length;i<len;i++){
                var info = entire[i].systeminfo;
                reconstruction.push({"project":entire[i].project,"info":[]});
                for(var g = 0,le = info.length; g <le; g++){
                    // console.log(info[g].name);
                    if(index === 0){
                        agoname = info[g].name;
                        agofs = info[g];
                        reconstruction[x].info.push({
                            "name":agoname,
                            "fs":[agofs.fs],
                            "len":[agofs.len],
                            "author":[agofs.author]
                        });
                        index++;
                        // console.log(reconstruction);
                        continue;
                    }
                    // console.log(agoname === entire[g].name);
                    if(agoname === info[g].name){
                        for(var r = 0,ug = reconstruction[x].info.length;r < ug;r++){
                            if(reconstruction[x].info[r].name === agoname){
                                var agojson = reconstruction[x].info[r].fs;
                                var agolength = reconstruction[x].info[r].len;
                                var agothor = reconstruction[x].info[r].author;
                                break;
                            }
                        }
                        agojson.push(info[g].fs);
                        agolength.push(info[g].len);
                        agothor.push(info[g].author);
                        agoname = info[g].name;
                    }else{
                        reconstruction[x].info.push({
                            "name":info[g].name,
                            "fs":[info[g].fs],
                            "len":[info[g].len],
                            "author":[info[g].author]
                        });
                        agoname = info[g].name;
                    }
                }
                x++;
            }
            return reconstruction;
        }
        var reconstruction = resolveflow();
        // console.log(reconstruction);
        //执行规则
        var myrule = function(){
            var partition = 2000,str = '';
            str += grunt.template.today("isoDateTime") + '\n';
            for(var i = 0,len = reconstruction.length;i<len;i++){
                var project = reconstruction[i].project;
                str += 'Project name：' + project + '\n';
                var info = reconstruction[i].info;
                for(var k = 0,fo = info.length;k<fo;k++){
                    str += 'Resources file name：'+ info[k].name + '\n';
                    var fileLength = info[k].len;
                    var fileName = info[k].fs;
                    var fileAuthor = info[k].author;
                    for(var j = 0,le = fileLength.length;j<le;j++){
                        if(fileName.length < 2){
                            var _in = '[-----资源分析建议-----分拆模块]  file：' + fileName[j] + '  rows：' + fileLength[j] + '行'+'  author：'+ fileAuthor[j];
                            fileLength[j] > partition ? str += _in + '\n' : str += 'The resources file only one \n';
                            continue;
                        }
                        str += rule(fileName[j],fileLength[j],fileAuthor[j]) + '\n';
                    }
                }
            }
            grunt.file.write('log/log.txt',str,'utf-8');
            grunt.log.writeln(str);
        }
        //定义规则
        var rule = function(name,len,author){
            var merger = 500,partition = 2000;
            if(len < merger){
                var m = '[-----资源分析建议-----合并文件]  file：' + name + '  rows：' + len + '行'+'  author：'+ author;
                return m;
            }
            if(len > partition){
                var p = '[-----资源分析建议-----分拆模块]  file：' + name + '  rows：' + len + '行'+'  author：'+ author;
                return p;
            }
        }
        //执行规则
        myrule();
        grunt.log.writeln('run default true');
    });
}