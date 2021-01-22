<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            @pullingupLoad="loadMore"
            :probe-type="3"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import goodsList from "components/contents/goods/goodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import tabControl from "components/contents/tabControl/tabControl";
import BackTop from "components/contents/backTop/BackTop";
import {
  getHomeMultidate,
  getHomeGoods
} from "network/home";

import {debounce} from 'common/utils'

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    }
  },
  components: {
    NavBar,
    goodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    tabControl,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidate();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh();
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getSaveY();
  },
  methods: {
    /**
     *事件监听的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //1.判断上拉吸附效果
      this.isShowBackTop = (-position.y) > 1000;
      //2.判断banner吸附效果
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      //console.log(this.isTabFixed);
    },
    loadMore() {
      console.log(this.currentType);
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // console.log('-----');
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关的事件
     */
    getHomeMultidate() {
      getHomeMultidate().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px;*/
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
}
.tab-control {
  position: relative;
  z-index: 9;
}
/*.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}*/

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}

/*.content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}*/

</style>
