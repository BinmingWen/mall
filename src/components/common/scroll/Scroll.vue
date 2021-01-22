<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//引入BS基础组件
import BScroll from '@better-scroll/core'
//引入pullup上拉加载插件
import PullUp from '@better-scroll/pull-up'
BScroll.use(PullUp)
export default {
  name: "Scroll",
  data(){
    return {
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default(){
        return 3;
      }
    },
    pullUpLoad:{
      type:Boolean,
      default() {
        return 0;
      }
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad

    })
   /* //滑到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () =>{
        this.$emit("pullingupLoad");
      })
    }*/

    this.scroll.on('pullingUp', () =>{
      this.$emit("pullingupLoad");
    })


    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
      //console.log(position);
    });

    /*//监听滚动位置
    if (this.scroll.probeType === 2 || this.scroll.probeType === 3) {
      console.log(this.scroll.probeType);
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
        console.log(position);
      });
    }*/
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time);

    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getSaveY(){
      return this.scroll.y;
    }
  }
}
</script>

<style scoped>

</style>
