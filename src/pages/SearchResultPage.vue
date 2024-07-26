<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username}`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>

    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>

<!--  <user-card-list :user-list="userList" />-->
<!--  <van-empty v-if="!userList || userList.length <1"  description="搜索结果为空"/>-->
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
const route = useRoute();
const {tags} = route.query;
const userList = ref([])
// 入参
console.log('tags --> ' + tags);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags',{
    params:{
      tagNameList: tags
    },
    // 入参序列化，后端可正常接收
    paramsSerializer: params => {
     return qs.stringify(params,{indices:false});
    }
  }).then(function (response) {
    console.log('/user/search/tags succeed', response);
    return response?.data;
  })
  .catch(function (error) {
    console.error('/user/search/tags error', error);
    showFailToast('访问接口[/user/search/tags]失败' + error);
  })

  console.log('userListData --> ' + userListData )
  /**
   * 处理用户标签 tags，使其格式正确
   * 稍后 -> 后端实现
   */
  if(userListData && userListData.length > 0){
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  // Missing required prop: "loading"
  // closeToast();
})

// const mockUser = {
//   id: 12345,
//   username: '鱼皮',
//   userAccount: '12314',
//   profile: '一名精神小伙，目前还有头发，谢谢大家，阿爸爸阿爸爸阿巴阿巴阿巴',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: 0,
//   phone: '13113113111',
//   email: '592342843721987@xzcxzczxcz.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   createTime: new Date(),
// }
</script>


<style scoped>

</style>
