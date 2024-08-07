import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 这里定义非菜单栏的路由
const commonRoutes = [
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  //财务账套管理
  {
    path: '/FinanceAccountBooks',
    component: () => import('@/views/accountBooks/FinanceAccountBooks.vue')
  }
]

/* 这里定义菜单栏的路由 */
export const menuRoutes = [
  // 首页
  // {
  //   path: '/home',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '首页', menu: true, icon: 'el-icon-s-platform'},
  //   children: [
  //     {
  //       // 等价于取父亲的path
  //       path: '',
  //       meta: { title: '首页', menu: true },
  //       component: () => import('@/views/home/Home.vue')
  //     }
  //   ]
  // },

  //凭证管理
  {
    path: '/voucher',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '凭证管理', menu: true, icon: 'el-icon-postcard'},
    children: [
      {
        // 等价于取父亲的path
        path: '/voucher/Voucher',
        component: () => import('@/views/voucher/Voucher'),
        meta: { title: '新增凭证' },
      },
      {
        // 等价于取父亲的path
        path: '/voucher/VoucherTotal',
        component: () => import('@/views/voucher/VoucherTotal'),
        meta: { title: '凭证管理' },
      },
      {
        // 等价于取父亲的path
        path: '/voucher/CheckVoucher',
        component: () => import('@/views/voucher/CheckVoucher'),
        meta: { title: '查看凭证' },
      },

      {
        path: '/voucher/VoucherWord',
        component: () => import('@/views/voucher/VoucherWord'),
        meta: { title: '凭证字' },
      },
      {
        path: '/voucher/Summary',
        component: () => import('@/views/voucher/Summary'),
        meta: { title: '常用摘要' },
      },
      {
        path: '/voucher/AccountingAccount',
        component: () => import('@/views/voucher/AccountingAccount'),
        meta: { title: '会计科目' }
      }

    ]
  },
  //日记账管理
{
  path:'/bookkeeping',
  component: () => import('@/layout/Layout.vue'),
  meta: { title: '日记账管理', menu: true, icon: 'el-icon-tickets' },
  children: [
    {
      path: '/Bookkeeping',
      component: () => import('@/views/bookkeeping/Bookkeeping'),
      meta: { title: '记账列表' },
    },
    {
      path: '/Stats',
      component: () => import('@/views/bookkeeping/Stats'),
      meta: { title: '记账汇总' },
    },
    {
      path: '/SubjectAccount',
      component: () => import('@/views/bookkeeping/SubjectAccount'),
      meta: { title: '账户设置' },
    }
  ]
},
   //系统管理
  //  {
  //   path:'/system',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '系统管理', menu: true, icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: '/System',
  //       component: () => import('@/views/system/System'),
  //       meta: { title: '员工管理' },
  //     },
  //     {
  //       path: '/Role',
  //       component: () => import('@/views/system/Role'),
  //       meta: { title: '角色管理' },
  //     },
  //     {
  //       path: '/LogsUri',
  //       component: () => import('@/views/system/LogsUri'),
  //       meta: { title: '操作日志' },
  //     }
  //   ]
  // },
  // 个人中心
  // {
  //   path: '/personal',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '个人中心', menu: true, icon: 'el-icon-user' },
  //   children: [
  //     {
  //       // 等价于取父亲的path
  //       path: '',
  //       meta: { title: '个人中心', menu: true },
  //       component: () => import('@/views/personal/Personal.vue')
  //     }
  //   ]
  // },
  /* 工资管理 */
  //财务端工资管理
  {
    path: '/salary',
    component: () => import('@/layout/Layout.vue'),//页面布局已设置不要更改
    meta: { title: '工资管理', menu: true, icon: 'el-icon-bank-card'},
    children: [
      {
        path: '/salary/Salary',
        meta: { title: '工资表', menu: true },
        component: () => import('@/views/salary/Salary.vue'),
      },
      {
        path: '/salary/Accumulation',
        meta: { title: '社保公积金', menu: true },
        component: () => import('@/views/salary/Accumulation.vue'),
      },
      {
        path: '/BenefitsAndProvidentFund',
        meta: { title: '社保公积金设置', menu: true },
        component: () => import('@/views/salary/BenefitsAndProvidentFund.vue'),
      }
    ]
  },
  //员工工资管理
  // {
  //   path: '/PersonalSalary',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '员工工资', menu: true, icon: 'el-icon-bank-card'},
  //   children: [
  //     {
  //       path: '',
  //       meta: { title: '工资表', menu: true },
  //       component: () => import('@/views/salary/PersonalSalary.vue'),
  //     },

  //   ]
  // },
  //账簿管理
  {
    path: '/accountBooks',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '账簿', menu: true, icon: 'el-icon-bank-card'},
    children: [
      {
        path: '/accountBooks/DetailedAccount',
        meta: { title: '明细账'},
        component: () => import('@/views/accountBooks/DetailedAccount.vue'),
      },
      {
        path: '/accountBooks/AccountSummary',
        meta: { title: '科目汇总'},
        component: () => import('@/views/accountBooks/AccountSummary.vue'),
      },
      {
        path: '/accountBooks/ChronologicalAccount',
        meta: { title: '序时账'},
        component: () => import('@/views/accountBooks/ChronologicalAccount.vue'),
      },
      
    ]
  },

  /* 报销管理 */
  //财务报销管理
  // {
  //   path: '/financeReimbursement',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '报销管理', menu: true, icon: 'el-icon-coin'},
  //   children: [
  //     {
  //       path: '',
  //       meta: { title: '报销管理', menu: true },
  //       component: () => import('@/views/reimbursement/FinanceReimbursement.vue'),
  //     },
  //   ]
  // },
  {
    path: '/statement',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '报表管理', menu: true, icon: 'el-icon-coin'},
    children: [
      {
        path: '',
        meta: { title: '报表管理', menu: true },
        component: () => import('@/views/statement/Statement.vue'),
      },
    ]
  },
  //员工报销请求
  // {
  //   path: '/personalReimbursement',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '用户报销', menu: true, icon: 'el-icon-bank-card'},
  //   children: [
  //     {
  //       path: '',
  //       meta: { title: '用户报销' },
  //       component: () => import('@/views/reimbursement/PersonalReimbursement.vue'),
  //     },

  //   ]
  // },
  //老板报销审核
  {
    path: '/bossReimbursement',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '报销审核', menu: true, icon: 'el-icon-bank-card'},
    children: [
      {
        path: '',
        meta: { title: '报销审核' },
        component: () => import('@/views/reimbursement/BossReimbursement.vue'),
      },
    ]
  },

  /* 固定资产折旧管理 */
  //财务固定资产管理
  {
    path: '/fixedasset',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '固定资产折旧管理', menu: true, icon: 'el-icon-office-building'},
    children: [
      {
        path: '/fixedasset/FinanceDepreciation',
        meta: { title: '固定资产折旧明细' },
        component: () => import('@/views/fixedasset/FinanceDepreciation.vue'),
      },
      {
        path: '/fixedasset/DepreciationMethod',
        meta: { title: '折旧方法' },
        component: () => import('@/views/fixedasset/DepreciationMethod.vue'),
      },
      {
        path: '/fixedasset/AssetCategory.vue',
        meta: { title: '资产类型' },
        component: () => import('@/views/fixedasset/AssetCategory.vue'),
      }
    ]
  },
  //用户固定折旧申请
  {
    path: '/personalDepreciation',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '资产折旧申请', menu: true, icon: 'el-icon-office-building', role: ['员工'] },
    children: [
      {
        path: '',
        meta: { title: '申请固定资产折旧' },
        component: () => import('@/views/fixedasset/PersonalDepreciation.vue'),
      }
    ]
  },
  //老板端固定资产折旧审批
  {
    path: '/BossFixedasset',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '固定资产折旧审核', menu: true, icon: 'el-icon-office-building', role: ['管理员'] },
    children: [
      {
        path: '',
        meta: { title: '审核资产折旧申请' },
        component: () => import('@/views/fixedasset/BossDepreciation.vue'),
      }
    ]
  },

  //期末结转
  {
    path: '/carryover',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '期末结转', menu: true, icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '',
        meta: { title: '期末结转' },
        component: () => import('@/views/carryover/Last.vue'),
      },
    ]
  }

  //员工中心
  // {
  //   path: '/personalCenter',
  //   component: () => import('@/layout/Layout.vue'),
  //   meta: { title: '个人中心', menu: true, icon: 'el-icon-s-tools', role: ['员工'] },
  //   children: [
  //     {
  //       path: '',
  //       meta: { title: '个人中心' },
  //       component: () => import('@/views/system/PersonalCenter.vue'),
  //     },

  //   ]
  // },
]

const router = new VueRouter({
  routes: [
    ...commonRoutes,
    ...menuRoutes,
    {
      path: '/*',
      component: () => import('@/views/error/error.vue')
    }
  ]
})

export default router
