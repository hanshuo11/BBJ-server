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

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '交易管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/indent', component: Indent, name: '已售订单' },
            // { path: '/main', component: Main, name: '已售订单' },
            { path: '/returnIndent', component: ReturnIndent, name: '退货订单' }
            // { path: '/form', component: Form, name: '评价' }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店铺设置',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/addGoods', component: AddGoods, name: '添加商品' },
            { path: '/storeSet', component: StoreSet, name: '店铺编辑' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/goodsEdit', component: GoodsEdit, name: '商品编辑' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '销售统计',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '销售额统计' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;