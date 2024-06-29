<template>
    <div>
        <el-card>
            <el-card>
                <span style="font-size: 18px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">账户管理</span>
            </el-card>
            <el-card>
                <div>
                    <el-form :inline="true">
                        <!-- 新增按钮 -->
                       <el-form-item>
                            <el-button type="primary" @click="addOpen">新增</el-button>
                       </el-form-item>

                        <!-- 删除按钮 -->
                       <el-form-item>
                            <el-button type="primary" @click="batch">删除</el-button>
                       </el-form-item>
                    </el-form>
                </div>
                <el-table :data="list" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="编号" align="center"> </el-table-column>
                    <el-table-column prop="number" label="账户编号" align="center"> </el-table-column>
                    <el-table-column prop="name" label="账户名称" align="center"></el-table-column>
                    <el-table-column prop="accountingSubject" label="会计科目" align="center"></el-table-column>
                    <el-table-column prop="balance" label="余额" align="center"></el-table-column>
                    <el-table-column prop="bankAccount" label="银行卡号" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="250" align="center">
                        <template slot-scope="{row,$index}">
                            <el-button  type="danger" icon="el-icon-delete" circle @click="removeFixedasset(row.id)"></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle @click="edit(row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页组件 -->
                <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                    :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                </el-pagination>
            </el-card>

            <!-- 新增区域 -->
            <el-dialog :title="'新增账户'" :visible.sync="addDialogFormVisible">
            <el-form :model="userFormData" class="demo-form-inline" label-width="120px">

                <el-form-item label="账户编码">
                <el-input v-model="userFormData.number" placeholder="账户编码"></el-input>
                </el-form-item>

                <el-form-item label="账户名称">
                <el-input v-model="userFormData.name" placeholder="账户名称"></el-input>
                </el-form-item>

                <el-form-item label="会计科目">
                    <el-select v-model="userFormData.accountingSubject" class="filter-item" placeholder="请选择">
                        <el-option v-for="(accountingSubject, index) in accountingSubjectList" :label="accountingSubject.accountingAccount" :value="accountingSubject.accountingAccount"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="初始余额">
                <el-input v-model="userFormData.balance" placeholder="初始余额"></el-input>
                </el-form-item>

                <el-form-item style="margin-top: 20px;">
                <el-button @click="submit" style="margin-left: 400px;">提交</el-button>
                </el-form-item>

            </el-form>
            </el-dialog>

            <!-- 修改区域 -->
            <el-dialog :title="'修改角色'" :visible.sync="editDialogFormVisible">
            <el-form :model="userFormData" class="demo-form-inline" label-width="120px">

                <el-form-item label="账户名称">
                <el-input v-model="userFormData.name" placeholder="账户名称"></el-input>
                </el-form-item>

                <el-form-item label="会计科目">
                    <el-select v-model="userFormData.accountingSubject" class="filter-item" placeholder="请选择">
                        <el-option v-for="(accountingSubject, index) in accountingSubjectList" :label="accountingSubject.accountingAccount" :value="accountingSubject.accountingAccount"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item style="margin-top: 20px;">
                <el-button @click="commit" style="margin-left: 400px;">提交</el-button>
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
            tableHeaderClassName: 'custom-table-header',// 自定义的表头样式类名
            list: [],
            addDialogFormVisible:false,
            editDialogFormVisible:false,
            accountingSubjectList:'',
            sels:'',
            userFormData: {
                date: dayjs().format('YYYY-MM-DD '),
                id:'',
                number:'',
                name: '',
                accountingSubject: '',
                balance:'',
                bankAccount: ''
            },
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
        this.getAccountingSubject()
        this.getList()
    },
    methods: {
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
        async getList() {
            const res = await axios({
                url: "http://localhost:8081/subjectAccount/page",
                method: "get",
                params: {
                    page: this.pageno,
                    limit: this.pagesize,
                    //bookId:this.bookId,
                }
            });
            this.list = res.data.data.map(item => {
                return {
                    ...item,
                    createTime: dayjs(item.createTime).format('YYYY-MM-DD '),
                    updateTime: dayjs(item.updateTime).format('YYYY-MM-DD ')
                };
            });
            this.total = res.data.count;
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

    //修改弹窗
    edit(row) {
      // 打开弹窗
      this.editDialogFormVisible = true
      console.log(row)
      // 数据回显
      this.userFormData.name = row.name
      this.userFormData.accountingSubject = row.accountingSubject
      this.bankAccount=row.bankAccount
      // 记录id
      this.id = row.id
      // 记录动作
      this.actionType = 'edit'
    },
    //新增或修改固定资产
    async submit() { 
        // 拷贝userFormData到data
        const data = { ...this.userFormData }
        if (this.actionType === 'add') {
            const res = await axios({
            url: 'http://localhost:8081/subjectAccount/add',
            method: 'post',
            data: data
        })
        this.addDialogFormVisible = false
        this.getList()
      }
    },
    //修改
    async commit() {
      // 拷贝userFormData到data
      const data = { ...this.userFormData }
      // 修改的时候需要把id带过去
      if (this.actionType === 'edit') {
        data.id = this.id
        const res = await axios({
        url: 'http://localhost:8081/subjectAccount/update',
        method: 'post',
        data: data
      })
      this.editDialogFormVisible = false
      this.getList()
      }       
    },
    //删除
    async removeFixedasset(id) {
      const res = await axios({
        url: 'http://localhost:8081/subjectAccount/delete',
        method: 'get',
        // data一定是个对象，不能直接把id给data，把id变成一个对象给到data
        params: {
          id: id
        }
      })
      console.log(res.data.code)
      this.getList()
    },
    //获取选中的值
    handleSelectionChange(sels) {
        this.sels = sels;
        console.log("选中的值",sels.map((item) => item.id));
    },
    //批量删除
    async batch() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = this.sels.map((item) => {
            this.removeFixedasset(item.id).then((res) => {
            if (res.data.code == "0") {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
           }
           });
          });
          console.log("ids为:",ids)
          this.getList()
       })
       .catch(() => {
        this.$message({
                type: 'info',
                message: '已取消删除'
        });          
      });
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