<template>
    <div>
        <el-card>
            <el-card>
                <span style="font-size: 18px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">记账管理</span>
            </el-card>
            <el-card>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="账户汇总" name="first">
                        <el-form :inline="true">
                            <el-form-item label="账户名称">
                                <el-select v-model="subjectAccountName" class="filter-item" placeholder="请选择">
                                    <el-option label="银行" value="银行">银行</el-option>
                                    <el-option label="现金" value="现金">现金</el-option>
                                </el-select>
                            </el-form-item>
                             <!-- 搜索按钮 -->
                            <el-form-item>
                                <el-button type="primary" @click="search">查询</el-button>
                            </el-form-item>
                        </el-form>
                        

                        <el-table :data="subjectAccountNameList" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName">
                            <el-table-column label="编号" align="center" width="50px">
                                <template slot-scope="scope">
                                    {{ scope.$index+1 }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="subjectAccountName" label="账户名称" align="center" width="180px"> </el-table-column>
                            <el-table-column prop="debitTotal" label="收入总额" align="center"></el-table-column>
                            <el-table-column prop="creditTotal" label="支出总额" align="center"></el-table-column>
                            <el-table-column prop="debitCount" label="收入笔数" align="center"></el-table-column>
                            <el-table-column prop="creditCount" label="支出笔数" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="收支类别汇总" name="second">
                        <el-form :inline="true">
                            <el-form-item label="收支类型">
                                <el-select v-model="classification" class="filter-item" placeholder="请选择">
                                    <el-option label="收入" value="收入">收入</el-option>
                                    <el-option label="支出" value="支出">支出</el-option>
                                </el-select>
                            </el-form-item>
                            <!-- 搜索按钮 -->
                            <el-form-item>
                                <el-button type="primary" @click="query">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <el-table :data="classificationList" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName">
                            <el-table-column label="编号" align="center" width="50px">
                                <template slot-scope="scope">
                                    {{ scope.$index+1 }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="classification" label="收支类型" align="center" width="120px"> </el-table-column>
                            <el-table-column prop="summary" label="摘要" align="center"> </el-table-column>
                            <el-table-column prop="debitTotal" label="收入总额" align="center"></el-table-column>
                            <el-table-column prop="creditTotal" label="支出总额" align="center"></el-table-column>
                            <el-table-column prop="debitCount" label="收入笔数" align="center"></el-table-column>
                            <el-table-column prop="creditCount" label="支出笔数" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="会计科目汇总" name="third">
                        <el-table :data="accountingSubjectList" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName">
                            <el-table-column label="编号" align="center" width="50px">
                                <template slot-scope="scope">
                                    {{ scope.$index+1 }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="accountingSubject" label="会计科目" align="center" width="180px"> </el-table-column>
                            <el-table-column prop="debitTotal" label="收入总额" align="center"></el-table-column>
                            <el-table-column prop="creditTotal" label="支出总额" align="center"></el-table-column>
                            <el-table-column prop="debitCount" label="收入笔数" align="center"></el-table-column>
                            <el-table-column prop="creditCount" label="支出笔数" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-card>

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
            activeName: 'first',
            tableHeaderClassName: 'custom-table-header',// 自定义的表头样式类名
            subjectAccountNameList:'',
            classificationList:'',
            accountingSubjectList:'',
            subjectAccountName:'',
            classification:'',
            pageno: 1,
            pagesize: 4,
            total: 0,
            params: {

            },
            bookId:6
        }
    },
    created() {
        this.bookId = localStorage.getItem('bookID'),
        this.getSubjectAccountNameList()
        this.getClassificationList()
        this.getAccountingSubject()
        this.getList()
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async updateApprovalStatus(row) {
            const token = localStorage.getItem("token");
            const data = {
                reimbursementID: row.reimbursementID,
                isToVoucher: "是"
            }
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance/reimbursement/updateReimbursementToVarch",
                method: "post",
                data: data,
                headers:{
                'token':token
                }
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
        //账户名称汇总
         async getSubjectAccountNameList(){
            const token = localStorage.getItem("token");
            const res = await axios({
                url:"http://39.107.88.156:8080/sass_finance/bookkeeping/statsBySubjectAccount",
                method:"get",
                params:{
                    subjectAccountName:this.subjectAccountName,
                    bookId:this.bookId,
                    //bookId:6,
                },
                headers:{
                'token':token
                }
            });
            this.subjectAccountNameList=res.data.data
         },
         //收支类别汇总
         async getClassificationList(){
            const token = localStorage.getItem("token");
            const res = await axios({
                url:"http://39.107.88.156:8080/sass_finance/bookkeeping/statsByClassification",
                method:"get",
                params:{
                    classification:this.classification,
                },
                headers:{
                'token':token
                }
            });
            this.classificationList=res.data.data
         },
         //会计科目汇总
         async getAccountingSubject(){
            const token = localStorage.getItem("token");
            const res = await axios({
                url:"http://39.107.88.156:8080/sass_finance/bookkeeping/statsByAccountingSubject",
                method:"get",
                headers:{
                'token':token
                }
            });
            this.accountingSubjectList=res.data.data
         },
        // 点击搜索
        search() {
            this.getSubjectAccountNameList()
        },
        // 点击搜索
        query() {
            this.getClassificationList()
        },
        // 页码改变
        pagechange(pageno) {
            // 条件改变
            this.pageno = pageno
            // 重新请求数据
            this.getList()
        },
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