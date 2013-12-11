var fs = require('fs');
module.exports = function(grunt){
    var pkg = grunt.file.readJSON('package.json');
    var op = {
        undef: true, // 禁止使用未定义变量
        unused: true, // 禁止定义的变量未使用
        camelcase: true, // 禁止使用未定义变量
        curly: true, // if for 后语句块必须大括号包裹
        maxdepth: 2, // 语句块嵌套层数限制
        maxparams: 3, // 函数最大参数个数限制
        asi: false //  分号缺失检测
    }
    //grunt插件，对项目分配运行命令，将进行代码检测，文件合并，文件压缩，单元测试等服务。
    grunt.initConfig({
        pkg:pkg,
        draenorJS:'/*\n'+
            '*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>\n'+
            '*  Author wenren\n'+
            '*  依赖zepto.js\n'+
            '*/\n',
        libraryJS:'/*\n'+
            '*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>\n'+
            '*  Author <%=pkg.author%>\n'+
            '*/\n',
        libraryCss:'/*\n'+
            '*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>\n'+
            '*  Author wenren\n'+
            '*/\n',
        business:'/*\n'+
            '*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>\n'+
            '*  Author m.wanyan.com\n'+
            '*/\n',
        jshint:{  //代码检查
            library:{    //分配项目运行命令 
                files:[
                    {
                        expand: true,
                        cwd: '<%=pkg.address.libs%>rainbow/',
                        src: ['./*.js']
                    }
                ],
                options:op
            }
        },
        concat:{  //文件合并
            librarycss:{
                options:{
                    banner:'<%=libraryCss%>'
                },
                files:[
                    {
                        src: ['css/reset.css','css/draenor.css'],
                        dest: 'css/concat/draenor.css',
                    }
                ]
            },
            draenor:{
                options:{
                    banner:'<%=draenorJS%>'
                },
                files:[
                    {
                        src:['libs/draenor/build/*.js'],
                        dest:'libs/build/draenor.min.js'
                    }
                ]
            }
        },
        uglify:{  //文件压缩
            libraryjs:{
                options:{
                    banner:'<%=libraryJS%>'
                },
                files:[
                    {
                        expand: true,
                        cwd: 'libs/',
                        src: ['./*.js'],
                        dest: 'libs/build/',                         
                        ext: '.min.js',
                    }
                ]
            },
            draenor:{
                files:[
                    {
                        expand:true,
                        cwd:'libs/draenor/',
                        src:['./*.js'],
                        dest:'libs/draenor/build/',
                        ext:'.min.js'
                    }
                ]
            }
        },
        cssmin:{
            librarycss:{
                options:{
                    banner:'<%=libraryCss%>'
                },
                files:[
                    {
                        expand:true,
                        cwd:'css/concat/',
                        src:['./*.css'],
                        dest:'css/build/',
                        ext:'.min.css'
                    }
                ]
            },
            wanyan:{
                options:{
                    banner:'<%=business%>'
                },
                files:[
                    {
                        expand:true,
                        cwd:'<%=pkg.address.wanyan%>',
                        src:['./*.css'],
                        dest:'<%=pkg.address.wanyan%>build/',
                        ext:'.min.css'
                    }
                ]
            }
        }
    });
    //定制task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //库文件libs分配命令执行
    grunt.registerTask('pu_css',['concat:librarycss','cssmin:librarycss']);
    grunt.registerTask('pu_dra',['uglify:draenor','concat:draenor']);
    grunt.registerTask('pu_js',['uglify:libraryjs']);
    
}