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
                        <el-form-item label="资产品牌">
                            <el-input v-model="params.description" placeholder="请输入资产品牌"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-input v-model="params.statue" placeholder="请输入状态"></el-input>
                        </el-form-item>

                        <el-form-item label="选择时间">
                            <el-date-picker v-model="params.ctime" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
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
                <div style="border: 2px; margin-top: 20px;">
                    <el-button type="primary" @click="addopen">新增</el-button>
                </div>
            </el-card>

            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="description" label="资产品牌"></el-table-column>
                    <el-table-column prop="depreciationType.name" label="折旧类型"></el-table-column>
                    <el-table-column prop="depreciationType.depreciationMethod.depreciationName"
                        label="折旧方法"></el-table-column>
                    <el-table-column prop="originalValue" label="原值"></el-table-column>
                    <el-table-column prop="depreciationAmount" label="折旧金额"></el-table-column>
                    <el-table-column prop="statue" label="状态"></el-table-column>
                    <el-table-column prop="ctime" label="创建时间">

                    </el-table-column>
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
        <!-- 新增弹窗区域 -->
        <el-dialog title="新增折旧明细" :visible.sync="addshow" width="600px">
            <el-form :model="formData" class="demo-form-inline" label-width="80px">

                <el-form-item label="折旧物品名称" label-width="120px" :rules="[
                        { required: true, message: '请输入折旧物品名称', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.name" placeholder="折旧物品名称"></el-input>
                </el-form-item>
                <el-form-item label="状态" label-width="120px" :rules="[
                        { required: true, message: '请输入当前状态', trigger: 'blur' }
                    ]">
                    <el-input type="text" v-model="formData.statue" placeholder="当前状态"></el-input>
                </el-form-item>
                <el-form-item label="原值" label-width="100px">
                    <template>
                        <el-input-number v-model="formData.originalValue" :step="2" step-strictly></el-input-number>
                    </template>
                </el-form-item>
                <el-form-item label="折旧金额" label-width="100px">
                    <template>
                        <el-input-number v-model="formData.depreciationAmount" :step="2"
                            step-strictly></el-input-number>
                    </template>
                </el-form-item>
                <el-form-item label="折旧资产类型" label-width="100px">
                    <el-select v-model="formData.typeId" placeholder="请选择折旧资产类型" size="medium">
                        <el-option value=""></el-option>
                        <el-option :label="type.name" :value="type.id" :key="type.id"
                            v-for="type in typeList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌名称" label-width="100px">
                    <el-input type="textarea" v-model="formData.description" placeholder="品牌名称"
                        :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                </el-form-item>

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
import dayjs from "dayjs";
import moment from 'moment';
import { Table, TableColumn, Button, Dialog } from 'element-ui'

export default {

    components: { Table, TableColumn, Button, Dialog },
    data() {
        return {
            tableData: [{ ctime: '' }],
            depreciationDetails: [],
            dialogVisible: false,
            params: {
                name: '',
                description: '',
                typeId: '',
                statue: '',
                ctime: ''
            },
            formData: {
                name: '',
                statue: '',
                originalValue: '',
                depreciationAmount: '',
                description: '',
                typeId: '',
                bookId: 4
            },
            page: 1,
            limit: 5,
            total: 0,
            addshow: false,
            typeList: [],
            methodList: []
        }
    },
    mounted() {
        this.fetchData()
        this.getType()
    },
    methods: {
        async fetchData() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/depreciation/page",
                params: {
                    page: this.page,
                    limit: this.limit,
                    ...this.params
                },
            });
            this.tableData = res.data.data.map(item => ({
                ...item,
                ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')
            }));

            this.total = res.data.count;
        },
        showDepreciationDetails(row) {
            this.depreciationDetails = row.depreciationDetailContentDepreciationDetailContentList
            this.dialogVisible = true
        },
        async getType() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8081/depreciationType/findAll",
            });
            this.typeList = res.data.data
            this.typeList = this.typeList.filter(type => type.statue !== '禁用');
            console.log(this.typeList)
        },
        // 点击搜索
        search() {
            this.fetchData()
        },
        //时间转换器
        formatDate(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
        async addsubmit() {
            const data = {
                ...this.formData
            }
            const res = await axios({
                url: "http://localhost:8081/depreciation/add",
                method: "post",
                data: data
            })
            this.fetchData()
            this.addshow = false
        },
        addopen() {
            this.addshow = true
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