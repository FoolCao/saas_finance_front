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
                                    v-model="params.accountingSubject"></el-input>
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
              <el-table-column prop="voucherId" label="序号"> 
              </el-table-column>
              <el-table-column prop="cime" label="日期" :formatter="formatDate"> 
              </el-table-column>
              <el-table-column label="凭证号">
                <template slot-scope="scope">
                  {{ scope.row.voucherWord +"-"+ scope.row.voucherNumber }}
                </template>
              </el-table-column>
              <el-table-column prop="accountingSubject" label="科目"> </el-table-column>
                <el-table-column prop="debitAmount" label="借方"> </el-table-column>
                <el-table-column prop="creditAmount" label="贷方"> </el-table-column>
                <el-table-column label="方向" :formatter="formatDirection"> </el-table-column>
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
            accountingSubject:''
          }
        };
    },
    created() {
        this.getList()
    },

    methods: {
        async getList() {
          const token = localStorage.getItem("token");
            const res = await axios({
                url: "http://39.107.88.156:8080/sass_finance/accountBook/detailedAccountByPage",
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
        },
        formatDirection(row) {
          // 根据 totalDebitAmount 的值来决定显示内容
          if (row.debitAmount === 0) {
            return '贷';
          } else {
            return '借';
          }
        },
        formatDate(row) {
          // 将时间戳转换为 Date 对象
          const date = new Date(row.cime);
          // 使用 Date 对象的方法获取年月日时分秒
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          const hours = ('0' + date.getHours()).slice(-2);
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const seconds = ('0' + date.getSeconds()).slice(-2);
          
          // 返回格式化后的日期字符串
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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