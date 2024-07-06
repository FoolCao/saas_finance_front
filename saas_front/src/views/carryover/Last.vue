<template>
  <div>
    <!-- 搜素和新增区域 -->
    <el-card>
      <div>
        <el-row :gutter="20">
          <!-- 搜索区域 -->
          <el-col :span="23">
            <el-form :inline="true" style="margin-top: 20px;margin-left: 80px;">
              <el-form-item>
                <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="getShouVoucherList()" type="primary" icon="el-icon-search">查询总账</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <el-popover placement="top-start" title="期末转接" width="200" trigger="hover" content="总账为在一定时间范围内对流水的统计">
              <i class="el-icon-info" style="font-size: 24px; margin-top: 25px;" slot="reference"></i>
            </el-popover>


          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="card-container">



      <el-row :gutter="20" class="card-row">
        <el-col :span="80" v-for="(card, index) in cards" :key="index" class="card-col">
          <el-card class="card-demo">
            <div slot="header" class="clearfix">
              <span>{{ card.title }}</span>
            </div>
            <div style="color:#409EFF;margin-top: 80px;margin-left: 70px;font-size:30px;">
              {{ card.content }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- <el-button @click="addCard" class="add-card-btn">添加卡片</el-button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { forEach } from 'lodash';
export default {
  data() {
    return {
      cards: [
        // ... 可以添加更多初始卡片
      ],

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      bookID: localStorage.getItem('bookID'),
    };
  },
  methods: {
    addCard() {
      this.cards.push({ title: `卡片${this.cards.length + 1}`, content: `这是卡片${this.cards.length + 1}的内容` });
    },
    async getShouVoucherList() {
      const token = localStorage.getItem("token");
      this.cards=[];
      console.log(this.value2[0])
      console.log(this.value2[1])
      const res = await axios({
        method: "get",
        url: "http://39.107.88.156:8080/sass_finance/log/getShouVoucherList",
        params: {
          bookID: this.bookID,
          time1: this.value2[0],
          time2: this.value2[1]
        }, 
                headers: {
                    'token': token
                }
      });
      
      var result=res.data.data

      console.log(result)

      for (var i = 0; i < result.length; i++) {
        this.cards.push({ title: result[i].summary
          , content:  result[i].totalAmount
        });
      }
    },
  },
  created() {
    this.getShouVoucherList();
  },

};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.card-row {
  justify-content: space-around;
  /* 使卡片在行内均匀分布 */
}

.card-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-demo {
  /* 直接设置卡片的大小 */
  width: 300px;
  /* 你想要的卡片宽度 */
  max-width: 100%;
  /* 防止卡片过大超出容器 */
  height: 300px;
  /* 高度自适应内容 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影 */
  transition: all 0.3s ease;
  /* 过渡效果 */
  padding: 20px;
  /* 内边距 */
  margin-bottom: 20px;
  /* 垂直间距 */
  background-color: #fff;
  /* 背景色 */
}

.card-demo:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* 悬停时增加阴影 */
  transform: translateY(-2px);
  /* 悬停时稍微向上移动 */
}

.add-card-btn {
  margin-top: 20px;
  /* 与卡片保持一定距离 */
}
</style>