<template>
    <div style="height: auto; width: auto;">

        <!-- 搜素和新增区域 -->
        <el-card>
            <div style="display: flex; flex-direction: row;">
                <!-- 搜索区域 -->
                <div style="flex: 8;">
                    <el-form :inline="true">
                        <el-form-item label="根据缴纳项目查询">
                          <el-input placeholder="请输入缴纳项目名称" prefix-icon="el-icon-search"
                                    v-model="params.paymentProject"></el-input>
                        </el-form-item>
                        <el-form-item label="根据状态查询">
                          <el-select v-model="params.state" placeholder="请选择状态">
                            <el-option value=""></el-option>
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search" type="primary" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <!-- 员工工资表 -->
        <el-card style="margin-top: 20px;">

            <el-card>
                <span
                    style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">社保公积金设置</span>
              <div style="border: 2px; margin-top: 20px;">
                <el-button type="primary" @click="addopen">新增</el-button>
              </div>
            </el-card>

            <el-table :data="list" style="width: 100%">
              <el-table-column type="selection" width="55">
              </el-table-column>
                <el-table-column prop="id" label="序号"> </el-table-column>
                <el-table-column prop="paymentProject" label="缴纳项目"> </el-table-column>
                <el-table-column prop="companyRatio" label="公司缴纳比例"> </el-table-column>
                <el-table-column prop="personalRatio" label="个人缴纳比例"> </el-table-column>
                <el-table-column prop="state" label="状态">
                  <template slot-scope="scope">
                    <!-- 使用条件判断显示具体信息 -->
                    <span v-if="scope.row.state === 1">启用</span>
                    <span v-else-if="scope.row.state === 0">禁用</span>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="备注"> </el-table-column>
                <!-- <el-table-column prop="tenantId" label="租户id"> </el-table-column> -->
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
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
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
            paymentProject: '',
            state: null
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
                url: "http://39.107.88.156:8080/sass_finance/accumulation/list",
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
        update(row) {
          console.log(row)
          this.show = true;
          this.userFormData.id =  row.id;
          this.userFormData.paymentProject = row.paymentProject;
          this.userFormData.companyRatio = row.companyRatio;
          this.userFormData.personalRatio = row.personalRatio;
          this.userFormData.description = row.description;
          this.userFormData.state = row.state;
          this.userFormData.tenantId = row.tenantId;
        },
      addopen() {
        this.addshow = true
        this.userFormData.companyRatio =  '',
        this.userFormData.description =  '',
        this.userFormData.paymentProject =  '',
        this.userFormData.personalRatio = '',
        this.userFormData.id = '',
        this.userFormData.state =  1,
        this.userFormData.tenantId = ''
      },
      cancel() {
        this.show = false
        this.addshow = false
      },
      async out(row) {
        const token = localStorage.getItem("token");
          const data = {
            id: row.id,
          }
            const res = await axios({
              url: "http://39.107.88.156:8080/sass_finance/accumulation/updateStatus",
              method: "post",
              params: data, 
                headers: {
                    'token': token
                }
            })
            this.getList();
      },
      async submit() {
        const token = localStorage.getItem("token");
        const data = {
          ...this.userFormData,
        }
        const res = await axios({
          url: "http://39.107.88.156:8080/sass_finance/accumulation/update",
          method: "post",
          data: data, 
                headers: {
                    'token': token
                }
        })
        this.getList()
        this.show = false
      },
      async addsubmit() {
        const token = localStorage.getItem("token");
        const data = {
          ...this.userFormData
        }
        const res = await axios({
          url: "http://39.107.88.156:8080/sass_finance/accumulation/add",
          method: "post",
          data: data, 
                headers: {
                    'token': token
                }
        })
        this.getList()
        this.addshow = false
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