<template>
    <div style="height: auto; width: auto;">
        <el-card>
            <div style="display: flex; flex-direction: row;">
                <!-- 搜索区域 -->
                <div style="flex: 8;">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input v-model="params.name" placeholder="请输入资产类别名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="params.number" placeholder="请输入资产类别编码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="params.statue" placeholder="请选择状态">
                                <el-option value=""></el-option>
                                <el-option label="启用" value="启用"></el-option>
                                <el-option label="禁用" value="禁用"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="折旧方法">
                            <el-select v-model="params.methodId" placeholder="请选择折旧方法" size="medium"
                                >
                                <el-option value=""></el-option>
                                <el-option :label="method.depreciationName" :value="method.id" :key="method.id"
                                    v-for="method in methodList" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search" type="primary" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
        <!-- 折旧方法 -->
        <el-card style="margin-top: 20px;">

            <el-card>
                <span
                    style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">资产类别</span>
                <div style="border: 2px; margin-top: 20px;">
                    <el-button type="primary" @click="addopen">新增</el-button>
                    <el-button type="info" plain @click="batchdelete">批量删除</el-button>
                    <el-button type="warning" plain>启用</el-button>
                    <el-button type="danger" plain>禁用</el-button>
                </div>
            </el-card>

            <el-table :data="AssetCategoryMethodList" style="width: 100%" @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="序号" align="center"> </el-table-column>
                <el-table-column prop="number" label="资产类别编码" align="center"> </el-table-column>
                <el-table-column prop="name" label="资产类别名称" align="center"> </el-table-column>
                <el-table-column prop="depreciationMethod.depreciationName" label="折旧方法" align="center">
                </el-table-column>
                <el-table-column prop="depreciationMethod.year" label="预计使用年限" align="center"> </el-table-column>
                <el-table-column prop="depreciationMethod.term" label="使用月份" align="center"> </el-table-column>
                <el-table-column prop="depreciationMethod.yearRate" label="年折旧率" align="center"> </el-table-column>
                <el-table-column prop="depreciationMethod.monthRate" label="每期折旧率" align="center"></el-table-column>
                <el-table-column prop="statue" label="状态" align="center"></el-table-column>
                <el-table-column prop="note" label="备注" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template #default="{ row }">
                        <el-button type="text" size="small" @click="remove(row)">删除</el-button>
                        <el-button type="text" size="small" @click="edit(row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="limit" style="text-align: center; margin-top: 10px;">
            </el-pagination>
        </el-card>

        <!-- 新增弹窗区域 -->
        <el-dialog title="新增资产类别" :visible.sync="addshow" width="600px">
            <el-form :model="formData" class="demo-form-inline" label-width="80px">

                <el-form-item label="资产类别编码" label-width="120px" :rules="[
                        { required: true, message: '请输入资产类别编码', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.number" placeholder="资产类别编码"></el-input>
                </el-form-item>
                <el-form-item label="资产类别名称" label-width="120px" :rules="[
                        { required: true, message: '请输入资产类别名称', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.name" placeholder="资产类别名称"></el-input>
                </el-form-item>
                <el-form-item label="折旧方法">
                    <el-select v-model="formData.methodId" placeholder="选择折旧方法" size="medium">
                        <el-option :label="method.depreciationName" :value="method.id" :key="method.id"
                            v-for="method in methodList" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="100px">
                    <el-radio-group v-model="formData.statue">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" label-width="100px">
                    <el-input type="textarea" v-model="formData.note" placeholder="备注"
                        :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                </el-form-item>

                <!-- 使用 Flex 布局排列按钮 -->
                <el-form-item class="button-group">
                    <el-button @click="addsubmit" type="primary">提交</el-button>
                    <el-button @click="cancel" type="info">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>

        <!-- 修改弹窗区域 -->
        <el-dialog title="修改折旧方法" :visible.sync="updateshow" width="600px">
            <el-form :model="formData" class="demo-form-inline" label-width="80px">

                <el-form-item label="资产类别编码" label-width="120px" :rules="[
                        { required: true, message: '请输入资产类别编码', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.number" placeholder="资产类别编码"></el-input>
                </el-form-item>
                <el-form-item label="资产类别名称" label-width="120px" :rules="[
                        { required: true, message: '请输入资产类别名称', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.name" placeholder="资产类别名称"></el-input>
                </el-form-item>
                <el-form-item label="折旧方法">
                    <el-select v-model="formData.methodId" placeholder="选择折旧方法" size="medium">
                        <el-option value=""></el-option>
                        <el-option :label="method.depreciationName" :value="method.id" :key="method.id"
                            v-for="method in methodList" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="100px">
                    <el-radio-group v-model="formData.statue">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" label-width="100px">
                    <el-input type="textarea" v-model="formData.note" placeholder="备注"
                        :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                </el-form-item>

                <!-- 使用 Flex 布局排列按钮 -->
                <el-form-item class="button-group">
                    <el-button @click="updatesubmit" type="primary">提交</el-button>
                    <el-button @click="cancel" type="info">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script>

import axios from "axios";
import dayjs from "dayjs";
import { Message } from 'element-ui'
export default {
    data() {
        return {
            id: 0,
            formData: {
                number: '',
                name: '',
                methodId: '',
                statue: '',
                note: ''
            },
            params: {
                name: '',
                number: '',
                statue: '',
                // 折旧方法 (搜索)
                methodId: ''
            },
            AssetCategoryMethodList: [],
            depreciationName: '',
            multipleSelection: [],
            // 折旧方法 (查找)
            methodList: [],
            // 分页
            page: 1,
            limit: 5,
            total: 0,
            // 默认关闭弹窗
            addshow: false,
            updateshow: false
        }
    },
    created() {
        this.DepreciationMethodgetList()
        this.getMethod()
    },
    methods: {
        async DepreciationMethodgetList() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/depreciationType/page",
                params: {
                    page: this.page,
                    limit: this.limit,
                    ...this.params
                },
            });
            this.AssetCategoryMethodList = res.data.data
            this.total = res.data.count
            console.log(res.data.data)

        },
        async getMethod() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/depreciationMethod/findAll",
            });
            this.methodList = res.data.data
            console.log(this.methodList)
        },

        // 点击搜索
        search() {
            this.DepreciationMethodgetList()
        },
        cancel() {
            this.updateshow = false
            this.addshow = false
        },
        pagechange(page) {
            // 条件改变
            this.page = page
            // 重新请求数据
            this.DepreciationMethodgetList()
        },
        async addsubmit() {

            const data = {
                ...this.formData
            }
            const res = await axios({
                url: "http://localhost:8081/depreciationType/add",
                method: "post",
                data: data
            })
            this.DepreciationMethodgetList()
            this.addshow = false
        },
        addopen() {
            this.addshow = true
        },
        async remove(row) {
            if (row.statue === '启用') {
                this.$message.warning('不能删除启用项，请先设置为禁用');
            } else {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios({
                        url: "http://localhost:8081/depreciationType/delete/?id=" + row.id,
                        method: "delete",

                    })
                    this.DepreciationMethodgetList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }

        },
        edit(row) {
            this.updateshow = true;
            this.formData.number = row.number
            this.formData.name = row.name
            this.formData.methodId =  row.methodId// 回填折旧方法的 id
            // console.log(this.formData.methodId)
            this.formData.statue = row.statue
            this.formData.note = row.note
            this.id = row.id
        },
        async updatesubmit() {
            const data = {
                id: this.id,
                ...this.formData
            }
            const res = await axios({
                url: "http://localhost:8081/depreciationType/update",
                method: "put",
                data: data
            })
            this.DepreciationMethodgetList()
            this.updateshow = false
        },
        handleSelectionChange(rows) {
            this.multipleSelection = []; // 清空multipleSelection数组

            rows.forEach(row => {
                this.multipleSelection.push(row.id); // 将每行的id加入multipleSelection数组
            });

            console.log(this.multipleSelection); // 输出multipleSelection数组，包含所有选中行的id
        },
        batchdelete() {
            const data = {
                ids: this.multipleSelection,
            }
            console.log(data)
            this.$confirm('此操作将永久删除这些方法(不论方法是否启用!), 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios({
                    url: "http://localhost:8081/depreciationType/delete/batch",
                    method: "delete",
                    data: data,
                })
                this.DepreciationMethodgetList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
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
.row-box {
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-bottom: 8px;
    justify-content: center;
}
</style>