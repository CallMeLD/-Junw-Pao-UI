<template>
  <!--顶部操作栏-->
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <!--页面内容-->
  <div id="content">
    <router-view/>
  </div>

  <!--Tab底菜单栏-->
  <van-tabbar route >
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import routes from "../config/route.ts";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath  === route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

// 顶栏-左侧
const onClickLeft = () => {
  router.back();
}

// 顶栏-右侧
const onClickRight = () => {
  router.push('/search')
}
</script>


<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
