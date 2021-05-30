<template>
  <div ref="toptop"
       class="home">
    <div class="top">
      <img :src="imgtop"
           alt=""
           style="width:100%">
    </div>

    <div class="border" />

    <div class="box">
      <div class="form">
        <!-- <van-row>
        <van-col span="5"
                 class="title">资料填写</van-col>
        <van-col span="18"
                 class="title-msg">店铺名称和主营类目审核通过后无法修改</van-col>
      </van-row> -->
        <van-row class="form-list">
          <van-col span="7"
                   class="left">
            <span style="color:#f00">*</span>
            店铺类型
          </van-col>
          <van-col span="7"
                   class="right">
            <span style="color:#515151"
                  @click="shop">
              {{ shoptype }}
            </span>
            <van-popup v-model="showPicker"
                       round
                       position="bottom">
              <van-picker :columns="columns"
                          show-toolbar
                          @cancel="showPicker = false"
                          @confirm="onConfirm" />
            </van-popup>
          </van-col>
          <van-col span="4">
            <van-icon name="arrow"
                      size="14"
                      class="icon"
                      color="#515151"
                      @click="shop" />
          </van-col>
          <van-col span="6">
            <span style="color :#AD0EA2"
                  class="fwzzmsg"
                  @click="dplxsm">店铺类型说明</span>
          </van-col>
        </van-row>
        <van-divider />

        <van-row class="form-list">
          <van-col span="7"
                   class="left">
            <span style="color:#f00">*</span>

            主营分类
          </van-col>
          <van-col span="7"
                   class="right">
            <span style="color:#515151"
                  @click="Themain">
              {{ Themaintype }}
            </span>

            <van-popup v-model="Themainshow"
                       :close-on-click-overlay="false"
                       round
                       position="bottom">
              <van-picker :columns="Themainlist"
                          show-toolbar
                          @cancel="themainshow"
                          @confirm="onConfirm1" />
            </van-popup>
          </van-col>
          <van-col span="4">
            <van-icon name="arrow"
                      size="14"
                      class="icon"
                      color="#515151"
                      @click="Themain" />
          </van-col>
        </van-row>
        <van-divider />

        <van-row class="form-list">
          <van-col span="7"
                   class="left">
            <span style="color:#f00">*</span>

            二级分类
          </van-col>
          <van-col span="7"
                   class="right">
            <span style="color:#515151"
                  @click="reclassify">
              {{ reclassifytype }}
            </span>
            <van-popup v-model="reclassifyshow"
                       :close-on-click-overlay="false"
                       round
                       position="bottom">
              <van-picker :columns="reclassifylist"
                          show-toolbar
                          @cancel="Reclassifyshow"
                          @confirm="onConfirm2" />
            </van-popup>
          </van-col>
          <van-col span="4">
            <van-icon name="arrow"
                      size="14"
                      class="icon"
                      color="#515151"
                      @click="reclassify" />
          </van-col>
          <van-col span="6">
            <span style="color :#AD0EA2"
                  class="fwzzmsg"
                  @click="fwzzsm">服务资质说明</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="border" />
    <div class="box1">
      <div class="info"/>
      <div class="info">

        <van-field v-model="username"

                   name="姓名"
                   label="联系人"
                   required
                   placeholder="请填写真实的姓名"
                   class="fontsize"
                   @blur="name" />
        <van-field v-model="tel"
                   type="tel"
                   label="电话号码"
                   required
                   class="fontsize"
                   placeholder="请填写真实有效的电话号码"
                   @blur="phoneup" />
        <van-field v-model="account.smsCode"
                   type="applicantNumberber"
                   label="验证码"
                   required
                   placeholder="请输入验证码"
                   class="fontsize1">
          <template #button>
            <van-button :disabled="isShowTimeCountDown"
                        style="border:0"
                        size="small"
                        color="none"
                        type="default"
                        @click="sendCode">
              <van-count-down v-show="isShowTimeCountDown"
                              ref="timeCountDown"
                              :time="CountDownTime"
                              style="color: #AD0EA2"
                              format="ss"
                              @finish="isShowTimeCountDown=false" />
              <span v-show="!isShowTimeCountDown"
                    class="codespan">
                发送验证码
              </span>
            </van-button>
          </template>
        </van-field>

        <van-field v-model="inviter"
                   name="邀请人"
                   class="fontsize"
                   label="邀请人"
                   maxlength="11"
                   placeholder="请填写邀请人手机号，如没邀请人可不填写" />
      </div>
    </div>
    <div class="border" />
    <div class="userinfo">
      <!-- <van-row class="mtz">
        <van-col span="6">门头照</van-col>
        <van-col span="15"
                 style="color:#ccc">牌匾需要清晰完整反应真实门脸</van-col>
        <van-col span="2"
                 style="color:#AD0EA2">示例</van-col>
      </van-row>
      <div class="upload">
        <van-uploader v-model="fileList2"
                      :after-read="afterread2"
                      :before-delete="delimg2"
                      :max-count="1"
                      :max-size="1024 * 1024 * 10"
                      image-fit="contain"
                      @oversize="onOversize">
          <img src="../../assets/img/xiangji.png"
               alt=""
               class="xiangji">

        </van-uploader>
      </div> -->

      <van-form @submit="onSubmit">
        <van-row class="mtz1">
          <van-col span="7"><span style="color:#606060">上传店铺logo </span></van-col>
          <van-col span="15"
                   style="color:#ccc">请选择正确清晰的店铺logo</van-col>
          <van-col span="2"
                   style="color:#AD0EA2"
                   @click="sl4=true">示例</van-col>
        </van-row>
        <div class="upload">
          <van-uploader v-model="fileList4"
                        :max-count="1"
                        :after-read="afterread4"
                        :max-size="1024 * 1024 * 10"
                        :before-delete="delimg4"
                        image-fit="contain"
                        @oversize="onOversize">
            <img src="../../assets/img/xiangji.png"
                 alt=""
                 class="xiangji">
          </van-uploader>
        </div>
        <van-field v-model="shopname"
                   name="店 铺"
                   label="店铺名称"
                   required
                   placeholder="请填写你的店铺名字"
                   class="shopname"
                   maxlength="10"
                   @blur="sensitive">
          <template #button>
            <span style="color:#AD0EA2"
                  class="namegf"
                  @click="namegf">店铺命名规范</span>

          </template>
        </van-field>

        <!-- <van-field
          :value="value"
          readonly
          clickable
          class="fontsize"
          name="area"
          label="店铺地址"
          placeholder="点击选择省市区"
          @click="showArea = true"
        /> -->
        <van-field v-if="map111"
                   v-model="detailed"
                   :readonly="true"
                   rows="1"
                   autosize
                   class="fontsize scrollTop"
                   required
                   right-icon="location-o"
                   label="店铺地址"
                   type="textarea"
                   placeholder="请点击定位选择详细地址"
                   @click="rightclick" />

        <van-field v-model="mapsaddress"
                   name="店 铺"
                   label="详细地址"
                   placeholder="请补充到门牌号的详细地址，非必填"
                   class="shopname"
                   maxlength="10"
                   @blur="alladdress" />
      </van-form>
    </div>
    <div class="border" />
    <div class="uploading">
      <div class="uploading-box">
        <div class="uploading-title">
          <!-- 证件上传<span class="uploading-msg">请注意字迹清晰可见，边框完整</span> -->
        </div>

        <van-row class="mtz">
          <van-col span="8"><span style="color:#f00">*</span><span style="color:#606060">法人身份证照片</span> </van-col>
          <!-- <van-col span="14"
                   style="color:#ccc">为人像面照片，需清晰完整无遮挡</van-col> -->
          <van-col span="14"
                   style="color:#ccc">身份证照片，需清晰完整无遮挡</van-col>
          <van-col span="2"
                   style="color:#AD0EA2"
                   @click="sl1=true">示例</van-col>
        </van-row>
        <div style="display: flex;justify-content: space-between;padding:10px 0;">
          <div class="upload two">
            <span class="positive"
                  style="color:#606060">正面</span>
            <van-uploader v-model="fileList"
                          :max-count="1"
                          :after-read="afterread"
                          :max-size="1024 * 1024 * 10"
                          :before-delete="delimg"
                          image-fit="contain"
                          @oversize="onOversize">
              <img src="../../assets/img/xiangji.png"
                   alt=""
                   class="xiangji">
            </van-uploader>
          </div>
          <div class="upload two">
            <span class="positive"
                  style="color:#606060">反面</span>
            <van-uploader v-model="fileList1"
                          :max-count="1"
                          :after-read="afterread1"
                          :before-delete="delimg1"
                          :max-size="1024 * 1024 * 10"
                          image-fit="contain"
                          @oversize="onOversize"> <img
                            src="../../assets/img/xiangji.png"
                            alt=""
                            class="xiangji"></van-uploader>
          </div>
        </div>
        <div style="padding:0 10px ;">
          <van-field v-model="applicantName"
                     label="姓名"
                     required
                     placeholder="请填写真实的姓名"
                     class="fontsize"
                     @blur="applicant" />
          <van-field v-model="applicantNumber"
                     type="applicantNumberber"
                     label="身份证号"
                     required
                     class="fontsize"
                     placeholder="请填写真实有效的身份证号"
                     @blur="applicantN" />
          <van-field v-model="applicantAddress"
                     label="身份证地址"
                     required
                     placeholder="请填写身份证地址"
                     class="fontsize"
                     @blur="applicantA" />
          <!-- <div class="dataBox">
            <div class="dataBox-One">
              <span style="color:#ee0a24;font-size: 0.875rem;">*</span>
              身份证地址
            </div>
            <div class="dataBox-Two">
              <span>
                {{address?address:'地址'}}
              </span>
            </div>
          </div> -->
          <div class="dataBox">
            <div class="dataBox-One">
              <span style="color:#ee0a24;font-size: 0.875rem;">*</span>
              <span style="color:#606060">有效期</span>
            </div>
            <div class="dataBox-Two">
              <!-- <span @click="startDate">
                {{start_date?start_date||formatDate:'请选择起始时间'}}
                <van-field v-model="start_date" type="text" placeholder="起"
                class="textCenter"
                />
              </span> -->
              <!-- #F5F6F7 -->
              <!-- <span style="text-align: center;color: #333;">—</span> -->
              <span @click="endDate">
                <!-- {{ endTime?endTime||formatDate:'请选择到期时间' }} -->
                {{ endTime?endTime:'请选择身份证到期时间' }}
                <!-- <van-field v-model="end_date" type="text" placeholder="至"
                class="textCenter"
                /> -->
              </span>
            </div>
          </div>
        </div>
        <!-- 身份证日期选择 -->
        <van-popup v-model="dateSelection"
                   :style="{ height: '55%' }"
                   position="bottom"
                   round
                   class="slpopup">
          <van-datetime-picker v-model="currentDate"
                               type="date"
                               @change="changeFn()"
                               @confirm="confirmFn()"
                               @cancel="cancelFn()" />
        </van-popup>

        <!-- <van-row class="mtz">
          <van-col span="8"><span style="color:#f00">*</span>法人身份证国徽照片</van-col>
          <van-col span="14"
                   style="color:#ccc">为国徽面照片，需清晰完整无遮挡</van-col>
          <van-col span="2"
                   style="color:#AD0EA2"
                   @click="sl2=true">示例</van-col>
        </van-row>
        <div class="upload">
          <van-uploader v-model="fileList1"
                        :max-count="1"
                        :after-read="afterread1"
                        :before-delete="delimg1"
                        :max-size="1024 * 1024 * 10"
                        image-fit="contain"
                        @oversize="onOversize"> <img
                          src="../../assets/img/xiangji.png"
                          alt=""
                          class="xiangji"></van-uploader>
        </div> -->
        <!-- <van-row class="mtz">
          <van-col span="8"><span style="color:#f00">*</span>营业执照</van-col>
          <van-col span="14"
                   style="color:#ccc">需文字清晰，边框完整</van-col>
          <van-col span="2"
                   style="color:#AD0EA2"
                   @click="sl3=true">示例</van-col>
        </van-row>
        <div class="upload">
          <van-uploader v-model="fileList2"
                        :after-read="afterread2"
                        :before-delete="delimg2"
                        :max-count="1"
                        :max-size="1024 * 1024 * 10"
                        image-fit="contain"
                        @oversize="onOversize">
            <img src="../../assets/img/xiangji.png"
                 alt=""
                 class="xiangji">

          </van-uploader>
        </div> -->
        <div v-for="(item,index) in certification"
             :key="index">
          <van-row class="mtz">
            <van-col span="7"><span style="color:#f00">*</span><span style="color:#606060">{{ item.name }}</span> </van-col>
            <van-col span="15"
                     style="color:#ccc">需文字清晰，边框完整</van-col>
          </van-row>
          <div class="upload">
            <van-uploader v-model="fileList3[index]"
                          :max-count="1"
                          :after-read="afterread3"
                          :max-size="1024 * 1024 * 10"
                          image-fit="contain"
                          @delete="delimg3(index)"
                          @oversize="onOversize">
              <img src="../../assets/img/xiangji.png"
                   alt=""
                   class="xiangji">
            </van-uploader>
          </div>

        </div>

      </div>
    </div>
    <div class="border" />
    <div class="uploading">
      <div class="uploading-box">
        <div class="uploading-title">
          <!-- 证件上传<span class="uploading-msg">请注意字迹清晰可见，边框完整</span> -->
        </div>
        <van-row class="mtz">
          <van-col span="8"><span style="color:#f00">*</span><span style="color:#606060">营业执照</span></van-col>
          <van-col span="14"
                   style="color:#ccc">需文字清晰，边框完整</van-col>
          <van-col span="2"
                   style="color:#AD0EA2"
                   @click="sl3=true">示例</van-col>
        </van-row>
        <div class="upload">
          <van-uploader v-model="fileList2"
                        :after-read="afterread2"
                        :before-delete="delimg2"
                        :max-count="1"
                        :max-size="1024 * 1024 * 10"
                        image-fit="contain"
                        @oversize="onOversize">
            <img src="../../assets/img/xiangji.png"
                 alt=""
                 class="xiangji">

          </van-uploader>
        </div>
      </div>
    </div>

    <div class="border" />

    <div class="footer">
      <div class="checked">
        <van-checkbox v-model="checked"
                      icon-size="16px"
                      checked-color="#A70B9C"
                      @change="checked1" />
        <div style="color:#9E9E9E">我已经阅读并同意<span class="rzxy"
                                                 @click="protocol">《和生活平台合作协议》</span></div>
      </div>
      <div v-if="!uploadstate"
           style="margin:0 16px;">
        <van-button :disabled="submituserinfo"
                    round
                    block
                    type="info"
                    style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                    native-type="submit"
                    @click="onSubmit">立即申请入驻
        </van-button>
      </div>
      <div v-if="uploadstate"
           style="margin:0 16px;">
        <van-list v-model="loading"
                  :finished="finished"
                  class="showload"
                  style="background: #AD0EA2;border:#AD0EA2"
                  finished-text="没有更多了"
                  loading-text="上传中……"
        />
      </div>
    </div>
    <div><img src=".././../assets/img/footermsg.png"
              alt=""
              class="footermsg"></div>
    <!-- 地址选择 -->
    <van-popup v-model="showArea"
               position="bottom">
      <van-area :area-list="areaList"
                @confirm="site"
                @cancel="showArea = false" />
    </van-popup>
    <!-- 协议弹窗 -->

    <van-popup v-model="show"
               position="right"
               style="width:100%;height:100%">
      <Msg />
      <van-button round
                  type="info"
                  class="wzdl"
                  style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="show=false">我知道了</van-button>
    </van-popup>

    <!-- 提交弹窗 -->
    <van-popup v-model="submit"
               :style="{ height: '100%'}"
               position="bottom"
               round
               class="submit">
      <img src="../../assets/img/submit.png"
           alt=""
           style="width:100%;margin-top:50px;">
           <!-- <van-button type="info" style="width:95%;border-radius: 10px" class="jump" @click="jump"color="color:#AD0EA2">我知道了</van-button> -->
    </van-popup>
    <!-- 资质说明证明 -->

    <van-popup v-model="zzsm"
               position="right"
               style="width:100%;height:100%">
      <div class="wzdlb">
        <ZZzm @know="IKnow" />
        <van-button round
                    type="info"
                    class="wzdls"
                    size="normal"
                    style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                    @click="zzsm=false">我知道了</van-button>
      </div>
    </van-popup>

    <van-popup v-model="dplx"
               position="right"
               style="width:100%;height:100%">
      <Dplx @know="IKnow" />
      <van-button round
                  type="info"
                  class="wzdls"
                  size="normal"
                  style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="dplx=false">我知道了</van-button>
    </van-popup>

    <van-popup v-model="namedialog"
               position="right"
               style="width:100%;height:100%">
      <Namegf />
      <van-button round
                  size="normal"
                  type="info"
                  class="wzdls"
                  style="background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="namedialog=false">我知道了</van-button>
    </van-popup>

    <van-popup v-model="map"
               position="top"
               class="mapfiex"
               style="width:100%;height:100%">
      <Map @func="getMsgFormSon" />
    </van-popup>

    <van-popup v-model="sl1"
               :style="{ height: 'auto' }"
               round
               position="bottom"
               class="slpopup">
      <p> 示例图片</p>
      <!-- <p> 法人身份证人像照片</p>
      <p style="color:#ccc"> 为人像面照片，需清晰完整无遮挡</p> -->
      <p> 法人身份证照片</p>
      <p style="color:#ccc"> 照片需清晰完整无遮挡</p>
      <div style="height: 180px;">
        <div class="imgList">
          <div><img src="../../assets/img/idcardtx.png"
                    alt=""></div>
          <div><img src="../../assets/img/idcardgh.png"
                    alt=""></div>
        </div>
      </div>

      <van-button type="info"
                  class="knowClisk"
                  style="width:95%;border-radius: 25px;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="sl1=false">我知道了</van-button>
    </van-popup>
    <van-popup v-model="sl2"
               :style="{ height: 'auto' }"
               round
               position="bottom"
               class="slpopup">
      <p> 示例图片</p>
      <p> 法人身份证国徽照片</p>
      <p style="color:#ccc"> 为国徽面照片，需清晰完整无遮挡</p>
      <img src="../../assets/img/idcardgh.png"
           alt=""
           style="width:80%">
      <van-button type="info"
                  style="width:95%;border-radius: 25px;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="sl2=false">我知道了</van-button>
    </van-popup>
    <van-popup v-model="sl3"
               :style="{ height: 'auto' }"
               position="bottom"
               round
               class="slpopup">
      <p> 示例图片</p>
      <p> 营业执照</p>
      <p style="color:#ccc"> 需文字清晰，边框完整</p>
      <img src="../../assets/img/yxzz.png"
           alt=""
           style="width:80%">
      <van-button type="info"
                  style="width:95%;border-radius: 25px;margin-bottom: 10px;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="sl3=false">我知道了</van-button>
    </van-popup>
    <van-popup v-model="sl4"
               :style="{ height: 'auto' }"
               position="bottom"
               round
               class="slpopup">
      <p> 示例图片</p>
      <p> 店铺logo</p>
      <p style="color:#ccc"> 图片清晰，正确的图片</p>
      <img src="../../assets/img/logo.png"
           alt=""
           style="width:50%">
      <van-button type="info"
                  style="width:95%;border-radius: 25px;margin-bottom: 10px;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0"
                  @click="sl4=false">我知道了</van-button>
    </van-popup>
    <!-- <Map v-if="showmap"
         class="kjmap"
         @func="getMsgFormSon"/> -->
    <!--    <van-popup v-model="showlo" closeable close-icon="close" position="top" :style="{ height: '30%'}" class="showlob">
      <van-list class="showload" v-model="loading" :finished="finished" finished-text="没有更多了" @load=""
        loading-text="上传中……"></van-list>
    </van-popup> -->
    <van-popup v-model="underReview"
               position="right"
               style="width:100%;height:100%">
      <!-- <van-icon class="lefticon"
                name="arrow-left" /> -->
      <div class="have-in-hand">
        <img src="../../assets/img/success.png"
             alt=""
             style="width:45%;margin-top:50px;">
        <p>当前正在审核中，请耐心等待！</p>
      </div>

    </van-popup>

    <van-popup v-model="failToExamine"
               position="right"
               style="width:100%;height:100%;">
      <!-- <van-icon class="lefticon"
                name="arrow-left" /> -->
      <div class="have-in-hand">
        <img src="../../assets/img/fail.png"
             alt=""
             style="width:45%;margin-top:50px;">
        <p>由于您的<a>{{ remarks?remarks:'提交审核信息有误' }}</a> 的原因，您的商家入驻审核不通过，请修改内容
          <span class="mytext"
                @click="SettleIn">重新申请入驻</span>
        </p>
      </div>

    </van-popup>
    <van-popup v-model="introducePopup"
               position="right"
               style="width:100%;">
      <div class="introduceBox">
        <div class="introduceBoxOne">
          <img src="../../assets/img/js0.jpg">
        </div>
        <van-tabs v-model="active">
          <van-tab><img class="img"
                        src="../../assets/img/js1.jpg"></van-tab>
          <van-tab><img class="img"
                        src="../../assets/img/js2.jpg"></van-tab>
          <van-tab><img class="img"
                        src="../../assets/img/js3.jpg"></van-tab>
          <van-tab><img class="img"
                        src="../../assets/img/js4.jpg"></van-tab>
        </van-tabs>

        <!-- <van-button type="info"
                    style="width:95%;position: fixed;bottom:10px;left:2.5%;background: linear-gradient(0deg,#a70b9c, #ce48c4);border:0;border-radius: 30px;"
                    @click="introducePopup=false">我知道了</van-button> -->
      </div>
    </van-popup>

  </div>
</template>

<script>
import merchantenterApi from '@/api/merchantenter'
import area from '@/utils/area'
import Msg from './msg.vue'
import ZZzm from './zzzm.vue'
import Dplx from './dplx.vue'
import Namegf from './namegf.vue'
import Map from './mapp.vue'
import loginApi from '@/api/loginApi'
import { formatDate } from '@/assets/js/utils'
import cancelsystemApi from '@/api/cancelsystem'
export default {
  // 过滤
  filters: {
    formatDate(time) {
      time = time * 1000
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  components: {
    Msg,
    ZZzm,
    Dplx,
    Namegf,
    Map
  },
  data() {
    return {
      active: 1,
      introducePopup: true, // 入驻介绍
      remarks: '', // 拒绝原因
      failToExamine: false, // 失败审核
      underReview: false, // 审核中
      uploadstate: false,
      showlo: true,
      loading: true,
      finished: false,
      CountDownTime: 60000,
      account: {
        phone: '',
        smsCode: '',
        smsKey: ''
      },
      isShowTimeCountDown: false,
      value: '',
      shopname: '',
      logo: '',
      detailed: '',
      inviter: '',
      username: '',

      applicantName: '', // 身份证姓名
      applicantNumber: '', // 身份证号
      applicantAddress: '', // 身份证地址
      start_date: '', // 身份证有效期起
      endTime: '', // 身份证有效期至
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      changeDate: new Date(),
      dateSelection: false, // 身份证有效日期弹窗
      dataType: 1,

      tel: '',
      checked: false,
      columns: [{
        text: '个人工商户',
        value: 0,
        type: 1,
        children: [{
          text: '个人工商户'
        }]
      },
      {
        text: '普通企业',
        value: 1,
        type: 2,
        children: [{
          text: '普通店',
          value: 1,
          type: 2
        }, {
          text: '旗舰店'
        }, {
          text: '专卖店'
        }, {
          text: '专营店'
        }]
      }
      ],
      Themainlist: [],
      reclassifylist: [],
      showPicker: false,
      Themainshow: false,
      reclassifyshow: false,
      showArea: false,
      areaList: area,
      shoptype: '请选择',
      Themaintype: '请选择',
      reclassifytype: '请选择',
      fileList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      merchantClassificationId: '',
      certification: [],
      imglist3: [],
      show: false,
      submit: false,
      zzsm: false,
      namedialog: false,
      radio: '2',
      type: null,
      acttype: null,
      map: false,
      submituserinfo: true,
      sl1: false,
      sl2: false,
      sl3: false,
      sl4: false,
      imgtop: require('../../assets/img/top1.png'),
      showmap: false,
      map111: true,
      dplx: false,
      mapsaddress: '',
      systemTime: ''
    }
  },

  created() {
    if (this.$route.query.data) {
      this.detailed = this.$route.query.data.mapname
      this.lat = this.$route.query.data.print.lat
      this.lng = this.$route.query.data.print.lng
    }
    // 查询审核详情
    const routeMine = this.$route.query.url
    if (routeMine === 'mine') {
      if (this.$route.query.phone) {
        this.tel = this.$route.query.phone
      }
      const data = {
        phone: this.$route.query.phone
      }
      merchantenterApi.queryphone(data).then(res => {
        console.log(res)
        if (res == null) {
          console.log('没有信息')
        } else {
        // this.tel = res.phone;
          this.username = res.applicantName
          this.inviter = res.invitePhone
          this.shopname = res.name // 店铺名称

          this.logo = res.logo
          this.detailed = res.address // 店铺地址
          // this.mapsaddress = res.address // 详细地址
          this.type = res.type// 店铺类型
          this.applicantName = res.applicantName// 身份证姓名
          this.applicantNumber = res.applicantNumber// 身份证号

          this.endTime = res.applicantEndTime.slice(0, 10)

          // 身份证到期时间
          this.applicantAddress = res.applicantAddress// 身份证地址
          this.remarks = res.remarks
          this.imglist4 = res.logo.split()[0]
          this.fileList4 = [{
            url: res.logo.split()[0]
          }]

          this.merchantClassificationId = res.classType // 主营分类
          this.second = res.secondClass // 二级分类
          this.Themaintype = res.firstClassName
          this.reclassifytype = res.secondClassName

          this.lat = res.lat
          this.lng = res.lng

          if (this.type === 101) this.shoptype = '个人工商户'
          if (this.type === 201) this.shoptype = '普通店'
          if (this.type === 202) this.shoptype = '旗舰店'
          if (this.type === 203) this.shoptype = '专卖店'
          if (this.type === 204) this.shoptype = '专营店'
          const imgarr = res.credentials.split(',')
          console.log(imgarr)
          console.log(imgarr[0])
          this.imglist = imgarr[0]
          this.fileList = [{
            url: imgarr[0]
          }]
          this.imglist1 = imgarr[1]
          this.fileList1 = [{
            url: imgarr[1]
          }]
          this.imglist2 = imgarr[2]
          this.fileList2 = [{
            url: imgarr[2]
          }]
        }
      }).catch(err => {
        console.log(err)
      })
      cancelsystemApi.querysuer().then(resdata => {
        // cache.setType(resdata[0].auditStatus)
        // 审核状态 0待审核 1已通过 2已拒绝
        if (resdata[0].auditStatus === 0) {
          this.underReview = true
        } else if (resdata[0].auditStatus === 2) {
          this.failToExamine = true
        } else if (resdata[0].auditStatus === 1) {
          this.underReview = false
          this.failToExamine = false
          this.$router.push('/mine')
        }
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    // document.title = "和生活商户入驻"
    this.addDate()
    this.timeFormat(new Date())
    // 判断是否重个人中心进入
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    SettleIn() {
      this.failToExamine = false
    },
    // 当前时间
    addDate() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      if (date.month < 10) {
        date.month = '0' + date.month
      }
      if (date.date < 10) {
        date.date = '0' + date.date
      }
      this.systemTime = date.year + '-' + date.month + '-' + date.date
      // this.minDate = this.systemTime
    },
    // 身份证有效时间选择
    startDate() {
      this.dateSelection = true
      this.dataType = 1
    },
    endDate() {
      this.dateSelection = true
      this.dataType = 2
    },
    changeFn() { // 值变化是触发
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() { // 确定按钮
      // if(this.dataType==1){
      //   this.start_date = this.timeFormat(this.currentDate);
      // }if(this.dataType==2){
      //   this.endDate = this.timeFormat(this.currentDate);
      // }
      this.endTime = this.timeFormat(this.currentDate)
      this.dateSelection = false
    },
    cancelFn() { // 取消按钮
      this.dateSelection = false
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },

    IKnow(e) {
      var that = this
      console.log(e)
      switch (e) {
        case 1:
          that.dplx = false
          break
        case 2:
          break
        case 3:
          break
      }
    },
    // 打开店铺类型
    shop() {
      this.showPicker = true
    },
    // 获取一级分类
    Themain() {
      this.Themainshow = true
      const data = {
        status: 1,
        fatherId: 0
      }
      merchantenterApi.queryclass(data).then(res => {
        console.log(res)
        res.forEach(item => {
          console.log(item.name)
          this.Themainlist.push({
            text: item.name,
            value: item.merchantClassificationId
          })
        })
      })
    },
    // 一级分类取消
    themainshow() {
      this.Themainshow = false
      this.Themainlist = []
    },

    // 获取二级分类
    reclassify() {
      if (this.merchantClassificationId) {
        this.reclassifyshow = true
        const data = {
          status: 1,
          fatherId: this.merchantClassificationId
        }
        merchantenterApi.queryclass(data).then(res => {
          console.log(res)
          res.forEach(item => {
            console.log(item.name)
            this.reclassifylist.push({
              text: item.name,
              value: item.merchantClassificationId
            })
          })
        })
      } else {
        this.$toast('请选择一级分类')
      }
    },
    // 二级分类取消
    Reclassifyshow() {
      this.reclassifyshow = false
      this.reclassifylist = []
    },
    // 店铺类型选择
    onConfirm(value, index) {
      this.shoptype = value[1]
      if (value[1] === '个人工商户') this.type = 101
      if (value[1] === '普通店') this.type = 201
      if (value[1] === '旗舰店') this.type = 202
      if (value[1] === '专卖店') this.type = 203
      if (value[1] === '专营店') this.type = 204
      this.showPicker = false
      console.log(this.type)
      // this.acttype = value.type
    },

    // 一级分类选择
    onConfirm1(value, index) {
      this.reclassifytype = '请选择'
      this.reclassifylist = []
      this.certification = []
      this.fileList3 = []
      this.Themaintype = value.text
      this.merchantClassificationId = value.value
      this.Themainshow = false
      this.Themainlist = []
    },
    // 二级分类选择
    onConfirm2(value, index) {
      console.log(value, index)
      this.fileList3 = []
      this.imglist3 = []
      this.reclassifytype = value.text
      this.second = value.value
      this.reclassifyshow = false
      this.reclassifylist = []
      console.log(this.second)
      // 查询上传分类
      const params = {
        classId: this.second,
        status: 1
      }
      merchantenterApi.queryimg(params).then(res => {
        this.certification = res
      })
    },
    // 地址选择
    site(values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showArea = false
    },
    // 铭感词查询
    sensitive() {
      if (this.shopname.length > 10) {
        this.$toast('店铺名称不能大于10个字')
        this.shopname = ''
        return
      }
      if (/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/.test(this.shopname)) {
        this.$toast('名称不符规范请重新填写')
        this.shopname = ''
        return
      }
      const data = {
        msg: this.shopname
      }// badWord: this.shopname
      merchantenterApi.queryname(data).then(res => {
        console.log(res.isBadWord)
        if (res.isBadWord) {
          this.$toast('名称不符规范请重新填写')
          this.shopname = ''
        }
      })
    },

    alladdress(e) {
      // console.log(e);
      if (this.mapsaddress.length > 10) {
        this.$toast('详细地址不能大于10个字')
        this.mapsaddress = ''
        return
      }
      if (/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/.test(this.mapsaddress)) {
        this.$toast('详细地址不符规范请重新填写')
        this.mapsaddress = ''
        return
      }
      const data = {
        msg: this.mapsaddress
      }// badWord: this.mapsaddress
      merchantenterApi.queryname(data).then(res => {
        console.log(res.isBadWord)
        if (res.isBadWord) {
          this.$toast('详细地址不符规范请重新填写')
          this.mapsaddress = ''
        }
      })
      console.log(this.mapsaddress)
    },

    // 删除照片回调
    delimg() {
      this.imglist = ''
      this.fileList = []
    },
    delimg1() {
      this.imglist1 = ''
      this.fileList1 = []
    },
    delimg2() {
      this.imglist2 = ''
      this.fileList2 = []
    },
    delimg4() {
      this.imglist4 = ''
      this.fileList4 = []
    },
    delimg3(index) {
      console.log(index)
      this.imglist3.splice(index, 1)
      console.log(this.imglist3)
    },
    // 文件上传后回调
    afterread(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res)
        console.log(res.url)
        file.status = 'done '
        this.imglist = res.url
        // 身份证识别正面
        this.$toast('身份证正面识别中...')
        merchantenterApi.queryIdentity({
          credential: this.imglist,
          frontOrBack: 'front'
        }).then(resData => {
          this.$toast('身份证正面识别成功')
          // console.log(resData, '==========')
          file.status = 'done '
          this.applicantName = resData.name
          this.applicantNumber = resData.num
          this.applicantAddress = resData.address
        }).catch(errData => {
          this.$toast('身份证正面识别失败')
          console.log(errData)
          file.status = 'done '
        })
      }).catch(err => {
        console.log(err)
        file.status = 'done '
      })
    },
    afterread1(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res.url)
        file.status = 'done '
        this.imglist1 = res.url
        // 身份证识别反面
        this.$toast('身份证反面识别中...')
        merchantenterApi.queryIdentity({
          credential: this.imglist1,
          frontOrBack: 'back'
        }).then(resData => {
          this.$toast('身份证反面识别成功')
          file.status = 'done '
          // console.log(resData, '======1111111')
          if (resData.end_date == '长期') {
            this.endTime = '长期'
          } else {
            const one = resData.end_date.slice(0, 4)
            const two = resData.end_date.slice(4, 6)
            const three = resData.end_date.slice(6, 8)
            this.endTime = one + '-' + two + '-' + three
          }
          // this.endTime = resData.end_date
        }).catch(errData => {
          console.log(errData)
          this.$toast('身份证反面识别失败')
          file.status = 'done '
        })
      }).catch(err => {
        console.log(err)
        file.status = 'done '
      })
    },
    // 时间戳转换
    getLocalTime(nS) {
      // 日期转换
      var date = new Date(nS * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      // console.log(s);
      return Y + M + D + h + m + s
    },
    afterread2(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res.url)
        file.status = 'done '
        this.imglist2 = res.url
      }).catch(err => {
        console.log(err)
        file.status = 'done '
      })
    },
    afterread3(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res.url)
        file.status = 'done '
        this.imglist3.push(res.url)
        console.log(this.imglist3)
      }).catch(err => {
        console.log(err)
        file.status = 'done '
      })
    },
    afterread4(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res)
        console.log(res.url)
        file.status = 'done '
        this.imglist4 = res.url
      }).catch(err => {
        console.log(err)
        file.status = 'done '
      })
    },
    // 文件大小验证
    onOversize(file) {
      console.log(file)
      this.$toast('文件大小不能超过 10M')
    },
    // 电话校验
    phoneup() {
      console.log('lost')
      if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.tel))) {
        this.$toast('手机号码有误，请重填')
        this.tel = ''
        return false
      } else {
        const data = {
          phone: this.tel
        }
        // merchantenterApi.isMobilePhone(data).then(res => {
        //   if (res.data == false) {
        //     this.tel = ''
        //     this.$toast('手机号码有误，请重填')
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
        merchantenterApi.queryphone(data).then(res => {
          console.log(res)
          if (res == null) {
            console.log('没有信息')
          } else {
            // this.tel = res.phone;
            this.username = res.applicantName
            this.inviter = res.invitePhone
            this.shopname = res.name // 店铺名称

            this.logo = res.logo
            this.detailed = res.address // 店铺地址
            // this.mapsaddress = res.address // 详细地址
            this.type = res.type// 店铺类型
            this.applicantName = res.applicantName// 身份证姓名
            this.applicantNumber = res.applicantNumber// 身份证号
            this.endTime = res.applicantEndTime.slice(0, 10)// 身份证到期时间

            this.applicantAddress = res.applicantAddress// 身份证地址
            this.remarks = res.remarks
            this.imglist4 = res.logo.split()[0]
            this.fileList4 = [{
              url: res.logo.split()[0]
            }]

            this.merchantClassificationId = res.classType // 主营分类
            this.second = res.secondClass // 二级分类
            this.Themaintype = res.firstClassName
            this.reclassifytype = res.secondClassName

            this.lat = res.lat
            this.lng = res.lng

            if (this.type === 101) this.shoptype = '个人工商户'
            if (this.type === 201) this.shoptype = '普通店'
            if (this.type === 202) this.shoptype = '旗舰店'
            if (this.type === 203) this.shoptype = '专卖店'
            if (this.type === 204) this.shoptype = '专营店'
            const imgarr = res.credentials.split(',')
            console.log(imgarr)
            console.log(imgarr[0])
            this.imglist = imgarr[0]
            this.fileList = [{
              url: imgarr[0]
            }]
            this.imglist1 = imgarr[1]
            this.fileList1 = [{
              url: imgarr[1]
            }]
            this.imglist2 = imgarr[2]
            this.fileList2 = [{
              url: imgarr[2]
            }]
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 姓名校验
    name() {
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (!reg.test(this.username)) {
        this.$toast('请输入正确姓名')
        this.username = ''
      }
    },
    // 协议弹窗
    protocol() {
      this.show = true
    },
    // 身份证姓名验证
    applicant() {
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (!reg.test(this.applicantName)) {
        this.$toast('请输入正确姓名')
        this.applicantName = ''
      }
    },
    // 身份证号验证
    applicantN() {
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (!reg.test(this.applicantNumber)) {
        this.$toast('请输入正确身份证号')
        this.applicantNumber = ''
      }
    },
    // 身份证地址
    applicantA() {
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,100}$/
      if (!reg.test(this.applicantAddress)) {
        this.$toast('请输入正确的身份证号的地址')
        this.applicantAddress = ''
      }
    },
    // 提交
    onSubmit() {
      // console.log(this.endTime.slice(0, 4), '=')
      // console.log(this.endTime.slice(5, 7), '=')
      // console.log(this.endTime.slice(8, 10), '============')
      // console.log(this.systemTime.slice(0, 4), '=')
      // console.log(this.systemTime.slice(5, 7), '=')
      // console.log(this.systemTime.slice(8, 10), '=')
      // console.log(this.systemTime, '=')
      // &&
      // this.endTime.slice(0, 4) === this.systemTime.slice(0, 4) &&
      // this.endTime.slice(5, 7) === this.systemTime.slice(5, 7) &&
      // this.endTime.slice(8, 10) === this.systemTime.slice(8, 10)

      if (!this.type) {
        this.$toast('请选择店铺类型')
        return
      }
      if (!this.merchantClassificationId) {
        this.$toast('请选择主营分类')
        return
      }
      if (!this.second) {
        this.$toast('请选择二级分类')
        return
      }
      if (!this.shopname) {
        this.$toast('请输入店铺名称')
        return
      }

      // if (!this.value) {
      //   this.$toast('请选择店铺地址')
      // }
      if (!this.detailed) {
        this.$toast('请输入详细地址')
        return
      }
      if (!this.imglist) {
        this.$toast('请上传身份证头像照片')
        return
      }
      if (!this.imglist1) {
        this.$toast('请上传身份证国徽照片')
        return
      }
      if (!this.imglist2) {
        this.$toast('请上传营业执照')
        return
      }
      // if (!this.imglist4) {
      //   this.$toast('请上传店铺logo')
      //   return
      // }
      if (!this.username) {
        this.$toast('请输入联系人')
        return
      }
      if (!this.tel) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.applicantName) {
        this.$toast('请输入真实的姓名')
        return
      }

      if (!this.applicantNumber) {
        this.$toast('请输入真实有效的身份证号')
        return
      }
      if (this.applicantNumber) {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        // var regB = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/
        // regB.test(this.applicantNumber) === false
        if (reg.test(this.applicantNumber) === false) {
          this.$toast('身份证输入不合法,请重新输入')
          return
        }
      }
      if (!this.applicantAddress) {
        this.$toast('请输入身份证号上的地址')
        return
      }
      // if (!this.start_date) {
      //   this.$toast('请输入身份证有效期起始时间')
      // }
      if (!this.endTime) {
        this.$toast('请输入身份证有效期截止时间')
        return
      }
      if (this.endTime.slice(0, 4) <= this.systemTime.slice(0, 4) &&
      this.endTime.slice(5, 7) <= this.systemTime.slice(5, 7) &&
      this.endTime.slice(8, 10) <= this.systemTime.slice(8, 10)
      ) {
        this.$toast('身份证有效期应当大于当前时间')
        return
      }

      if (!this.checked) {
        this.$toast('请阅读并勾选和生活商家入驻协议')
        return
      }
      if (!this.account.smsCode) {
        this.$toast('请输入验证码')
        return
      }

      if (this.type && this.merchantClassificationId && this.second && this.shopname && this.detailed && this
        .imglist && this.imglist1 && this.imglist2 && this.username && this.tel && this.checked && this.account
        .smsCode) {
        this.uploadstate = true // 上传提示
        const str = this.imglist.split()
        const str1 = this.imglist1.split()
        const str2 = this.imglist2.split()
        const str4 = [...str, ...str1, ...str2, ...this.imglist3]
        const str5 = str4.join(',')
        const data = {
          type: this.type,
          classType: this.merchantClassificationId,
          className: this.Themaintype,
          secondClass: this.second,
          secondClassName: this.reclassifytype,
          // address: this.detailed + this.mapsaddress,

          logo: this.imglist4, // logo
          applicantName: this.applicantName, // 身份证姓名
          applicantNumber: this.applicantNumber, // 身份证号码
          address: this.detailed + this.mapsaddress, // 店铺详情地址
          applicantAddress: this.applicantAddress, // 身份证地址
          endTime: this.endTime, // 身份证有效期

          invitePhone: this.inviter,
          name: this.shopname,
          phone: this.tel,
          connectPhone: this.tel,
          username: this.tel,
          credentials: str5,
          lat: this.lat,
          lng: this.lng,
          smsKey: this.account.smsKey,
          smsCode: this.account.code

        }
        console.log(data, '--------')
        merchantenterApi.submitform(data).then(res => {
          this.uploadstate = false // 上传提示
          this.submit = true
          this.imgtop = require('../../assets/img/top3.png')
        }).catch(err => {
          console.log(err)
          this.uploadstate = false // 上传提示
        })
      }
    },

    // 跳转首页
    jump() {
      window.location.reload()
    },
    // 服务资质证明
    fwzzsm() {
      this.zzsm = true
    },
    // 店铺类型证明
    dplxsm() {
      this.dplx = true
    },
    namegf() {
      this.namedialog = true
    },
    radiochange(name) {
      this.type = name
      console.log(this.type)
    },
    rightclick() {
      this.map = true
      this.map111 = false
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
      this.showmap = true
      // this.$router.push('/merchantenter/mapp')
    },
    getMsgFormSon(data) {
      this.map = false
      this.map111 = true
      this.detailed = data.mapname
      this.lat = data.print.lat
      this.lng = data.print.lng
      console.log(this.lng)
      console.log(this.lat)
    },
    checked1() {
      console.log(this.checked)
      if (this.checked) {
        this.submituserinfo = false
      } else {
        this.submituserinfo = true
      }
    },
    scrollToTop() {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop

      if (that.scrollTop > 120) {
        that.flag = true
      } else {
        that.flag = false
      }
      if (that.scrollTop >= 500) {
        this.imgtop = require('../../assets/img/top2.png')
      } else {
        this.imgtop = require('../../assets/img/top1.png')
      }
    },
    // 验证码
    sendCode() {
      if (!this.tel) {
        this.$toast('请输入手机号码')
      } else {
        console.log(this.tel)
        this.$refs.timeCountDown.reset()
        this.isShowTimeCountDown = true
        loginApi.smsCode({
          phone: this.tel
        })
          .then(res => {
            console.log(res)
            this.account.smsKey = res.key
            this.account.code = res.code
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__line{
  background-color:rgba(23,23,23,0) !important;
}
/deep/.van-tabs__nav{
  background-color: rgba(23,23,23,0) !important;
}
/deep/.van-tab{
  background: rgba(23,23,23,0);
}
/deep/.van-tabs__content{
  position: relative;
  top: -2.75px;
}
.img{
  width: 100%;
  display: block;
}
.introduceBox{
  width: 100%;
  height: 100%;
  .introduceBoxOne{
    // height: 90%;
    // overflow:hidden;
    img{
    width: 100%;
    display: block;
  }
  }

}
.mytext{
  display: inline-block;
}
.have-in-hand{
  text-align: center;
  padding: 200px 0 0 0;
}
.have-in-hand p a{
  color: red;
}
.have-in-hand p{
  font-size: .8rem;
  padding: 50px 150px;
}
.have-in-hand p span{
  color: #458EFE;
}
  .lefticon{
    position: fixed;
    left: 20px;
    top: 20px;
    color: #CDCDCD;
  }
  .dataBox div:last-child span{
    display: block;
  }
  .dataBox div:last-child span .van-cell{
    padding: 0;
  }
  .dataBox div:last-child span:nth-child(2){
    padding: 0 10px;
  }
  .dataBox div:last-child{
    display: flex;
    flex-direction: row;
  }
  .dataBox-One{
    width:230px;
  }
  .dataBox-Two{
    display: flex;
    align-items: center;

  }
  .dataBox-Two span{
    width: auto;

  }
  .textCenter .van-field__control{
    text-align: center!important;
  }
  // .dataBox div:first-child{
  //   width:100px;
  // }
  .dataBox{
    padding: 25px 20px;
    font-size: .8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .knowClisk{
    width: 95%;
    position: fixed;
    bottom: 20px;
    left: 2.5%;
  }
  .imgList{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
  .imgList div{
    flex: 1;
    overflow: hidden;
    padding: 0 10px;
  }
  .imgList div img{
    width: 100%;
    height: 100%;
  }
  .home {
    width: 100%;
    height: 100%;
    // background: #f4f6f5;
    background: url(../../assets/img/ruzhubj.png)no-repeat;
    background-size: 100%;

  }

  .border {
    width: 100%;
    height: 30px;
    // background: #f4f6f5;
  }

  .box {
    margin-top: 260px;
    width: 100%;

    background-color: rgba(255,255,255,0.5) !important;
    border-radius: 40px 40px 40px 40px;
  }

  .box1 {
    // margin-top: 260px;
    width: 100%;
    background-color: rgba(255,255,255,0.5) !important;
    border-radius: 40px 40px 40px 40px;
  }

  .form {
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 30px;
    // background: #fff;
    // border-radius: 40px 40px 40px 40px;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
  }

  .title-msg {
    font-size: 24px;
    color: #A2A2A2;
    margin-top: 6px;
  }

  .form-list {
    margin-top: 50px;
    font-size: 28px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .left {
    font-size: 30px;
    color: #606060;
  }

  .userinfo {
    width: 100%;
    background: #fff;
    padding: 20px;
    border-radius: 30px 30px 30px 30px;
  }

  /deep/.van-cell__title {
    color: #606060;
  }
  .van-cell{
    background: none!important;
  }

  .uploading {
    width: 100%;
    background: #fff;
    padding-top: 30px;
  }

  .uploading-box {
    width: 100%;
    margin: 0 auto;
  }

  .uploading-title {
    font-size: 32px;
    font-weight: bold;
  }

  .uploading-msg {
    font-size: 24px;
    color: #A2A2A2;
    margin-left: 30px;
    font-weight: normal;
  }

  .info {
    width: 100%;
    border-radius: 30px 30px 30px 30px;
    padding: 20px;
  }

  .footer {
    width: 100%;
    background: #fff;
    padding-top: 30px;
    padding-bottom: 50px;
  }

  .checked {
    width: 70%;
    margin: 0 auto 40px;
    font-size: 28px;
    display: flex;
    justify-content: space-around;
  }

  .idcard {
    margin-top: 50px;
  }

  .demo {
    margin-top: 30px;
    width: 100%;
    height: 254px;
  }

  .up-msg {
    color: #0314AF;
    font-size: 20px;
    margin-left: 20px;
  }

  .checkbox {
    display: flex;
  }

  /deep/.van-image__img {
    width: 100%;
    height: 260px;
  }

  /deep/.van-image {
    width: 100%;
    height: 260px;
  }

  .submit {
    width: 100%;
    text-align: center;
    border-radius: 0;
  }

  .rzxy {
    text-decoration: underline;
    color: #AD0EA2;
  }

  .dialog {
    height: 1000px;
    overflow: scroll;
    padding: 20px;
  }

  .namegf {
    font-size: 28px;
    top: 100px;
  }

  .shopname {
    width: 100%;
    font-size: 30px;
  }

  .dialog1 {
    height: 1100px;
    overflow: scroll;
    padding: 20px;
    font-size: 24px;
  }

  .zdl {
    width: 100%;
  }

  .wzdl {
    width: 100%;
    background: #AD0EA2!important;
    color: white;
  }

  .fwzzmsg {
    font-size: 28px;
    margin-left: 5px;
  }

  .right {
    height: 100%;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .radio {
    font-size: 24px;
  }

  .footermsg {
    width: 100%;
  }

  .ljsq1 {
    background: #ccc;
  }

  .mtz {
    font-size: 28px;
    width: 90%;
    margin: 0 auto 25px;
  }
  .mtz1 {
    font-size: 28px;
    width: 95%;
    margin: 0 auto 25px;
  }

  .fontsize {
    font-size: 30px;
  }

  .fontsize1 {
    font-size: 30px;
  }

  .color {
    color: #323233
  }

  .xiangji {
    width: 250px;
    height: 250px;
  }

  .upload {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
  }
  .upload.two{
    display: flex;
    flex-direction: column;
  }
  .positive{
    font-size: .5rem;
    flex-shrink: 0;
    margin-right: 20px;
    margin-bottom: 10px;
    // color: #A2A2A2;
  }

  .slpopup {
    text-align: center;
    font-size: 32px;
    color: #232323;
    line-height: 80px;
    padding-top: 30px;
  }

  .top {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
  }

  .jump {
    margin-top: 150px;
  }

  /deep/.van-field__control {
    font-size: 28px;
    color:#7E7E7E;
  }

  .wzdls {
    position: fixed;
    left: 2.5%;
    bottom: 20px;
    width: 95%;
  }
  .box{
    height: 90%;
    overflow-y: scroll;
  }
  .wzdlb {
    height: 100%;
    width: 100%;
    position: absolute;

  }

  .codespan {
    // border: 0;
    // #AD0EA2
    color: #AD0EA2;
  }

  .showlob {
    position: fixed;
    width: 80%;
    top: 30%;
    left: 10%;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  /deep/.van-loading {
    color: #FFFFFF;
    font-size: 0.875rem;
    line-height: 2.75rem;
    text-align: center;
    background: rgb(21, 127, 239);
    border-radius: 62.4375rem;
    height: 2.75rem;
  }

  /deep/.van-loading__text {
    display: inline-block;
    margin-left: 0.5rem;
    color: #FFFFFF;
    font-size: 0.875rem;
    vertical-align: middle;
  }

  /deep/ .van-field__label {
    display: flex;
    align-items: center;
  }
</style>
