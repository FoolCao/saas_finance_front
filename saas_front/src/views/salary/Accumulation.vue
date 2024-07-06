<template>
    <div style="height: auto; width: auto;">

        <!-- 搜素和新增区域 -->
        <el-card>
            <div>
                <el-row :gutter="20">
                    <!-- 搜索区域 -->
                    <el-col :span="23">
                        <el-form :inline="true" style="margin-top: 20px;">
                            <el-form-item label="员工编号">
                                <el-input v-model="adminId" placeholder="请输入员工编号"></el-input>
                            </el-form-item>
                            <el-form-item label="员工电话">
                                <el-input v-model="phone" placeholder="请输入员工电话"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="search()" type="primary" icon="el-icon-search">搜索</el-button>
                            </el-form-item>
                            <el-button type="primary" @click="addOpen"><i
                                    class="el-icon-circle-plus-outline el-icon--left"></i>新增员工工资信息
                            </el-button>
                        </el-form>
                    </el-col>
                    <el-col :span="1">
                        <el-popover placement="top-start" title="工资与保险的介绍" width="200" trigger="hover" content="实际工资=基本工资
                        +奖金+津贴-扣款-个人所得税-五险一金">
                            <i class="el-icon-info" style="font-size: 24px; margin-top: 25px;" slot="reference"></i>
                        </el-popover>


                    </el-col>
                </el-row>
            </div>

        </el-card>

        <!-- 员工工资表 -->
        <el-card style="margin-top: 20px;">

            <el-card>
                <span style="font-size: 16px;font-weight: bold;">社保公积金</span>
            </el-card>

            <el-table :data="list" border style="width: 100%">
                <!-- <el-table-column prop="id" label="编号" align="center"> </el-table-column> -->
                <el-table-column prop="name" label="姓名" width="70" align="center" fixed="left"></el-table-column>
                <el-table-column prop="phone" label="电话 " align="center"> </el-table-column>
                <el-table-column prop="sc" label="公司社保公积金" align="center"> </el-table-column>
                <el-table-column prop="sp" label="个人社保公积金" align="center"> </el-table-column>
                <el-table-column prop="created" label="发放日期" align="center">
                    <template #default="{ row }">
                        <div>
                            <i class="el-icon-time"></i> {{ row.created }}
                        </div>
                    </template>
                </el-table-column>

                <!-- <el-table-column fixed="right" label="生成凭证" align="center">
                    <template #default="{ row }">
                        <el-button v-if="row.isToVoucher === '否'" type="text" size="medium" icon="el-icon-document"
                            @click="updateApprovalStatus(row)">生成凭证</el-button>
                    </template>
                </el-table-column> -->

                <el-table-column fixed="right" label="详情" align="center" width="200px">
                    <template #default="{ row }">
                        <el-button type="primary" icon="el-icon-info" circle @click="update(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize" style="text-align: center; margin-top: 10px;">
            </el-pagination>
        </el-card>

        <!-- 弹窗区域 -->
        <el-dialog title="新增" :visible.sync="addFormVisible" width="700px" style="font-size: 24px;">


            <el-form :model="userFormData" class="demo-form-inline" label-width="100px">

                <!-- 第一行 -->
                <el-form-item label="员工编号">
                    <!-- <el-select v-model="selectedEmployee" placeholder="选择员工" clearable :disabled="actionType === 'edit'"
                        size="medium">
                        <el-option :label="employee.employeeDes" :value="employee.employeeID" :key="employee.employeeID"
                            v-for="employee in employeeList" />
                    </el-select> -->
                    <el-input v-model="userFormData.adminId" placeholder="员工编号" controls-position="right"
                        style="width: 200px;"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基本工资">
                            <el-input-number v-model="userFormData.basicSalary" placeholder="基本工资"
                                controls-position="right" size="medium"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第二行 -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="奖金">
                            <el-input-number v-model="userFormData.bonus" placeholder="奖金" controls-position="right"
                                size="medium">
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="津贴">
                            <el-input-number v-model="userFormData.allowance" placeholder="津贴" controls-position="right"
                                size="medium"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="补助">
                            <el-input-number v-model="userFormData.subsidy" placeholder="补助" controls-position="right"
                                size="medium"></el-input-number>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="扣款">
                            <el-input-number v-model="userFormData.deduction" placeholder="扣款" controls-position="right"
                                size="medium"></el-input-number>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="扣款原因">
                            <el-input v-model="userFormData.deductionDescription" placeholder="扣款原因"
                                controls-position="right" style="width: 400px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="保险金额">
                            <el-input-number disabled v-model="userFormData.insurance" placeholder="保险金额"
                                controls-position="right" size="medium"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实发工资">
                            <el-input-number disabled v-model="userFormData.actualSalary" placeholder="实发工资"
                                controls-position="right" size="medium"></el-input-number>
                        </el-form-item>
                    </el-col> -->
                </el-row>

                <el-form-item>
                    <el-button @click="submit" style="width: 180px; margin-left: 110px" type="primary">提交<i
                            class="el-icon-success el-icon--right"></i></el-button>
                </el-form-item>

            </el-form>
        </el-dialog>

        <!-- 弹窗区域 -->
        <el-dialog title="详情" :visible.sync="detailFormVisible" width="700px" style="font-size: 24px;">

            <!-- 员工工资表 -->
            <el-card style="margin-top: 20px;">

                <!-- <el-card>
                    <span style="font-size: 16px;font-weight: bold;">详情</span>
                </el-card> -->

                <el-table :data="accumulation" border style="width: 100%">
                    <!-- <el-table-column prop="id" label="编号" align="center"> </el-table-column> -->
                    <el-table-column prop="paymentProject" label="社保" align="center"> </el-table-column>
                    <el-table-column prop="companyMoney" label="公司承担金额" align="center"> </el-table-column>
                    <el-table-column prop="personalMoney" label="个人承担金额" align="center"> </el-table-column>
                </el-table>


            </el-card>


        </el-dialog>
    </div>
</template>

<script>

import axios from "axios";
import dayjs from "dayjs";
import '@fortawesome/fontawesome-free/css/all.css';
import { Row } from "element-ui";
import { Message } from 'element-ui'
export default {

    data() {
        return {
            text: '付',
            summary: '工资',
            salaryID: '',
            list: [],
            accumulation: [],
            // 分页相关
            pageno: 1,
            pagesize: 5,
            total: 0,
            // 搜索条件
            bookID: '',
            adminId: '',
            time1: '',
            time2: '',
            phone: '',
            userFormData: {
                adminId: 0,
                basicSalary: 0.00,
                allowance: 0.00,
                bonus: 0.00,
                subsidy: 0.00,
                deduction: 0.00,
                deductionDescription: ''
            },
            employeeID: '',
            actionType: '',
            salaryID: '',
            addFormVisible: false,
            detailFormVisible: false,
            employeeList: [],
            selectedEmployee: '',

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
            value2: ''
        };
    },
    created() {
        this.bookID = localStorage.getItem('bookID');
        this.getList()
        
    },

    methods: {

        async updateApprovalStatus(row) {
            const token = localStorage.getItem("token");
            console.log(row)
            const data = {
                salaryId: row.salaryId,
                isToVoucher: "是"
            }
            const res = await axios({
                url: "http://localhost:8080/salary/update",
                method: "post",
                data: data, 
                headers: {
                    'token': token
                }
            })
            // this.getList()
            localStorage.setItem('summary', this.summary)
            localStorage.setItem('debitAmount', row.actualSalary)
            localStorage.setItem('text', this.text)
            // 等待两秒后跳转页面
            Message.success('即将进入凭证界面')
            setTimeout(() => {
                // 跳转页面
                this.$router.push('/voucher/Voucher?type=1');
            }, 1000);
        },

        async getList() {
            // const formattedParams = {
            //     ...this.params,
            //     assetName: this.params.assetName ? dayjs(this.params.assetName).format('YYYY-MM-DD HH:mm:ss') : null,
            //     brandModel: this.params.brandModel ? dayjs(this.params.brandModel).format('YYYY-MM-DD HH:mm:ss') : null,
            // };
            const token = localStorage.getItem("token");
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/accumulate/list",
                params: {
                    page: this.pageno,
                    limit: this.pagesize,
                    bookID: this.bookID,
                    adminId: this.adminId,
                    time1: this.value2[0],
                    time2: this.value2[1],
                    phone: this.phone
                }, 
                headers: {
                    'token': token
                }
            });
            // 修改日期格式
            this.list = res.data.data.map(item => {
                return {
                    ...item,
                    // 其他字段...
                    created: dayjs(item.created).format('YYYY-MM-DD HH:mm:ss')
                };
            });
            /* console.log(this.list) */
            this.total = res.data.count;


        },
        // 点击搜索
        search() {
            this.getList()
        },
        // 页码改变
        pagechange(pageno) {
            // 条件改变
            this.pageno = pageno
            // 重新请求数据
            this.getList()
        },
        // 打开新增弹窗，
        addOpen() {
            // 打开弹窗
            this.addFormVisible = true;
            // 记录状态
            this.actionType = 'add';
            this.userFormData = {
                baseSalary: 0.00,
                allowance: 0.00,
                bonus: 0.00,
                subsidy: 0.00,
                deduction: 0.00,
                personalIncomeTax: 0.00,
                insurance: 440.00,
                actualSalary: 0.00
            };
            this.employeeID = this.selectedEmployee;
            this.selectedEmployee = ''
        },

        async getAccumulationList(row) {
            const token = localStorage.getItem("token");
            // const formattedParams = {
            //     ...this.params,
            //     assetName: this.params.assetName ? dayjs(this.params.assetName).format('YYYY-MM-DD HH:mm:ss') : null,
            //     brandModel: this.params.brandModel ? dayjs(this.params.brandModel).format('YYYY-MM-DD HH:mm:ss') : null,
            // };
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/accumulate/detail",
                params: {
                   id: row.id
                }, 
                headers: {
                    'token': token
                }
            });
           this.accumulation=res.data.data;
        },

        //修改弹窗
        update(row) {
            console.log(row)
            this.getAccumulationList(row)
            
            setTimeout(console.log("延迟1s"),1000);
            // 打开弹窗
            this.detailFormVisible = true
        },

        calculatePersonalIncomeTax() {
            /* console.log('计算工资') */
            // 先从 userFormData 中获取其他输入项的值

            const { baseSalary, allowance, bonus, subsidy, deduction, insurance } = this.userFormData;

            // 计算总收入
            const totalIncome = baseSalary + allowance + bonus + subsidy - deduction;

            // 计算税前应纳税额
            const taxableIncome = totalIncome - 5000;

            // 根据不同的情况计算 personalIncomeTax
            if (taxableIncome > 0 && taxableIncome <= 5000) {
                this.userFormData.personalIncomeTax = taxableIncome * 0;
            } else if (taxableIncome > 5000 && taxableIncome <= 8000) {
                this.userFormData.personalIncomeTax = taxableIncome * 0.03;
            } else if (taxableIncome > 8000 && taxableIncome <= 17000) {
                this.userFormData.personalIncomeTax = parseFloat((taxableIncome * 0.1).toFixed(2));
            } else if (taxableIncome > 17000) {
                this.userFormData.personalIncomeTax = taxableIncome * 0.2;
            }/* 
            console.log(this.userFormData, '______'); */
            const actualSalary = totalIncome - this.userFormData.personalIncomeTax - insurance;
            this.userFormData.actualSalary = actualSalary
        },
        async deleteSalary(id) {
            const data = {
                salaryID: id
            }
            const res = await axios({
                url: '/deleteSalary',
                method: 'post',
                data: data
            })
            this.getList()
        },

        async submit() {
            const data = {
                ...this.userFormData,
                bookID: this.bookID,
            }
            data.employeeID = this.selectedEmployee;
            if (this.actionType === 'edit') {
                data.salaryID = this.salaryID
            }
            const token = localStorage.getItem("token");
            const res = await axios({
                url: 'http://localhost:8081/salary/add',
                method: 'post',
                data: data, 
                headers: {
                    'token': token
                }
            })
            if (res.data.code == 0) {
                this.addFormVisible = false
                this.getList()
            }
            if (res.data.code == 20020) {
                this.$message.error('该员工不存在');
            }
        }
    },
    watch: {
        userFormData: {
            handler() {
                /* console.log('数据发生变化了！！！') */
                this.calculatePersonalIncomeTax()
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.row-box {
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-bottom: 8px;
    justify-content: center;
}
</style>