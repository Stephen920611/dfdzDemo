/**
 * @description
 * @Version Created by stephen on 2019/5/13.
 * @Author stephen
 * @license dongfangdianzi
 */

window.ENV = (function () {
    let rootPath = '/pw/';     // 路由的根路径
    // let apiDomain = 'http://172.20.41.137:9012';    // api请求接口
    let apiDomain = 'http://172.20.41.137:9094';    // api请求接口

    return {
        apiDomain: apiDomain,         // api请求接口   测试服务器
        rootPath: rootPath,                       	// 路由的根路径
        apiSuccessCode: 0,                          // API接口响应成功的code

        login: {
            errorCode: 900,                                 // 未登录的error code
            isCheckLogin: false,                            // web端是否验证登录
            cookieKey: '__login_solution_user_info__',               // 登录成功的cookie key, 用于验证当前页面是否登录
            defaultRedirectUrl: rootPath + 'overview/list',  // 登录成功默认重定向的url
            loginUrl: rootPath + 'login',                   // 登录页面url

            // 不需要验证是否登录的路由配置
            noCheckIsLoginRoutes: [
                rootPath + 'login',
            ],
        },

        logoTitle: 'reactDemo',                // logo标题文字
        visualScreen: { // 可视化大屏配置
            coverBasePath: apiDomain + '/upload/screen/cover',  // 大屏封面的webPath
            showBigScreen: '/static/big_screen/index.production.html',     // 查看大屏的地址
            editBigScreen: '/static/big_screen/editor.production.html',    // 编辑大屏地址
        },

        mock: {
            apiDomain: 'http://localhost:8180',     // mockApi请求接口
            isStart: false,                         // 是否开启mock
        },
        isShowLogoIcon: false,                      // 是否显示logo图标
        isShowLoginCopy: false,
    };
})();
