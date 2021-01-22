<template>
<div class="goods">
    <goods-list-item v-for="(item,id) in goods" :good-item="item" :key="id"/>
</div>
</template>

<script>
import goodsListItem from "components/contents/goods/goodsListItem";
export default {
  name: "goodsList",
  components:{
    goodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;


}

</style>
