<template>
    <div>
        <el-card>
            <el-card>
                <span style="font-size: 18px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">记账列表</span>
            </el-card>
            <el-card>
                <div>
                    <el-form :inline="true">
                     <!-- 菜系下拉列表框 -->
                          <div class="block" style="margin-bottom:20px">
                                <span class="demonstration" style="padding-right:5px">开始时间</span>
                                <el-date-picker v-model="params.startTime" type="datetime" placeholder="选择开始日期时间" default-time="12:00:00">
                                </el-date-picker>
                                <span  style="padding-right:13px"></span>
                                <span class="demonstration" style="padding-right:10px">截止时间</span>
                                <el-date-picker v-model="params.endTime" type="datetime" placeholder="选择结束日期时间" default-time="12:00:00">
                                </el-date-picker>
                          </div>
                        <el-form-item label="账户名称">
                            <el-select v-model="params.subjectAccountName" class="filter-item" placeholder="请选择">
                            <el-option v-for="(subjectAccountName, index) in subjectAccountNameList" :label="subjectAccountName" :value="subjectAccountName"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="摘要">
                            <el-select v-model="params.summary" class="filter-item" placeholder="请选择">
                            <el-option v-for="(summary, index) in summaryList" :label="summary.summaryContent" :value="summary.summaryContent"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="收支类别">
                            <el-select v-model="params.classification" class="filter-item" placeholder="请选择">
                            <el-option v-for="(classification, index) in classificationList" :label="classification" :value="classification"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="会计科目">
                            <el-select v-model="params.accountingSubject" class="filter-item" placeholder="请选择">
                            <el-option v-for="(accountingSubject, index) in accountingSubjectList" :label="accountingSubject.accountingAccount" :value="accountingSubject.accountingAccount"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单人">
                            <el-select v-model="params.maker" class="filter-item" placeholder="请选择">
                            <el-option v-for="(maker, index) in makerList" :label="maker" :value="maker"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 搜索按钮 -->
                       <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                       </el-form-item>

                       <!-- 新增按钮 -->
                       <el-form-item>
                            <el-button type="primary" @click="addOpen">新增</el-button>
                       </el-form-item>
                    </el-form>
                </div>
                <el-table :data="list" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName">
                    <el-table-column prop="id" label="编号" align="center"> </el-table-column>
                    <el-table-column prop="ordinal" label="记账序号" align="center" width="120px"> </el-table-column>
                    <el-table-column prop="date" label="记账日期" align="center" width="180px"></el-table-column>
                    <el-table-column prop="subjectAccountName" label="账户名称" align="center" width="120px"></el-table-column>
                    <el-table-column prop="accountingSubject" label="会计科目" align="center" width="120px"></el-table-column>
                    <el-table-column prop="summary" label="摘要" align="center"></el-table-column>
                    <el-table-column prop="classification" label="收支类别" align="center"></el-table-column>
                    <el-table-column prop="debitAmount" label="收入(借方)" align="center" width="100px"></el-table-column>
                    <el-table-column prop="creditAmount" label="支出(贷方)" align="center" width="100px"></el-table-column>
                    <el-table-column prop="maker" label="制单人" align="center"></el-table-column>
                    <!-- <el-table-column fixed="right" label="生成凭证" align="center">
                        <template #default="{ row }">
                            <el-button v-if="row.approvalStatus === '已通过' && row.isToVoucher === '否'" type="text"
                                size="medium" icon="el-icon-document" @click="updateApprovalStatus(row)">生成凭证</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>

                <!-- 分页组件 -->
                <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                    :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                </el-pagination>
            </el-card>

            <!-- 新增区域 -->
            <el-dialog :title="'新增记账'" :visible.sync="addDialogFormVisible">
                <el-form :model="userFormData" class="demo-form-inline" label-width="120px">

                    <el-form-item label="会计科目">
                        <el-select v-model="userFormData.accountingSubject" class="filter-item" placeholder="请选择">
                            <el-option v-for="(accountingSubject, index) in accountingSubjectList" :label="accountingSubject.accountingAccount" :value="accountingSubject.accountingAccount"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="收支类别">
                    <el-input v-model="userFormData.classification" placeholder="收支类别"></el-input>
                    </el-form-item>

                    <el-form-item label="收入(借方)">
                    <el-input v-model="userFormData.debitAmount" placeholder="0.00"></el-input>
                    </el-form-item>

                    <el-form-item label="支出(贷方)">
                    <el-input v-model="userFormData.creditAmount" placeholder="0.00"></el-input>
                    </el-form-item>

                    <el-form-item label="摘要">
                        <el-select v-model="userFormData.summary" class="filter-item" placeholder="请选择">
                        <el-option v-for="(summary, index) in summaryList" :label="summary.summaryContent" :value="summary.summaryContent"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="制单人">
                    <el-input v-model="name" placeholder="制单人"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-top: 20px;">
                        <el-button type="primary" @click="submit" style="margin-left: 400px;">提交</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { Message } from 'element-ui'

export default {
    data() {
        return {
            text:'付',
            name: localStorage.getItem('name'),
            //summary:'报销',
            amount:'',
            accountingSubject:'',
            subjectAccountNameList:'',
            summaryList:'',
            classificationList:'',
            accountingSubjectList:'',
            makerList:'',
            debitAmount:'',
            count: "报销金额",
            style: '报销类别',
            reason: "报销事由",
            note: "备注",
            //reimbursementID: '',
            tableHeaderClassName: 'custom-table-header',// 自定义的表头样式类名
            list: [],
            categoryList:'',
            addDialogFormVisible:false,
            userFormData: {
                date: dayjs().format('YYYY-MM-DD '),
                amount: '',
                category: ''
            },
            pageno: 1,
            pagesize: 4,
            total: 0,
            params: {
                startTime:'',
                endTime:'',
                subjectAccountName: '',
                summary: '',
                classification: '',
                maker: '',
                accountingSubject: '',
            },
            bookId:6,

            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
                startTime: '',
                endTime: '',
        }
    },
    created() {
        this.bookId = localStorage.getItem('bookID'),
        this.getSubjectAccountNameList()
        this.getSummaryList()
        this.getClassificationList()
        this.getMakerList()
        this.getAccountingSubject()
        this.getList()
    },
    methods: {
        async updateApprovalStatus(row) {
            const data = {
                reimbursementID: row.reimbursementID,
                isToVoucher: "是"
            }
            const res = await axios({
                url: "http://localhost:8080/reimbursement/updateReimbursementToVarch",
                method: "post",
                data: data
            })
            // this.getList()
            localStorage.setItem('summary', this.summary)
            localStorage.setItem('debitAmount', row.amount)
            localStorage.setItem('text',this.text)
            // 等待两秒后跳转页面
            Message.success('即将进入凭证界面')
            setTimeout(() => {
                // 跳转页面
                this.$router.push('/voucher/Voucher?type=1');
            }, 1000);
        },
        // 查询全部的账户
         async getSubjectAccountNameList(){
            const res = await axios({
                url:"http://localhost:8081/bookkeeping/subjectAccountNameList",
                method:"get",
                params:{
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            console.log(res.data.data)
            this.subjectAccountNameList=res.data.data
         },
         // 查询全部的摘要
         async getSummaryList(){
            const res = await axios({
                url:"http://localhost:8081/summary/findAll",
                method:"get",
                params:{
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            this.summaryList=res.data.data
         },
         // 查询全部的收支类别
         async getClassificationList(){
            const res = await axios({
                url:"http://localhost:8081/bookkeeping/classificationList",
                method:"get",
                params:{
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            this.classificationList=res.data.data
         },
         // 查询全部的制单人
         async getMakerList(){
            const res = await axios({
                url:"http://localhost:8081/bookkeeping/makerList",
                method:"get",
                params:{
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            this.makerList=res.data.data
         },
         // 查询全部的会计科目
         async getAccountingSubject(){
            const res = await axios({
                url:"http://localhost:8081/accounting/findAll",
                method:"get",
                params:{
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            this.accountingSubjectList=res.data.data
         },
         //分页查询
        async getList() {
            const res = await axios({
                url: "http://localhost:8081/bookkeeping/list",
                method: "get",
                params: {
                    ...this.params,
                    pageno: this.pageno,
                    pagesize: this.pagesize,
                    bookId:this.bookId,
                    //bookId:6,
                }
            });
            this.list = res.data.data.map(item => {
                return {
                    ...item,
                    date: dayjs(item.date).format('YYYY-MM-DD HH:mm:ss'),
                };
            });
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
        this.addDialogFormVisible = true
        // 记录状态
        this.actionType = 'add'
        // 重置userFormData
        this.userFormData = {
            number: '',
            name: '',
            accountingSubject: '',
            balance:'',
            bankAccount: ''
        }
        },
        //新增或修改固定资产
        async submit() {
        // 拷贝userFormData到data
        const data = { ...this.userFormData }
            const res = await axios({
            url: 'http://localhost:8081/bookkeeping/insert',
            method: 'post',
            data: data
        })
        this.addDialogFormVisible = false
        this.getList()
        }
    }


}
</script>

<style lang="scss" scoped>
::v-deep .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    text-align: center;
}

.flex-container {
    display: flex;
}

.charge-header {
    margin-bottom: 10px;
}

.charge-header>div {
    display: inline-block;
    margin-right: 15px;
}

/* 修改标题行的颜色 */
::v-deep .el-dialog__header {
    background-color: rgb(243, 247, 249);
    /* 替换为你想要的背景颜色值 */
    color: #000000;
    /* 替换为你想要的文字颜色值 */
}

::v-deep .custom-table-header th {
    background-color: rgb(249, 251, 252);
    /* 替换为你想要的背景颜色值 */
    color: #000000;
    /* 替换为你想要的文字颜色值 */
}

.button-group {
    display: flex;
    justify-content: space-between;
    /* 将按钮平均分布在弹窗底部 */
    margin-top: 20px;
    /* 为按钮组设置上边距，以调整按钮与输入框的间隔 */
    margin-right: 80px;
}
</style>