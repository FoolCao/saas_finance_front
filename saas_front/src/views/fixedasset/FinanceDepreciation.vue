<template>
    <div style="height: auto; width: auto;">

        <!-- 搜索新增区域 -->
        <el-card>
            <div style="display: flex; flex-direction: row;">
                <!-- 搜索区域 -->
                <div style="flex: 8;">
                    <el-form :inline="true">
                        <el-form-item label="折旧资产名称">
                            <el-input v-model="params.name" placeholder="请输入折旧资产名称"></el-input>
                        </el-form-item>

                        <el-form-item label="折旧方法">
                            <el-select v-model="params.methodId" placeholder="请选择折旧方法" size="medium">
                                <el-option value=""></el-option>
                                <el-option :label="method.depreciationName" :value="method.id" :key="method.id"
                                    v-for="method in methodList" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="折旧资产类型">
                            <el-select v-model="params.typeId" placeholder="请选择折旧资产类型" size="medium">
                                <el-option value=""></el-option>
                                <el-option :label="type.name" :value="type.id" :key="type.id"
                                    v-for="type in typeList"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search" type="primary" icon="el-icon-search">搜索</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </el-card>

        <!-- 折旧明细表 -->
        <el-card style="margin-top: 20px;">

            <el-card>
                <span
                    style="font-size: 16px;font-weight: bold;font-family: 'Times New Roman', Times, serif;">折旧明细表</span>
            </el-card>

            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column prop="depreciationType.name" label="折旧类型"></el-table-column>
                    <el-table-column prop="originalValue" label="原值"></el-table-column>
                    <el-table-column prop="depreciationAmount" label="折旧金额"></el-table-column>
                    <el-table-column prop="statue" label="状态"></el-table-column>
                    <el-table-column label="折旧明细" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showDepreciationDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="折旧明细" :visible.sync="dialogVisible">
                    <el-table :data="depreciationDetails" style="width: 100%">
                        <el-table-column prop="id" label="ID"></el-table-column>
                        <el-table-column prop="depreciationAmount" label="折旧金额"></el-table-column>
                        <el-table-column prop="duringTime" label="折旧时间" width="180">
                            <template slot-scope="scope">
                                {{ new Date(scope.row.duringTime).toLocaleDateString() }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </span>
                </el-dialog>
            </div>

            <!-- 分页组件 -->
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize" style="text-align: center; margin-top: 10px;">
            </el-pagination>
        </el-card>


    </div>
</template>

<script>

import axios from "axios";
import dayjs from "dayjs";
import { Table, TableColumn, Button, Dialog } from 'element-ui'
export default {

    components: { Table, TableColumn, Button, Dialog },
    data() {
        return {
            tableData: [],
            depreciationDetails: [],
            dialogVisible: false,
            params: {
                name: '',
                methodId: '',
                typeId: ''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('http://localhost:8081/depreciation/page')
                .then(response => {
                    this.tableData = response.data.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
        showDepreciationDetails(row) {
            this.depreciationDetails = row.depreciationDetailContentDepreciationDetailContentList
            this.dialogVisible = true
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