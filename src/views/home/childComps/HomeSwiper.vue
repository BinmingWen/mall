<template>
  <div>
    <Swiper>
      <swiper-item v-for="(item,id) in banners" :key="id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </Swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default() {
        return[]
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
       // console.log('....');
      }
    }
  }
}
</script>

<style scoped>

</style>
