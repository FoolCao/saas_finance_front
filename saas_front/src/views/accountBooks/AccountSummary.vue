<template>
    <div style="height: auto; width: auto;">

        <!-- 搜素和新增区域 -->
        <el-card>
            <div style="display: flex; flex-direction: row;">
                <!-- 搜索区域 -->
                <div style="flex: 8;">
                    <el-form :inline="true">
                        <el-form-item label="根据科目名称查询">
                          <el-input placeholder="请输入科目名称" prefix-icon="el-icon-search"
                                    v-model="params.subjectName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search" type="primary" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <!-- 科目汇总 -->
        <el-card style="margin-top: 20px;">

            <el-card>
                <span
                    style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">科目汇总</span>
            </el-card>

            <el-table :data="list" style="width: 100%">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="id" label="序号"> 
              </el-table-column>
                <el-table-column label="科目编码">
                  <template slot-scope="scope">
                      {{ scope.row.accountingSubjectCombined.split(/(?<=^\d+)(?=\D)/)[0] }}
                  </template>
                </el-table-column>
                <el-table-column label="科目名称">
                  <template slot-scope="scope">
                    {{ scope.row.accountingSubjectCombined.split(/(?<=^\d+)(?=\D)/)[1] }}
                  </template>
                </el-table-column>
                <el-table-column prop="totalDebitAmount" label="借方总金额"> </el-table-column>
                <el-table-column prop="totalCreditAmount" label="贷方总金额"> </el-table-column>
                <!-- <el-table-column prop="tenantId" label="租户id"> </el-table-column> -->
                <!-- <el-table-column fixed="right" label="操作" align="center" width="200px">
                  <template #default="{ row }">
                    <el-button type="primary" icon="el-icon-edit" circle @click="update(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="out(row)"></el-button>
                  </template>
                </el-table-column> -->
            </el-table>

            <!-- 分页组件 -->
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize" style="text-align: center; margin-top: 10px;">
            </el-pagination>
        </el-card>

    </div>
</template>

<script>

import axios from "axios";
import dayjs from "dayjs"
export default {

    data() {
        return {
          list: [],
          // 分页相关
          pageno: 1,
          pagesize: 5,
          total: 0,
          // 搜索条件
          params: {
            subjectName:''
          },
          // 新增/修改 内容
          userFormData:{
            companyRatio: '',
            description: '',
            paymentProject: '',
            personalRatio: '',
            id:'',
            state: '',
            tenantId: ''
          },
          show:false,
          addshow:false
        };
    },
    created() {
        this.getList()
    },

    methods: {
        async getList() {
          const token = localStorage.getItem("token");
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance/accountBook/subjectListByPage",
                method: "get",
                params: {
                    page: this.pageno,
                    limit: this.pagesize,
                    ...this.params
                }, 
                headers: {
                    'token': token
                }
            });
            this.list = res.data.data;
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
        }

    },

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