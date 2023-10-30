const { description } = require('../../package')

module.exports = {
  base: '/summary-pages/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'LearnEveryDay',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "xxxxx",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/me',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: "github",
        link: "https://gitee.com/lwq1229/summary"
      },
    ],
      sidebar: [
        {
          title: "JS",
          path: '/JS/apply-call',
          collapsable: true,
          children: [
            { title: 'apply-call', path: '/JS/apply-call' },
            { title: 'compose', path: '/JS/compose' },
            { title: 'Document文档&坐标', path: '/JS/Document文档&坐标', collapsable: true, },
            { title: 'DOM', path: '/JS/DOM' },
            { title: 'DOM树', path: '/JS/DOM树' },
            { title: 'JS数组的reduce方法', path: '/JS/JS数组的reduce方法' },
            { title: 'setState异步问题', path: '/JS/setState异步问题' },
            { title: 'setState的异步', path: '/JS/setState的异步' },
            { title: 'this指向问题', path: '/JS/this指向问题' },
            { title: '原型链', path: '/JS/原型链' },
            { title: '周总结之Promise', path: '/JS/周总结之Promise' },
            { title: '对象基础', path: '/JS/对象基础' },
            { title: '对象引用和复制', path: '/JS/对象引用和复制' },
            { title: '对象的引用和克隆', path: '/JS/对象的引用和克隆' },
            { title: '数组拍平', path: '/JS/数组拍平' },
            { title: '浏览器环境', path: '/JS/浏览器环境' },
            { title: '现代JS之对象', path: '/JS/现代JS之对象' },
            { title: '现代JS之样式和类', path: '/JS/现代JS之样式和类' },
            { title: '防抖节流', path: '/JS/防抖节流' },
            { title: '鼠标事件', path: '/JS/鼠标事件' }
          ]
        },
        {
          title: "React",
          path: '/React/React',
          collapsable: true,
          children: [
            { title: 'React', path: '/React/React' },
            { title: '井字棋', path: '/React/chess' },
            { title: 'Hooks', path: '/React/Hooks' },
            { title: 'childrenprops', path: '/React/childrenprops' },
            { title: 'renderProps', path: '/React/renderProps' },
            { title: '表格行增删', path: '/React/表格行增删' },
            {
              title: 'Ref与受控',
              path: '/React/Ref与受控/Ref',
              collapsable: true,
              children:[
                { title: 'HOC&RP', path: '/React/Ref与受控/HOC&RP' },
                { title: 'Ref', path: '/React/Ref与受控/Ref' },
                { title: 'Ref与非受控', path: '/React/Ref与受控/Ref与非受控' },
                { title: 'Ref转发', path: '/React/Ref与受控/ref转发' },
              ]
            }
          ]
        },
        {
          title: 'BOM',
          path: '/BOM/BOM',
          collapsable: true
        },
        {
          title: 'CSS',
          path: '/css/CSS',
          collapsable: true,
          children: [
            { title: '现代Web布局', path: '/css/现代Web布局' },
            { title: 'antd样式覆盖', path: '/css/antd样式覆盖' },
            { title: 'BFC', path: '/css/BFC' },
            { title: 'CSS', path: '/css/CSS' },
            { title: 'CSS过渡', path: '/css/CSS过渡' },
            { title: 'overflow的一个问题', path: '/css/overflow的一个问题' },
            { title: 'sticky定位', path: '/css/sticky定位' },
            { title: '清除浮动', path: '/css/清除浮动' },
            { title: '盒模型', path: '/css/盒模型' }
          ]
        },
        {
          title: "HTML",
          path: '/HTML/HTML'
        },
        {
          title: "浏览器标签页间通信",
          path: '/trick/浏览器标签页间通信'
        },
        {
          title: "实用方法",
          path: '/实用方法/数组转树形'
        },
        {
          title: "布局",
          path: '/布局/flex布局'
        },
        {
          title: "组件库",
          path: '/组件库/antd',
          collapsable: true,
          children: [
            { title: 'AntdTree学习', path: '/组件库/AntdTree学习' },
            { title: 'antd', path: '/组件库/antd' },
            { title: 'SelectAndInput', path: '/组件库/SelectAndInput' },
            { title: 'ToolTip随鼠标移动', path: '/组件库/ToolTip随鼠标移动' },
            { title: '影像资料', path: '/组件库/影像资料' },
            { title: '搜索树', path: '/组件库/搜索树' },
            { title: '标准表格', path: '/组件库/标准表格' },
            {
              title: '获取TreeSelect在Select获取节点信息',
              path: '/组件库/获取TreeSelect在Select获取节点信息'
            },
            { title: '页面级', path: '/组件库/页面级' }
          ]
        },
        {
          title: '日常总结',
          path: '/日常总结/apply和call',
          collapsable: true,
          children: [
            { title: 'apply和call', path: '/日常总结/apply和call' },
            {
              title: 'componentDidUpdate和对象引用问题',
              path: '/日常总结/componentDidUpdate和对象引用问题'
            },
            { title: 'compose', path: '/日常总结/compose' },
            { title: 'CopyAsFetch', path: '/日常总结/CopyAsFetch' },
            { title: 'Git仓库迁移', path: '/日常总结/Git仓库迁移' },
            { title: 'JS数组的reduce方法', path: '/日常总结/JS数组的reduce方法' },
            { title: 'md5计算checkSum', path: '/日常总结/md5计算checkSum' },
            { title: 'Nginx(含正则)', path: '/日常总结/Nginx(含正则)' },
            { title: 'Node', path: '/日常总结/Node' },
            { title: 'React的ref', path: '/日常总结/React的ref' },
            { title: '关于上传jar的总结', path: '/日常总结/关于上传jar的总结' },
            { title: '周总结之', path: '/日常总结/周总结之' },
            { title: '周总结之moment', path: '/日常总结/周总结之moment' },
            { title: '周总结之this', path: '/日常总结/周总结之this' },
            { title: '周总结之深浅拷贝', path: '/日常总结/周总结之深浅拷贝' },
            { title: '定时器', path: '/日常总结/定时器' },
            { title: '微应用拆分部署', path: '/日常总结/微应用拆分部署' },
            { title: '必填校验', path: '/日常总结/必填校验' },
            { title: '快速了解一个新的前端项目', path: '/日常总结/快速了解一个新的前端项目' },
            { title: '找路由信息的方法', path: '/日常总结/找路由信息的方法' },
            { title: '浏览器页面间通信', path: '/日常总结/浏览器页面间通信' },
            { title: '编码规范', path: '/日常总结/编码规范' },
            { title: '阅React进阶之路总结', path: '/日常总结/阅React进阶之路总结' },
            { title: '陷入的一个思维定势', path: '/日常总结/陷入的一个思维定势' },
            { title: '杂项', path: '/日常总结/杂项' },
          ]
        }
      ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
