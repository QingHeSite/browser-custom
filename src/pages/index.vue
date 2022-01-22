<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {Input as aInput, InputSearch} from 'ant-design-vue'
import {ref, reactive, onMounted, getCurrentInstance} from "vue";
import {useStorage} from '@vueuse/core'
import Draggable from "vuedraggable";
import {site} from "../scripts/siteMap";

const word = ref('')
const engineIndex = ref(0)
const googleIcon = ref('')
const baiduIcon = ref('')
const showEngineList = ref(false)
const localEngineIndex = useStorage('engineIndex', 0)
/*icons 加载*/
import('@assets/icons/google.svg').then(res => {
  googleIcon.value = res.default
})
import('@assets/icons/baidu.svg').then(res => {
  baiduIcon.value = res.default
})
/*搜素引擎列表*/
const searchEngineList = reactive([{
  id: 0,
  name: 'Google',
  iconSrc: googleIcon,
  searchStr: 'https://www.google.com/search?q=#params#'
}, {
  id: 1,
  name: '百度',
  iconSrc: baiduIcon,
  searchStr: 'https://www.baidu.com/s?wd=#params#'
}])
const onSearch = () => {
  const url = searchEngineList[engineIndex.value].searchStr.replace('#params#', word.value)
  window.open(url, '_blank')
}
const switchEngine = (index) => {
  engineIndex.value = index
  localEngineIndex.value = index
  showEngineList.value = false

}

/*站点列表---start*/
const showList = reactive(site['devSite'])
const localSiteList= useStorage('showSiteList', showList)
const draggableEnd = () => {
  console.log(localSiteList)
}
const toSite = (item) => {
  window.open(item.url, '_blank')
}
/*站点列表---end*/
onMounted(() => {
  /*从本地获取配置 引擎index*/
  engineIndex.value = localEngineIndex.value
  /*输入框自动聚焦*/
  const inputSearch = getCurrentInstance().refs.inputSearch
  inputSearch.focus()
})
</script>

<template>
  <div :class="$style.search_ctx">
    <!--    输入框-------------start-->
    <div :class="$style.input_box">
      <div :class="$style.icon_box" @click="showEngineList = !showEngineList">
        <img width="40" height="40" :src="searchEngineList[engineIndex].iconSrc" alt="">
      </div>
      <a-input :class="$style.input_comp" ref="inputSearch" v-model:value="word"
               placeholder=""
               enter-button
               @pressEnter="onSearch"/>
      <transition name="fade">
        <ul :class="$style.engineList" v-if="showEngineList">
          <li v-for="(item, index) in searchEngineList" :key="item.id" @click="switchEngine(index)">
            <span :style="{backgroundImage: `url(${item.iconSrc})`}"></span>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </transition>

    </div>
    <!--    输入框-------------end-->

    <!--    列表-----start-->
    <div :class="$style.showSiteWrapper" @dragover.prevent>
      <Draggable :disabled="false" :class="$style.siteWrapper" :list="localSiteList" @end="draggableEnd">
        <template #item="{ element = {}, index }">
          <div :class="$style.siteItem" @click="toSite(element)">
            <span :class="$style.siteIcon"></span>
            <p :class="$style.siteTitle">{{ element.title}}</p>
          </div>
        </template>
      </Draggable>
    </div>
    <!--    列表-----end-->
  </div>
</template>

<style lang="scss" module src="./index.scss">
</style>
