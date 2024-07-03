<template>
    <el-card>
        <el-card>
            <span style="font-size: 16px;font-weight: bold;">资产负债表</span>
        </el-card>
        <div>
            <el-row :gutter="20" style="margin-top: 20px;">
                <el-col :span="12">
                    <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    
                    <el-button @click="search()" type="primary" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
                    
                    <h2 style="margin-top: 20px;font-weight: bold;">资 产</h2>
                    <el-table :data="currentAssets" style="width: 100%">
                        <el-table-column prop="name" label="项目" width="180"></el-table-column>
                        <el-table-column prop="endingBalance" label="期末余额" width="180"></el-table-column>
                        <el-table-column prop="beginningBalance" label="期初余额" width="180"></el-table-column>
                    </el-table>
                    <el-table :data="noncurrentAssets" style="width: 100%">
                        <el-table-column prop="name" label="项目" width="180"></el-table-column>
                        <el-table-column prop="endingBalance" label="期末余额" width="180"></el-table-column>
                        <el-table-column prop="beginningBalance" label="期初余额" width="180"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12">
                    <h2 style="margin-top: 60px;font-weight: bold;">负债及所有者权益</h2>
                    <el-table :data="currentLiabilities" style="width: 100%">
                        <el-table-column prop="name" label="项目" width="180"></el-table-column>
                        <el-table-column prop="endingBalance" label="期末余额" width="180"></el-table-column>
                        <el-table-column prop="beginningBalance" label="期初余额" width="180"></el-table-column>
                    </el-table>
                    <el-table :data="noncurrentLiabilities" style="width: 100%">
                        <el-table-column prop="name" label="项目" width="180"></el-table-column>
                        <el-table-column prop="endingBalance" label="期末余额" width="180"></el-table-column>
                        <el-table-column prop="beginningBalance" label="期初余额" width="180"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import '@fortawesome/fontawesome-free/css/all.css';
import { Row } from "element-ui";
import { Message } from 'element-ui'
export default {
    data() {
        return {
            //时间
            value1: '',
            assets: [
                { name: '资产总计', endingBalance: '', beginningBalance: '' }
            ],
            equityAndLiabilities: [
                { name: '负债和所有者权益(或股东权益)总计', endingBalance: '', beginningBalance: '' }
            ],
            currentAssets: [
                { name: '货币资金', endingBalance: '', beginningBalance: '' },
                { name: '交易性金融资产', endingBalance: '', beginningBalance: '' },
                { name: '应收票据及应收账款', endingBalance: '', beginningBalance: '' },
                { name: '预付款项', endingBalance: '', beginningBalance: '' },
                { name: '其他流动资产', endingBalance: '', beginningBalance: '' },
                { name: '存货', endingBalance: '', beginningBalance: '' },
                { name: '合同资产', endingBalance: '', beginningBalance: '' },
                { name: '持有待售资产', endingBalance: '', beginningBalance: '' },
                { name: '一年内到期的非流动资产', endingBalance: '', beginningBalance: '' },
                { name: '其他流动资产', endingBalance: '', beginningBalance: '' },
                { name: '流动资产合计', endingBalance: '', beginningBalance: '' }
            ],
            currentLiabilities: [
                { name: '短期借款', endingBalance: '', beginningBalance: '' },
                { name: '交易性金融负债', endingBalance: '', beginningBalance: '' },
                { name: '应付票据及应付账款', endingBalance: '', beginningBalance: '' },
                { name: '预收款项', endingBalance: '', beginningBalance: '' },
                { name: '其他流动负债', endingBalance: '', beginningBalance: '' },
                { name: '应付职工薪酬', endingBalance: '', beginningBalance: '' },
                { name: '应交税费', endingBalance: '', beginningBalance: '' },
                { name: '其他应付款', endingBalance: '', beginningBalance: '' },
                { name: '持有待售负债', endingBalance: '', beginningBalance: '' },
                { name: '一年内到期的非流动负债', endingBalance: '', beginningBalance: '' },
                { name: '其他流动负债', endingBalance: '', beginningBalance: '' },
                { name: '流动负债合计', endingBalance: '', beginningBalance: '' }
            ],
            noncurrentAssets: [
                { name: '债权投资', endingBalance: '', beginningBalance: '' },
                { name: '其他债权投资', endingBalance: '', beginningBalance: '' },
                { name: '长期应收款', endingBalance: '', beginningBalance: '' },
                { name: '长期股权投资', endingBalance: '', beginningBalance: '' },
                { name: '其他权益工具投资', endingBalance: '', beginningBalance: '' },
                { name: '投资性房地产', endingBalance: '', beginningBalance: '' },
                { name: '固定资产', endingBalance: '', beginningBalance: '' },
                { name: '在建工程', endingBalance: '', beginningBalance: '' },
                { name: '生产性生物资产', endingBalance: '', beginningBalance: '' },
                { name: '无形资产', endingBalance: '', beginningBalance: '' },
                { name: '开发支出', endingBalance: '', beginningBalance: '' },
                { name: '商誉', endingBalance: '', beginningBalance: '' },
                { name: '长期待摊费用', endingBalance: '', beginningBalance: '' },
                { name: '递延所得税资产', endingBalance: '', beginningBalance: '' },
                { name: '其他非流动资产', endingBalance: '', beginningBalance: '' },
                { name: '非流动资产合计', endingBalance: '', beginningBalance: '' }
            ],
            noncurrentLiabilities: [
                { name: '长期借款', endingBalance: '', beginningBalance: '' },
                { name: '应付债券', endingBalance: '', beginningBalance: '' },
                { name: '长期应付款', endingBalance: '', beginningBalance: '' },
                { name: '预计负债', endingBalance: '', beginningBalance: '' },
                { name: '递延收益', endingBalance: '', beginningBalance: '' },
                { name: '递延所得税负债', endingBalance: '', beginningBalance: '' },
                { name: '其他非流动负债', endingBalance: '', beginningBalance: '' },
                { name: '非流动负债合计', endingBalance: '', beginningBalance: '' }
            ],
        };
    },
    created() {
        this.getList()
    },
    methods: {
        // 点击搜索
        search() {
            this.getList()
        },
        async getList() {
            axios.get('http://localhost:8081/salary/SelectTotalSalary', {
                params: {
                    time1: this.value1[0],
                    time2: this.value1[1],
                }
                })
                .then(response => {
                    // 将 totalSalary 更新到 currentLiabilities 数组中
                    const index = this.currentLiabilities.findIndex(item => item.name === '应付职工薪酬');
                    
                    if (index !== -1) {
                        this.currentLiabilities[index].endingBalance = response.data.data.totalSalary;
                    }
                    console.log(this.currentLiabilities);
                })
                .catch(error => {
                    console.error('Error:', error);
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