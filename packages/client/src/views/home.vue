<template>
<div class="container" style="background: #ecf5ec;">
  <div class="judul">
    <div class="logo">
        <div class="logo_img">
            <img src="../assets/img/logo.jpg" class="img-responsive" width="64" height="64">
        </div>
    </div>
  <div class="allTasks">
    <h3>Selamat datang di IHC Mobile</h3>
    <p class="content-inner">Kami memberikan pelayanan komphrehensif dan terpadu dengan standar pelayanan terakreditasi</p>
  </div>
  </div>
  <div class="home-menu">
    <div class="list-block user-list">
      <ul>
        <li v-for="menu in menus" v-bind:key="menu.id" class="home-li">
          <a class="item-content item-link" v-link="{path: menu.path}">
          <div class="item-media"><i class="icon icon-dianji"></i></div>
          <div class="item-inner">
            <div class="title-row">
              <div class="item-text">{{menu.title}}</div>
              <div class="item-desc">{{menu.description}}</div>
            </div>
          </div>
          </a>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import {Icon} from 'ant-design-vue'
import Bar from '../components/Bar'
import BarItem from '../components/BarItem'
import VLayer from '../components/PullToRefreshLayer'
import VCardContainer from '../components/Card'
import Btn from '../components/Button'
import Card from '../components/CardItem'
import VContent from '../components/Content'
import List from '../components/List'
import Item from '../components/ListItem'
import $ from 'zepto'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

export default {
  route: {},
  ready () {
    $.init()
  },
  data () {
    return {
      menus: [
        {
          id: 1,
          title: 'Cari Dokter',
          description: 'Pesan dokter langganan',
          icon: 'left',
          path: '/doctor/list'
        },
        {
          id: 2,
          title: 'Cari Faskes',
          description: 'Rumah sakit dan klinik',
          icon: 'home'
        },
        {
          id: 3,
          title: 'Cari Dokter',
          description: 'Umum dan spesialis',
          icon: 'home'
        }
      ]
    }
  },
  computed: {
    length () {
      return this.menus.length
    }
  },
  methods: {},
  components: {
    IconFont,
    Bar,
    BarItem,
    VLayer,
    VCardContainer,
    Card,
    VContent,
    List,
    Item,
    Btn
  }
}
</script>

<style>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.home {
  top: -2.2rem !important;
}
.home-bar {
  background: #efeff4;
  height: 2.8rem;
  position: relative;
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.home-bar .tab-item {
  height: 2.8rem;
  background-color: white;
}
.item-logo {
  /* font-size: 0.65rem; */
  /* color: #5f646e; */
  /* line-height: 1.05rem; */
  /* position: relative; */
  /* overflow: hidden; */
  /* height: 2.1rem; */
  /* text-overflow: ellipsis; */
  /* -webkit-line-clamp: 2; */
  /* -webkit-box-orient: vertical; */
  /* display: -webkit-box; */
  /* float: left; */
  flex: 0 1 auto;
}

.judul {
  /* position: absolute; */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.home-menu {
  margin-bottom: 100px;
}
</style>
