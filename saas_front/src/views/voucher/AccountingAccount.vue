<template>
    <div>
        <el-card>
            <el-card>
                <span style="font-size: 18px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">会计科目</span>
                <el-popover placement="top-start" title="常用摘要功能介绍" width="600" trigger="hover">
                    <el-card>
                        <span>摘要通过简要的文字描述,迅速明确交易内容，记录与该笔交易相关的业务事项</span><br>
                        <span>在后续的财务核对和审计中，摘要是查找和理解交易内容的重要依据之一。</span><br>
                        <span>清晰的摘要有助于提高财务数据的可读性和准确性。</span><br>
                    </el-card>
                    <i class="el-icon-info" style="font-size: 16px; margin-left: 10px; margin-top: 5px;"
                        slot="reference"></i>
                </el-popover>

            </el-card>
            <el-card>
                <div>
                    <el-row type="flex" justify="space-between" align="middle">
                        <!-- 左侧部分，包括新增按钮 -->
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addopen">新增会计科目</el-button>
                        </el-col>

                        <!-- 右侧部分，包括查询输入框 -->
                        <el-col :span="9" :offset="14">
                            <el-input placeholder="请输入查询科目名称" prefix-icon="el-icon-search"
                                v-model="params.accountingAccount"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="0.5">
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table :data="list" style="width: 100%;margin-top: 15px;" :header-row-class-name="tableHeaderClassName">
                    <el-table-column prop="id" label="序号" align="center" width="100"> </el-table-column>
                    <el-table-column prop="accountingAccount" label="会计科目" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="200px">
                        <template #default="{ row }">
                            <el-button type="primary" icon="el-icon-edit" circle @click="update(row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="out(row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页组件 -->
                <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                    :page-size="pagesize" style="text-align: center; margin-top: 10px;">
                </el-pagination>
            </el-card>

            <!-- 修改弹窗区域 -->
            <el-dialog title="修改会计科目" :visible.sync="show" width="600px">
                <el-form :model="userFormData" class="demo-form-inline" label-width="80px">

                    <el-form-item label="会计科目">
                        <el-input type="textarea" v-model="userFormData.accountingAccount" placeholder="会计科目" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                    </el-form-item>

                    <!-- 使用 Flex 布局排列按钮 -->
                    <el-form-item class="button-group">
                        <el-button @click="submit" type="primary">提交</el-button>
                        <el-button @click="cancel" type="info">取消</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>

            <!-- 新增弹窗区域 -->
            <el-dialog title="新增会计科目" :visible.sync="addshow" width="600px">
                <el-form :model="userFormData" class="demo-form-inline" label-width="80px">

                    <el-form-item label="会计科目">
                        <el-input type="textarea" v-model="userFormData.accountingAccount" placeholder="会计科目" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                    </el-form-item>

                    <!-- 使用 Flex 布局排列按钮 -->
                    <el-form-item class="button-group">
                        <el-button @click="addsubmit" type="primary">提交</el-button>
                        <el-button @click="cancel" type="info">取消</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import { dataTool } from 'echarts';

export default {
    data() {
        return {
            tableHeaderClassName: 'custom-table-header',// 自定义的表头样式类名
            list: [],
            id: '',
            userFormData: {
                accountingAccount: ''
            },
            pageno: 1,
            pagesize: 4,
            total: 0,
            params: {
                accountingAccount: '',
            },
            show: false,
            addshow: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            const token = localStorage.getItem("token");
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance//accounting/page",
                method: "get",
                params: {
                    ...this.params,
                    page: this.pageno,
                    limit: this.pagesize,
                },
                headers:{
                'token':token
                }
            });
            this.list = res.data.data;
            this.total = res.data.count;
            console.log(this.total)
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
        update(row) {
            console.log(row)
            this.show = true;
            this.userFormData.accountingAccount = row.accountingAccount;
            this.id = row.id
        },
      async out(row) {
        const token = localStorage.getItem("token");
        if (row.isDefault === '是') {
          // 如果 isDefault 为 "是"，不执行删除操作
          this.$message.warning('不能删除默认项');
        } else {
          const data = {
            id: row.id,
          };
          try {
            const res = await axios.delete("http://39.107.88.156:8080/sass_finance/accounting/delete", {
              params: data,
                headers:{
                'token':token
                }
            });

            // 判断当前页是否是最后一页且只有一条数据
            if (this.$data.pageno === Math.ceil(this.total / this.pagesize) && this.total % this.pagesize === 1) {
              // 如果是最后一页且只有一条数据，页码减一
              this.$data.pageno--;
            }

            // 查询数据
            await this.getList();
          } catch (error) {
            console.error('Error deleting:', error);
            // 处理错误
          }
        }
      },
        async submit() {
            const token = localStorage.getItem("token");
            const data = {
                id: this.id,
                ...this.userFormData
            }
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance/accounting/update",
                method: "post",
                data: data,
                headers:{
                'token':token
                }
            })
            this.getList()
            this.show = false
        },
        cancel() {
            this.show = false
            this.addshow = false
        },
        async addsubmit() {
            const token = localStorage.getItem("token");
            const data = {
                ...this.userFormData
            }
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance/accounting/add",
                method: "post",
                data: data,
                headers:{
                'token':token
                }
            })
            this.getList()
            this.addshow = false
        },
        addopen() {
            this.addshow = true
            this.userFormData.accountingAccount = ''
        }
    }


}
</script>

<style scoped>
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
  justify-content: space-between; /* 将按钮平均分布在弹窗底部 */
  margin-top: 20px; /* 为按钮组设置上边距，以调整按钮与输入框的间隔 */
  margin-right: 80px;
}
</style>