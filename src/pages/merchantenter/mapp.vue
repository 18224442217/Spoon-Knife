<template>
  <div class="container">
    <div class="content">
      <div class="search-area"></div>
      <div class="search-box">
        <div class="search-map">
          <!-- <input class="" /> -->
          <!-- @click="" -->
          <div class="search-map-text">
            <!-- <img class="search-map-text-img" src="../../assets/img/search.png" /> -->
            <!-- <div class="search-map-text-t">搜索地点</div> -->
            <van-field v-model="keyword" placeholder="搜索地点" left-icon="search" input-align="center"
              class="search-map-text-t" @input="inputchange">
              <!-- <template v-if="coordinate.lng" #button>
                <van-button size="small" type="info" @click="jump">确认</van-button>
              </template> -->
            </van-field>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 1000px;display: none;" id="allmap"></div>
    <div class="baidu-mapbox" :style="'height:'+sheight+'px'">
      <baidu-map :zoom="zoom" :scroll-wheel-zoom="true" :center="coordinate" class="mapstyle" @ready="map_handler">
        <!-- <bm-local-search :keyword="keyword" :panel="true" /> -->
        <bm-geolocation :show-address-bar="true" :auto-location="true" anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          @locationSuccess="locationSuccess" />
      </baidu-map>
    </div>

    <van-popup v-model="adress" :style="{ height: '55%' }" round position="bottom" class="adresss">
      <div class="addressc">
        <div class="addressl" :style="c_id==index?'color:#1989fa':''" v-for="(item,index) in listAddress" :key="index"
          @click="chooseaddress(index)">
          <p>{{item.title}}</p>
          <p style="font-size: 0.7rem;color: #c0c0c0;">{{item.address}}</p>
        </div>
      </div>
      <div class="blank"></div>
      <van-button class="abo" type="info" style="width:21.4375rem;border-radius: 10px" @click="jump">确定
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'Map',
    data() {
      return {
        zoom: 13,
        location: '',
        keyword: '',
        coordinate: {
          lng: 104.072745,
          lat: 30.578994
        },
        listsearch: [],
        listclick: [],
        adress: false,
        listAddress: [],
        c_id: 10000,
        sheight: 800,
      }
    },
    created() {
      // this.getCurrentPosition()
      console.log(document.documentElement.clientWidth);
      console.log(document.documentElement.clientHeight);
      this.sheight = document.documentElement.clientHeight;
    },

    methods: {
      // 获取用户的地理位置
      getCurrentPosition() {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function(res) {
          console.log(res);
          this.coordinate = res.point;
          console.log(this.coordinate);
        })
      },

      map_handler({
        BMap,
        map
      }) {
        // this.coordinate.lng = 116.404;
        // this.coordinate.lat = 39.915;
        // this.zoom = 18;

        this.getCurrentPosition()
        // let _this = this;
        const that = this
        this.BMap = BMap
        this.map = map

        const a = map.addEventListener('click', function(e) {
          // console.log(e);
          map.clearOverlays()
          that.coordinate.lng = e.point.lng
          that.coordinate.lat = e.point.lat
          // console.log(e.point.lng + ',' + e.point.lat)
          const marker = new BMap.Marker(e.point)
          // console.log(marker);
          map.addOverlay(marker)
          var point = new BMap.Point(e.point.lng, e.point.lat)
          var gc = new BMap.Geocoder()
          gc.getLocation(point, function(rs) {
            // console.log(rs);

            var lista = rs.surroundingPois;
            that.listclick = rs.addressComponents;
            that.listAddress = lista;
            console.log(that.listclick);
            that.adress = true;
            // var listb =[];
            // for (var i = 0; i < lista.length; i++) {
            //   listb.push(lista[i].title);
            // }
            // console.log(listb);

            var addComp = rs.addressComponents
            that.keyword = addComp.province + addComp.city + addComp.district + addComp.street + addComp
              .streetNumber
            console.log(that.keyword)
          })
          const geoCoder = new BMap.Geocoder()
          /* 获取位置对应的坐标 */

          /* 利用坐标获取地址的详细信息 */
          geoCoder.getLocation(e.point, res => {
            console.log(res.address)

            that.keyword = res.address
          })
        })
      },

      jump() {
        this.adress = false;
        this.params = {
          mapname: this.keyword,
          print: this.coordinate,
        }
        let data = this.params;
        this.$emit('func', this.params)
        // this.$router.push({
        //   name: 'merchantenter',
        //   query: {
        //     data
        //   }
        // })
      },

      inputchange(e) {
        var that = this;
        console.log(e);
        this.coordinate.lng = '';

        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

        var local = new BMap.LocalSearch(map, {
          renderOptions: {
            map: map
          },
          onSearchComplete: function(results) {
            console.log(results);
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              console.log(local.wa);
            }
          }
        });
        local.search(e);
        local.setSearchCompleteCallback(function(results) {
          console.log(results);
          var lista = results.Hr;
          that.listsearch = lista;
          that.listAddress = lista;
          console.log(that.listsearch);
          that.adress = true;
          // var listb =[];
          // for (var i = 0; i < lista.length; i++) {
          //   listb.push(lista[i].title);
          // }
          // console.log(listb);
        })
      },

      locationSuccess(e) {
        console.log(e);
        this.coordinate.lng = e.point.lng
        this.coordinate.lat = e.point.lat
        const add = e.addressComponent
        this.keyword = add.province + add.city + add.district + add.street + add.streetNumber
      },
      //选择地址
      chooseaddress(e) {
        console.log(e);
        var that = this;
        that.c_id = parseInt(e);
        console.log(this.listAddress[e]);
        var data = this.listAddress[e];
        console.log(data.point.lat);
        console.log(data.point.lng);
        that.coordinate.lng = data.point.lng;
        that.coordinate.lat = data.point.lat;
        that.keyword = data.address;
        // var point = new BMap.Point(data.point.lng, data.point.lat)
        // var gc = new BMap.Geocoder()
        // gc.getLocation(point, function(res) {
        //   console.log(res);
        //   that.coordinate.lng = data.point.lng
        //   that.coordinate.lat = data.point.lat
        //   that.keyword = res.addressComponents.province + res.addressComponents.city + res.addressComponents
        //     .district + res.addressComponents.street + res.addressComponents.streetNumber
        // })
      },
    }
  }
</script>
<style scoped="scoped">
  .input {
    margin: 0 auto;
    border-radius: 50px;
    background: #fff;
  }

  .search-area {
    height: 10rem;
    width: 100%;
    opacity: 0.5;
    background: linear-gradient(180deg, #a9a9a9, rgba(255, 255, 255, 0.00) 56%, rgba(190, 190, 190, 0.07) 58%, rgba(192, 192, 192, 0.00) 58%);
    z-index: 99;
    position: absolute;
  }

  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 4rem;
    align-items: center;
  }

  .search-map {
    height: 2rem;
    background: #0000FF;
    position: absolute;
    z-index: 9999;
    width: 22rem;
    opacity: 1;
    background: #ffffff;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-map-text {
    height: 2rem;
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-map-text-img {
    height: 1.125rem;
    width: 1.125rem;
    margin-right: 0.5rem;
  }

  .search-map-text-t {
    width: 80%;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    color: #8f8e93;
    font-size: 1rem;
    border-radius: 0.5rem;
    margin: 0;
    border: 0;
    padding: 0;
  }

  .container {
    overflow: hidden;
    border: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    padding: 0;
  }

  #allmap {
    width: 100%;
    overflow: hidden;
  }

  .name {
    width: 100%;
    text-align: center;
  }

  .qd {
    width: 100%;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .mapstyle {
    height: 100%;
  }

  .adresss {
    text-align: center;
    font-size: 32px;
    color: #232323;
    line-height: 80px;
    padding-top: 30px;
  }

  .abo {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 0.5rem;
  }

  .van-overlay {
    background: none;
    opacity: 0;
  }

  .blank {
    height: 3.75rem;
    width: 100%;
  }

  .addressc {
    height: 100%;
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }

  .addressl {
    /* border-bottom: 1px solid #969696; */
    /* line-height: 60px; */
  }

  .baidu-mapbox {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }

  /*  .content{
    height: 100%;
    width: 100%;
  } */
</style>
