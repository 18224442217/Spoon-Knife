<template>
  <div>

    <!-- <van-dropdown-menu>
      <van-dropdown-item v-model="value1"
                         :options="开始" />
      <van-dropdown-item v-model="value2"
                         :options="option2" />
    </van-dropdown-menu> -->

    <!-- <van-search v-model="searchForm.name"
                placeholder="请输入优惠券名称"
                @search="search" />

    <van-list
      v-model="searchForm.loading"
      :finished="searchForm.finished"
      finished-text="没有更多了"
      @load="query"
    >
      <van-row>
        <van-col span="8">名称</van-col>
        <van-col span="5">金额</van-col>
        <van-col span="5">库存</van-col>
        <van-col span="6"
                 style="text-align:center">操作</van-col>
      </van-row>
      <van-row v-for="item in list"
               :key="item.id"
               type="flex"
               justify="space-between"
               align="center"
      >
        <van-col span="8"
                 class="name">{{ item.name }}</van-col>
        <van-col span="5">{{ item.cupponMoney }}</van-col>
        <van-col span="5">{{ item.count }}</van-col>
        <van-col span="3"
                 class="btn"

        >
          <span @click="showDetails(item)">查看</span>
        </van-col>
        <van-col span="3"
                 class="btn"
        >
          <span style="color:#ee0a24"
                @click="remove(item)">删除</span>
        </van-col>
      </van-row>
    </van-list> -->

    <!-- <van-popup v-model="isShowDetails"
               position="right"
               style="width:100%;height:100vh" > -->
    <!-- form.name ||  -->
    <van-nav-bar :title="'添加优惠券'"
                 left-text="关闭"
                 right-text="记录"
                 left-arrow
                 @click-right="onClickRight"
                 @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <div class="NamingRules">
        <!-- :rules="[{ required: true, pattern:/^.{4,12}$/,  }]"
        name="优惠券名称"
                 -->
        <van-field v-model="form.name"
                   :rules="[{ required: true, pattern:/^.{4,12}$/,message: '请填写优惠券名称，4-12个字'}]"
                   label="优惠券名称"
                   placeholder="请输入优惠券名称，4-12个字" />
        <div class="RulesRight" >
          <!--  -->
          <van-icon class="RulesRightIcon"
                    name="question-o"
                    @click="RulesClick"
          />
          <!-- v-show="particulars" -->
          <div
            class="cuoponboxRight">
            <div class="active">
              <van-row class="listboxTitle">
                <van-col span="24"
                         class="cupponname color"
                >常见命名方式</van-col>
              </van-row>
              <div style="padding: 10px 0;">
                <div v-for="(item,index) in nameList"
                     :key="index">
                  <li class="listbox">
                    {{ item.title }}{{ item.text }}
                  </li>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="ruleBox">
        <van-field v-model="typeOne"
                   :rules="[{ required: false, message: '请选择优惠券种类' }]"
                   name="id"
                   label="优惠券种类"
                   placeholder="请选择优惠券种类"
                   disabled />
        <span class="ruleBoxTex"
              @click="CouponTypeList">请选择</span>
      </div>

      <van-field name="优惠券金额"
                 label="优惠券金额"
                 placeholder="请输入金额,最大不超过500">
        <template #input>
          <van-stepper v-model="form.cupponMoney"
                       :decimal-length="0"
                       :show-plus="false"
                       :show-minus="false"
                       min="1"
                       max="500"
                       @change="amountChange"
          />
        </template>
      </van-field>
      <van-field name="发券数量"
                 label="发券数量"
                 placeholder="请输入数量,最大不超过9999">
        <template #input>
          <van-stepper v-model="form.count"
                       :decimal-length="0"
                       :show-plus="false"
                       :show-minus="false"
                       min="1"
                       max="9999"
                       @change="amountChangeB" />
        </template>
      </van-field>
      <van-field v-model="form.address"
                 name="使用地址"
                 label="使用地址"
                 disabled
                 placeholder="请输入完整地址，长度为4-20个字" />
      <div class="ruleBox">
        <!--  name="使用规则"  -->
        <van-field v-model="form.useRule"
                   :rules="[{ required: true,pattern: true, pattern:/^.{4,50}$/,message: '请输入使用规则，4-50个字' }]"
                   style="padding: 8px 60px 8px 16px;"
                   class="typeTwo"
                   label="使用规则"
                   placeholder="使用规则，4-50个字" />
        <span class="ruleBoxTex"
              @click="RulesTypeList">请选择</span>
      </div>
      <van-field v-model="form.remarks"
                 :rules="[{pattern:/^.{0,20}$/, message: '请输入备注信息，0-20个字' }]"
                 name="备注"
                 label="备注信息"
                 placeholder="该信息对用户不可见" />
      <!--  message: '请选择时间'  -->
      <van-field v-model="dateString"
                 :rules="[{ required: false,validator:()=>(form.startTime&&form.endTime),}]"
                 readonly
                 clickable
                 name="datetimePicker"
                 label="有效时间"
                 placeholder="点击选择时间"
                 @click="isShowDatePicker = true" />
      <!-- <van-field name="switch"
                   label="状态">
          <template #input>
            <van-switch v-model="form.state"
                        :active-value="1"
                        :inactive-value="0"
                        size="20" />
          </template>
        </van-field> -->
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit"
                    style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0;   font-size:1rem">提 交</van-button>
      </div>
    </van-form>
    <!-- </van-popup> -->

    <van-calendar v-model="isShowDatePicker"
                  :allow-same-day="true"
                  type="range"
                  @confirm="onConfirmDatePicker" />
    <!-- 优惠券规则 -->
    <van-popup v-model="particularsC"
               :style="{ height: 'auto' }"
               position="bottom" >
      <div class="cuoponbox">
        <van-row class="cupponlist">
          <van-col span="24"
                   class="cupponname color"
          >优惠券规则选择</van-col>
        </van-row>
        <div v-for="(item,index) in useList"
             :key="index">
          <van-row class="cupponlist"
                   @click="choiceC(item)">
            <van-col span="24"
                     class="cupponname"
            >{{ item.title }}:<span class="leftText">{{ item.text }}</span></van-col>
          </van-row>

        </div>
      </div>

    </van-popup>
    <!-- 优惠券种类 -->
    <van-popup v-model="particularsB"
               :style="{ height: 'auto' }"
               position="bottom" >
      <div class="cuoponbox">
        <van-row class="cupponlist">
          <van-col span="24"
                   class="cupponname color"
          >优惠券种类选择
          </van-col>
        </van-row>
        <div v-for="(item,index) in ruleList"
             :key="index">
          <van-row class="cupponlist"
                   @click="choice(item)">
            <van-col span="24"
                     class="cupponname"
            >{{ item.title }}:<span class="leftText">{{ item.text }}</span></van-col>
          </van-row>
        </div>
      </div>

    </van-popup>
    <!-- 命名规则弹出层 -->

    <van-popup v-model="showName"
               position="right"
               style="width:100%;height:100%">
      <NamingRules />
      <van-button type="info"
                  style="width:95%;border-radius: 30px;left:2.5%;position: fixed;bottom:10px;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="showName=false">我知道了</van-button>
    </van-popup>

  </div>
</template>

<script>
import couponApi from '@/api/coupon'
import loginApi from '@/api/loginApi'
import Utils from '@/utils/datetime'
import Cache from '@/utils/cache'
import NamingRules from './namingRules.vue'
import cancelsystemApi from '@/api/cancelsystem'

export default {
  components: {
    NamingRules
  },
  data() {
    return {
      showName: false,
      typeTwo: '',
      // 使用规则
      useList: [
        { title: '折扣券,可指定商品打折或全场打折', text: '如男士衬衣全场8折', id: 1 },
        { title: '满减券,设定消费金额，达到消费金额后进行减免', text: '如满100减10元', id: 2 },
        { title: '代金券,无消费金额限制，可指定商品进行抵扣', text: '如剪发20元代金券', id: 3 },
        { title: '赠品券', text: '可商家自定义设定指定赠品', id: 4 },
        { title: '优惠券,无消费金额限制，进行免费赠送优惠劵进行抵扣', text: '如：店铺优惠券5元', id: 5 }
      ],
      // 命名规范
      nameList: [
        { title: '折扣券：', text: '男士衬衣全场8折券' },
        { title: '满减券：', text: '指定饮品满100减10元' },
        { title: '代金券：', text: '剪发20元代金券' },
        { title: '赠品券：', text: '消费满100赠送啤酒2瓶' },
        { title: '优惠劵：', text: '优惠券5元' }
      ],
      typeOne: '',
      // 优惠种类
      ruleList: [
        { title: '折扣券', text: '例如指定商品打九折', id: 1 },
        { title: '满减券', text: '例如全场满100减20元', id: 2 },
        { title: '代金券', text: '例如美团10元代金券', id: 3 },
        { title: '赠品券', text: '例如赠送1听雪碧', id: 4 },
        { title: '优惠券', text: '例如优惠5元券', id: 5 }
      ],
      particularsC: false, // 种类规则
      particularsB: false, // 使用规则
      particulars: false, // 命名规则
      searchForm: {
        page: 1,
        size: 10,
        name: '',
        count: '',
        loading: false,
        finished: true
      },
      list: [],
      isShowDetails: true,
      type: '现金抵扣券',
      isShowDatePicker: false,
      form: {
        startTime: '',
        endTime: '',
        state: 1,
        count: 1,
        cupponMoney: '1',
        address: '',
        type: '',
        useRule: ''
      },
      dateString: '',
      mchId: ''
    }
  },
  computed: {},
  mounted() {
    this.query()
    this.mchId = Cache.getCookie('mchId')
    if (!this.mchId) {
      this.$toast.fail('您不是商家，即将返回首页')
      setTimeout(() => {
        this.$router.push({ name: 'home' })
      }, 3000)
    } else {
      this.queryMerchantInfo()
    }
    // if (Cache.getType() != 1) {
    //   this.$toast.fail('您不是商家，即将返回首页')
    //   setTimeout(() => {
    //     this.$router.push({ name: 'home' })
    //   }, 3000)
    // } else {
    //   this.queryMerchantInfo()
    // }
    cancelsystemApi.querysuer().then(res => {
      this.merchantName = res[0].merchantName
      this.merchantAddress = res[0].merchantAddress
      this.merchantLogo = res[0].merchantLogo
    })
  },
  methods: {
    // 校验总金额不超过5万
    amountChangeB() {
      if (this.form.cupponMoney * this.form.count > 50000) {
        this.$toast('优惠券总价值不得超过5万元，请重新调整')
      }
    },
    amountChange() {
      if (this.form.cupponMoney * this.form.count > 50000) {
        this.$toast('优惠券总价值不得超过5万元，请重新调整')
      }
    },
    // 使用规则
    RulesTypeList() {
      this.particularsC = true
    },
    choiceC(item) {
      this.form.useRule = item.title
      this.particularsC = false
    },
    // 优惠券种类
    CouponTypeList() {
      this.particularsB = true
    },
    choice(item) {
      this.form.type = item.id
      this.typeOne = item.title
      this.particularsB = false
    },
    // 命名规则
    RulesClick() {
      console.log(this.particulars, '==')
      this.showName = true
      // if (this.particulars === true) {
      //   this.particulars = false
      // } else {
      //   this.particulars = true
      // }
    },

    queryMerchantInfo() {
      loginApi.merchantInfo({ id: this.mchId })
        .then((res) => {
          this.form.address = res.address
          console.log(this.form)
        })
    },
    query() {
      const params = {
        page: this.searchForm.page,
        size: this.searchForm.size,
        name: this.searchForm.name
      }
      couponApi.queryCouponByMerchant(params)
        .then(res => {
          console.log(res.data)
          this.searchForm.count = res.count
          this.list.push(...res.data)
          this.searchForm.page++
          this.searchForm.loading = false
          if (this.list.length >= res.count) this.searchForm.finished = true
        })
    },
    search() {
      this.searchForm.page = 1
      this.list = []
      this.query()
    },
    showDetails(val) {
      this.form = val
      this.isShowDetails = true
      this.dateString = `${this.form.startTime.substring(0, 10)} 至 ${this.form.endTime.substring(0, 10)}`
    },
    onClickRight() {
      this.$router.push('/cancelsystem/couponhistory')
    },
    onClickLeft() {
      // this.isShowDetails = false
      this.$router.go(-1)
    },
    remove(val) {
      // await this.couponApi.removeMerchantCoupon({ id: val.id })
      // this.$toast.success('删除成功')
      this.$dialog.confirm({
        message: '请确认是否删除该优惠券'
      }).then(() => {
        return this.couponApi.removeMerchantCoupon({
          id: val.id
        })
      })
    },
    async onSubmit() {
      const {
        name,
        cupponMoney,
        count,
        state,
        startTime,
        endTime,
        address,
        remarks,
        useRule,
        type
      } = this.form
      console.log(startTime)
      const data = {
        name, // 优惠券名称
        cupponMoney, // 优惠券金额
        count, // 优惠券数量
        state, // 优惠券状态
        remarks, //
        startTime: (new Date(startTime.replace(/-/g, '/').substring(0, 10)).getTime()).toString(),
        endTime: (new Date(endTime.replace(/-/g, '/').substring(0, 10)).getTime() + (24 * 60 * 60 * 1000) - 1)
          .toString(),
        address, // 商家地址
        useRule, // 使用规则
        type // 卡券种类
      }
      if (!this.form.name) {
        this.$toast('请输入优惠名称')
        return
      }
      if (!this.typeOne) {
        this.$toast('请选择优惠券种类')
        return
      }
      if (data.cupponMoney * data.count > 50000) {
        this.$toast('优惠券总价值不得超过5万元，请重新调整')
        return
      }
      if (!this.form.useRule) {
        this.$toast('请选择优惠券使用规则')
        return
      }
      if (!this.dateString) {
        this.$toast('请选择有效时间')
        return
      }
      if (this.form.id) {
        data.id = this.form.id
        const res = await couponApi.updateMerchantCoupon(data)
        console.log(res)
        this.$toast.success('更新成功')
      } else {
        console.log(data, '======')
        await couponApi.addmerchantCoupon(data)
        console.log(data)
        this.$toast.success('新增成功')
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      }
      this.query()
      this.isShowDetails = false
    },
    onConfirmDatePicker(val) {
      this.form.startTime = Utils.formatDate(val[0])
      this.form.endTime = Utils.formatDate(val[1])
      this.dateString = `${this.form.startTime.substring(0, 10)} 至 ${this.form.endTime.substring(0, 10)}`
      this.isShowDatePicker = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__right .van-nav-bar__text{
  color: #B019A5;
}
.wzdl {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .leftText{
    margin-left: 10px;
  }
  .listboxTitle{
    color: #4c4c4c;
  }
  .listbox{
    font-size: .8rem;
    color: #8E8E8E;
    padding: 10px 20px;
  }
  .ruleBoxTex{
    position:absolute;
    right: 30px;
    top: 26px;
    font-size: .8rem;
    color: #B019A5;
    background: white;
    padding:0 10px;
  }
  .ruleBox{
    position: relative;
  }
  .cuoponboxRight{
    background: #fff;
    border:1px solid #eee;
    box-shadow: darkgrey 10px 10px 30px 5px ;
    margin-top: 1.5rem;
    padding:0 0 10px 0;
    display: none;
  }
  .RulesRightIcon{
    position: absolute;
    right: 30px;
    font-size: 1rem;
    color: #8E8E8E;
  }
  // .RulesRight:hover .cuoponboxRight{
  //   display: block;
  // }
  .active::before {
    content: "";
    width: 0;
    height: 0;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #757575;
    border-left: 20px solid transparent;
    border-bottom-color: white;
    position: absolute;
    top: 0;
    right: 23px;
    margin-top:-20px;
  }
  .active{
    position: relative;
  }
  .RulesRight{
    position: relative;
    position: absolute;
    width: auto;
    right: 30px;
    top: 35px;
    z-index: 6;

  }
  .NamingRules{
    position: relative;
  }
  .cupponname{
    font-size: .9rem;
  }
  .cupponname.color{
    color: black;
    font-size: 1rem;
  }
  .cupponlist{
    color:#4c4c4c;
  }
  .cuoponbox{
    width: 90%;
    margin: 0 auto;
  }
  .van-row {
    font-size: 38px;
    padding: 30px 20px;
    border-bottom: 1px solid #eee;

    .name {
      flex-basis: 33%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .btn {
      color: #B019A5;

    }
  }

  /deep/ .van-stepper__input {
    width: 100%;
    background: none;
    text-align: left;
  }
</style>
