import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import ReturnIndent from './views/nav1/ReturnIndent.vue'
import Form from './views/nav1/Form.vue'
import Indent from './views/nav1/indent.vue'
import AddGoods from './views/nav2/AddGoods.vue'
import StoreSet from './views/nav2/StoreSet.vue'
import GoodsEdit from './views/nav3/GoodsEdit.vue'
import echarts from './views/charts/echarts.vue'
import storeCheck from './views/admin/storeCheck.vue'


// // 基础路由
let routes = [
    {
        path: '/login',
        component: Login,
        name: ''
    },
    {
        path: '/register',
        component: Register,
        name: ''
    },
    {
        path: '/404',
        component: NotFound,
        name: ''
    },
    //{ path: '/main', component: Main },
    {
        path: '*',
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '交易管理',
        state:"user",
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/indent', component: require('./views/nav1/indent.vue'), name: '已售订单' },
            // { path: '/main', component: Main, name: '已售订单' },
            { path: '/returnIndent', component: require('./views/nav1/ReturnIndent.vue'), name: '退货订单' }
            // { path: '/form', component: Form, name: '评价' }
        ]
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '店铺设置',
        state:"user",
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/addGoods', component: require('./views/nav2/AddGoods.vue'), name: '添加商品' },
            { path: '/storeSet', component: require('./views/nav2/StoreSet.vue'), name: '店铺编辑' }
        ]
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '',
        state:"user",
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/goodsEdit', component: require('./views/nav3/GoodsEdit.vue'), name: '商品编辑' }
        ]
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '销售统计',
        state:"user",
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: require('./views/charts/echarts.vue'), name: '销售额统计' }
        ]
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '',
        state:"admin",
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/storeCheck', component: storeCheck, name: '店铺审核' }
        ]
    },
    {
        path: '/',
        component: require('./views/Home.vue'),
        name: '销售统计',
        state:"admin",
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: require('./views/charts/echarts.vue'), name: '销售额统计' }
        ]
    }
];

let data = { "routes": routes }

export default data;