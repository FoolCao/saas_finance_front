<template>
    <el-card>
        <div class="sidebar">
            <el-tabs :tab-position="tabPosition" style="height: auto;">
                <el-tab-pane label="账套管理">
                    <!-- title -->
                    <el-card style="text-align:center">
                        <span
                            style="font-size: 24px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">账套管理</span>
                    </el-card>
                    <!-- 操作按钮 -->
                    <el-card style="margin-top: 20px">
                        <span
                            style="font-size: 16px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">账套管理</span>
                        <!-- 使用 v-if 判断 role 的内容，如果是老板则不显示新增按钮 -->
                        <el-button style="margin-left: 20px" @click="addOpen">新增账套</el-button>
                    </el-card>
                    <!-- 账套区域 -->
                    <el-row>
                        <el-col v-for="item in accountBooksList" :span="8">
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <span>{{ item.bookName }}</span>
                                    <el-button style="margin-left: 20px" v-if="item.state === '启用'" type="text"
                                        @click="updateOpen(item)">
                                        修改账套
                                    </el-button>
                                    <el-button style="margin-left: 20px" type="text"
                                        @click="viewAccountDetails(item.id, item.bookName)">
                                        进入账套
                                    </el-button>
                                </div>
                                <p style="margin-top:10px">账套名称：{{ item.bookName }}</p>
                                <p style="margin-top:20px">纳税类型：{{ item.varType }}</p>
                                <p style="margin-top:20px">启用时间：{{ item.created }}</p>
                                <p style="margin-top:20px">禁用时间：{{ item.end }}</p>
                            </el-card>
                        </el-col>
                    </el-row>

                </el-tab-pane>
                <el-tab-pane label="员工管理">

                    <!-- 员工信息表 -->
                    <el-card style="margin-top: 20px;">

                        <el-card>
                            <span
                                style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">员工信息表</span>
                        </el-card>

                        <el-table :data="userList" border style="width: 100%">
                            <el-table-column prop="id" label="序号" align="center"> </el-table-column>
                            <el-table-column prop="dname" label="员工姓名" align="center"> </el-table-column>
                            <el-table-column prop="username" label="用户名" align="center"> </el-table-column>
                            <el-table-column prop="phone" label="手机号" align="center"> </el-table-column>
                            <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
                            <el-table-column prop="rname" label="角色" align="center"> </el-table-column>
                            <el-table-column prop="created" label="创建时间" align="center"> </el-table-column>
                            <el-table-column prop="updated" label="修改时间" align="center"> </el-table-column>
                            <el-table-column prop="image" label="头像" align="center"> </el-table-column>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150" align="center">
                                <template #default="{ row }">
                                    <el-button type="text" size="small" @click="removeEmployee(row)">删除</el-button>
                                    <el-button type="text" size="small" @click="edit(row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页组件 -->
                        <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                            :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                        </el-pagination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="角色管理">
                    <el-card style="margin-top: 20px;">

                        <el-card>
                            <span
                                style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">角色管理表</span>
                        </el-card>

                        <el-table :data="roleList" border style="width: 100%">
                            <el-table-column prop="id" label="序号" align="center"> </el-table-column>
                            <el-table-column prop="name" label="员工姓名" align="center"> </el-table-column>
                            <el-table-column prop="pname" label="用户名" align="center"> </el-table-column>
                            <el-table-column prop="description" label="描述" align="center"> </el-table-column>

                            <el-table-column fixed="right" label="操作" width="150" align="center">
                                <template #default="{ row }">
                                    <el-button type="text" size="small" @click="removeEmployee(row)">删除</el-button>
                                    <el-button type="text" size="small" @click="edit(row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页组件 -->
                        <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                            :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                        </el-pagination>
                    </el-card>

                </el-tab-pane>
                <el-tab-pane label="权限管理">
                    <el-card style="margin-top: 20px;">

                        <el-card>
                            <span
                                style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">权限管理表</span>
                        </el-card>

                        <el-table :data="permissionList" border style="width: 100%">
                            <el-table-column prop="id" label="序号" align="center"> </el-table-column>
                            <el-table-column prop="name" label="权限名称" align="center"> </el-table-column>
                            <el-table-column prop="perms" label="uri" align="center"> </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150" align="center">
                                <template #default="{ row }">
                                    <el-button type="text" size="small" @click="removeEmployee(row)">删除</el-button>
                                    <el-button type="text" size="small" @click="edit(row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页组件 -->
                        <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                            :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                        </el-pagination>
                    </el-card>

                </el-tab-pane>
                <el-tab-pane label="操作日志">
                    <div style="height: auto; width: auto;">

                        <!-- 搜素和新增区域 -->
                        <el-card>
                            <div style="display: flex; flex-direction: row;">
                                <!-- 搜索区域 -->
                                <div style="flex: 8;">
                                    <el-form :inline="true">
                                        <el-form-item label="时间">
                                            <el-date-picker v-model="value2" type="datetimerange"
                                                :picker-options="pickerOptions" range-separator="至"
                                                start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="状态">
                                            <el-select v-model="params.state" placeholder="请选择状态">
                                                <el-option value=""></el-option>
                                                <el-option label="失败" value="1"></el-option>
                                                <el-option label="成功" value="0"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="search" type="primary"
                                                icon="el-icon-search">搜索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </el-card>

                        <!-- 员工工资表 -->
                        <el-card style="margin-top: 20px;">

                            <el-card>
                                <span
                                    style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">操作日志</span>
                                <!-- <div style="border: 2px; margin-top: 20px;">
            <el-button type="primary" @click="addopen">新增</el-button>
          </div> -->
                            </el-card>

                            <el-table :data="list" style="width: 100%">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="id" label="序号"> </el-table-column>
                                <el-table-column prop="module" label="模块"> </el-table-column>
                                <el-table-column prop="opt" label="操作"> </el-table-column>
                                <el-table-column prop="ip" label="IP"> </el-table-column>
                                <el-table-column prop="time" label="访问时间"> </el-table-column>
                                <el-table-column prop="uri" label="URI"> </el-table-column>
                                <el-table-column prop="adminId" label="操作人编号"> </el-table-column>
                                <el-table-column prop="name" label="操作人姓名"> </el-table-column>
                                <el-table-column prop="state" label="访问状态">
                                    <template slot-scope="scope">
                                        <!-- 使用条件判断显示具体信息 -->
                                        <span v-if="scope.row.state === 1">失败</span>
                                        <span v-else-if="scope.row.state === 0">成功</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="description" label="备注"> </el-table-column> -->
                                <!-- <el-table-column prop="tenantId" label="租户id"> </el-table-column> -->
                                <!-- <el-table-column fixed="right" label="操作" align="center" width="200px">
              <template #default="{ row }">
                <el-button type="primary" icon="el-icon-edit" circle @click="update(row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="out(row)"></el-button>
              </template>
            </el-table-column> -->
                            </el-table>

                            <!-- 分页组件 -->
                            <el-pagination @current-change="pagechange" background layout="prev, pager, next"
                                :total="total" :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                            </el-pagination>
                        </el-card>

                        <!-- 修改弹窗区域 -->
                        <el-dialog title="修改社保公积金" :visible.sync="show" width="600px">
                            <el-form :model="userFormData" class="demo-form-inline" label-width="80px">

                                <el-form-item label="缴纳项目">
                                    <el-input v-model="userFormData.paymentProject" placeholder="缴纳项目名称"></el-input>
                                </el-form-item>

                                <el-form-item label="公司缴纳">
                                    <el-input v-model="userFormData.companyRatio" placeholder="公司缴纳比例"></el-input>
                                </el-form-item>

                                <el-form-item label="个人缴纳">
                                    <el-input v-model="userFormData.personalRatio" placeholder="个人缴纳比例"></el-input>
                                </el-form-item>

                                <el-form-item label="备注">
                                    <el-input v-model="userFormData.description" placeholder="备注信息"></el-input>
                                </el-form-item>

                                <el-form-item label="状态信息">
                                    <el-select style="width: 100px; margin-left: 10px;" v-model="userFormData.state">
                                        <el-option label="失败" :value="1"></el-option>
                                        <el-option label="成功" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>

                                <!-- <el-form-item label="租户id">
        <el-input v-model="userFormData.tenantId" placeholder="租户id"></el-input>
      </el-form-item> -->

                                <!-- 使用 Flex 布局排列按钮 -->
                                <el-form-item class="button-group">
                                    <el-button @click="submit" type="primary">提交</el-button>
                                    <el-button @click="cancel" type="info">取消</el-button>
                                </el-form-item>

                            </el-form>
                        </el-dialog>

                        <!-- 新增弹窗区域 -->
                        <el-dialog title="新增摘要内容" :visible.sync="addshow" width="600px">
                            <el-form :model="userFormData" class="demo-form-inline" label-width="80px">

                                <el-form-item label="缴纳项目">
                                    <el-input v-model="userFormData.paymentProject" placeholder="缴纳项目名称"></el-input>
                                </el-form-item>

                                <el-form-item label="公司缴纳">
                                    <el-input v-model="userFormData.companyRatio" placeholder="公司缴纳比例"></el-input>
                                </el-form-item>

                                <el-form-item label="个人缴纳">
                                    <el-input v-model="userFormData.personalRatio" placeholder="个人缴纳比例"></el-input>
                                </el-form-item>

                                <el-form-item label="备注">
                                    <el-input v-model="userFormData.description" placeholder="备注信息"></el-input>
                                </el-form-item>

                                <!-- <el-form-item label="租户id">
        <el-input v-model="userFormData.tenantId" placeholder="租户id"></el-input>
      </el-form-item> -->

                                <!-- 使用 Flex 布局排列按钮 -->
                                <el-form-item class="button-group">
                                    <el-button @click="addsubmit" type="primary">提交</el-button>
                                    <el-button @click="cancel" type="info">取消</el-button>
                                </el-form-item>

                            </el-form>
                        </el-dialog>

                    </div>
                </el-tab-pane>
            </el-tabs>

            <!-- 新增账套弹窗区域 -->
            <el-dialog title="新增账套具体信息" :visible.sync="dialogFormVisible">
                <el-form :model="formData" class="demo-form-inline" label-width="120px">
                    <el-form-item label="账套名称">
                        <el-input v-model="formData.bookName" placeholder="账套名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="formData.contactPerson" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input v-model="formData.contactPhoneNum" placeholder="联系人电话"></el-input>
                    </el-form-item>
                    <el-form-item label="纳税类型">
                        <el-select v-model="formData.varType" placeholder="请选择纳税类型">
                            <el-option label="一般纳税人" value="一般纳税人"></el-option>
                            <el-option label="小规模纳税人" value="小规模纳税人"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit">提交</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>

            <!-- 修改账套弹窗区域 -->
            <el-dialog title="修改账套信息" :visible.sync="show">
                <el-form :model="updateformData" class="demo-form-inline" label-width="120px">

                    <el-form-item label="账套名称">
                        <el-input v-model="updateformData.bookName" placeholder="账套名称"></el-input>
                    </el-form-item>

                    <el-form-item label="联系人">
                        <el-input v-model="updateformData.contactPerson" placeholder="单位名称"></el-input>
                    </el-form-item>

                    <el-form-item label="联系人电话">
                        <el-input v-model="updateformData.contactPhoneNum" placeholder="联系人电话"></el-input>
                    </el-form-item>

                    <el-form-item label="纳税类型">
                        <el-select v-model="updateformData.varType" placeholder="请选择纳税类型">
                            <el-option label="一般纳税人" value="一般纳税人"></el-option>
                            <el-option label="小企业会计准则" value="小企业会计准则"></el-option>
                            <el-option label="小规模纳税人" value="小规模纳税人"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否禁用">
                        <el-select v-model="updateformData.state" placeholder="">
                            <el-option label="禁用" value="禁用"></el-option>
                            <el-option label="启用" value="启用"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="update">提交</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>

        </div>
    </el-card>

</template>

<script>

import dayjs from "dayjs";
import axios from "axios";
export default {

    data() {
        return {
            tabPosition: 'left',
            accountBooksList: [],
            userList: [],
            roleList: [],
            permissionList: [],
            dialogFormVisible: false,
            isTrueOrFalse: false,
            formData: {
                id: '',
                bookName: '',
                contactPerson: '',
                contactPhoneNum: '',
                varType: '',
                created: '',
                state: ''
            },
            updateformData: {
                id: '',
                bookName: '',
                contactPerson: '',
                contactPhoneNum: '',
                varType: '',
                end: '',
                state: ''
            },
            //用户管理数据
            userFormDate: {
                id: '',
                name: '',
                username: '',
                phone: '',
                email: '',
                roleName: '',
                image: ''
            },
            list: [],
            // 分页相关
            pageno: 1,
            pagesize: 5,
            total: 0,
            // 搜索条件
            params: {
                state: undefined
            },
            // 新增/修改 内容
            userFormData: {
                companyRatio: '',
                description: '',
                paymentProject: '',
                personalRatio: '',
                id: '',
                state: '',
                tenantId: ''
            },
            show: false,
            addshow: false,

            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: '',
            show: false
        };
    },
    created() {
        this.getList();
        this.getUriList()
        this.getUserList()
        this.getRoleList()
        this.getPermissionList()
        this.role = localStorage.getItem('role');
        this.storeId = localStorage.getItem('storeId');
    },
    methods: {
        async getUriList() {

            const res = await axios({
                url: "http://localhost:8081/log/list",
                method: "get",
                params: {
                    page: this.pageno,
                    limit: this.pagesize,
                    ...this.params,
                    startTime: this.value2[0],
                    overTime: this.value2[1]
                },
            });
            // 修改日期格式
            this.list = res.data.data.map(item => {
                return {
                    ...item,
                    // 其他字段...
                    time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
                };
            });
            this.total = res.data.count;
        },
        // 点击搜索
        search() {
            this.getUriList()
        },
        // 页码改变
        pagechange(pageno) {
            // 条件改变
            this.pageno = pageno
            // 重新请求数据
            this.getUriList()
        },
        async getUserList() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/admin/list",
            });
            // 遍历返回的数据，将 createTime 和 endTime 转换为指定格式的日期时间字符串
            this.userList = res.data.data.map(item => {
                item.created = dayjs(item.created).format('YYYY-MM-DD HH:mm:ss');
                item.updated = dayjs(item.updated).format('YYYY-MM-DD HH:mm:ss');
                return item;
            });
        },
        async getRoleList() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/role/list",
            }); 0
            // 遍历返回的数据，将 createTime 和 endTime 转换为指定格式的日期时间字符串
            this.roleList = res.data.data.map(item => {
                item.created = dayjs(item.created).format('YYYY-MM-DD HH:mm:ss');
                return item;
            });
        },
        async getPermissionList() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/permission/list",
            }); 0
            // 遍历返回的数据，将 createTime 和 endTime 转换为指定格式的日期时间字符串
            this.permissionList = res.data.data.map(item => {
                item.created = dayjs(item.created).format('YYYY-MM-DD HH:mm:ss');
                return item;
            });
        },
        async getList() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/account/page",
            });
            // 遍历返回的数据，将 createTime 和 endTime 转换为指定格式的日期时间字符串
            this.accountBooksList = res.data.data.map(item => {
                item.created = dayjs(item.created).format('YYYY-MM-DD HH:mm:ss');
                if (item.end) {
                    item.end = dayjs(item.end).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    item.end = ''; // 如果 endTime 为空，则赋空值
                }
                return item;
            });
        },

        viewAccountDetails(id, bookName) {
            // 存储具体某个账套的bookID到localStorage
            // localStorage.setItem("bookID", id);
            // localStorage.setItem("bookName", bookName);
            // 这里可以跳转到具体账套的详细信息页面或执行其他操作
            // 示例：跳转到名为'/accountDetails'的路由
            this.$router.push('/home');
        },

        // 打开新增弹窗，
        addOpen() {
            // 打开弹窗
            this.dialogFormVisible = true
            // 记录状态
            // 重置formData
            this.formData = {
                id: '',
                bookName: '',
                contactPerson: '',
                contactPhoneNum: '',
                varType: '',
            }
        },
        updateOpen(item) {
            this.show = true
            this.updateformData = { ...item }
        },

        async update() {

            const data = {
                ...this.updateformData,

            };
            if (this.updateformData.state === '禁用') {
                data.end = new Date()
                data.state = '禁用'
            } else {
                data.end = null
                data.state = '启用'
            }
            const res = await axios({
                url: "http://localhost:8081/account/update",
                method: 'post',
                data: data
            })
            this.show = false
            this.getList()
        },

        async submit() {
            // 拷贝formData到data
            const data = {
                ...this.formData,
                // 添加其他字段
                created: new Date(),
                end: null,
                storeId: localStorage.getItem('storeId'),
                state: '启用'
            }
            const res = await axios({
                url: "http://localhost:8081/account/add",
                method: 'post',
                data: data
            })
            this.dialogFormVisible = false
            this.getList()
        },
    },

}
</script>

<style lang="scss" scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>