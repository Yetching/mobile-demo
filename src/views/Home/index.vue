<template>
  <div class="home-container">
    <div class="header" :class="{ active: state.headerScroll }">
      <van-icon name="wap-nav" />
      <div class="header-main">
        <span class="main-main">新峰商城</span>
        <span class="main-search">山河无恙，人间皆安</span>
      </div>
      <van-icon name="manager-o" @click="goAbout" />
    </div>
    <van-swipe class="swipe" :autoplay="2000">
      <van-swipe-item v-for="item in goods.carousels" :key="item.carouselUrl">
        <a :href="item.redirectUrl">
          <img :src="item.carouselUrl" />
        </a>
      </van-swipe-item>
    </van-swipe>
    <div class="menu">
      <ul class="menu-list">
        <li class="menu-item" v-for="item in menuList" :key="item.categoryId">
          <img :src="item.imgUrl" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods">
      <header class="good-header">新品上线</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-list">
          <div
            class="good-item"
            v-for="item in goods.newGoodses"
            :key="item.goodsId"
            @click="gotoDetail(item.goodsId)"
          >
            <img
              class="good-img"
              :src="item.goodsCoverImg"
              :alt="item.goodsIntro"
            />
            <div class="good-describe">{{ item.goodsName }}</div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="goods">
      <header class="good-header">热门商品</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-list">
          <div
            class="good-item"
            v-for="item in goods.hotGoodses"
            :key="item.goodsId"
            @click="gotoDetail(item.goodsId)"
          >
            <img
              class="good-img"
              :src="item.goodsCoverImg"
              :alt="item.goodsIntro"
            />
            <div class="good-describe">{{ item.goodsName }}</div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="goods">
      <header class="good-header">新品上线</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-list">
          <div
            class="good-item"
            v-for="item in goods.recommendGoodses"
            :key="item.goodsId"
            @click="gotoDetail(item.goodsId)"
          >
            <img
              class="good-img"
              :src="item.goodsCoverImg"
              :alt="item.goodsIntro"
            />
            <div class="good-describe">{{ item.goodsName }}</div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { getHome } from '@/api/home';
  import { Toast } from 'vant';

  const router = useRouter();

  // 模块菜单列表
  const menuList = [
    {
      name: '新蜂超市',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
      categoryId: 100001,
    },
    {
      name: '新蜂服饰',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
      categoryId: 100003,
    },
    {
      name: '全球购',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
      categoryId: 100002,
    },
    {
      name: '新蜂生鲜',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
      categoryId: 100004,
    },
    {
      name: '新蜂到家',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
      categoryId: 100005,
    },
    {
      name: '充值缴费',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
      categoryId: 100006,
    },
    {
      name: '9.9元拼',
      imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
      categoryId: 100007,
    },
    {
      name: '领劵',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
      categoryId: 100008,
    },
    {
      name: '省钱',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
      categoryId: 100009,
    },
    {
      name: '全部',
      imgUrl:
        'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
      categoryId: 100010,
    },
  ];

  // 商品展示模块
  const loading = ref(true);

  // 获取商品列表信息

  const goods = reactive({
    newGoodses: [] as any,
    hotGoodses: [] as any,
    recommendGoodses: [] as any,
    carousels: [] as any,
  });
  onMounted(async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    const { data } = await getHome();
    loading.value = false;
    Toast.clear();
    goods.newGoodses = data.newGoodses;
    goods.hotGoodses = data.hotGoodses;
    goods.carousels = data.carousels;
    goods.recommendGoodses = data.recommendGoodses;
  });

  // 详情
  const gotoDetail = (goodsId: any) => {
    router.push({
      path: `/product/${goodsId}`,
    });
  };

  // 滚动

  const state = reactive({
    headerScroll: false,
  });

  nextTick(() => {
    window.addEventListener('scroll', () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 100
        ? (state.headerScroll = true)
        : (state.headerScroll = false);
    });
  });

  // 点击事件
  const goAbout = () => {
    router.push('/about');
  };
</script>

<style lang="less" scoped>
  .active {
    background-color: #00c8c8;
    color: #fff !important;
  }
  .home-container {
    padding-bottom: 100px;
    .header {
      box-sizing: border-box;
      padding: 0 15px;
      width: 100%;
      color: #00c8c8;
      text-align: center;
      position: fixed;
      z-index: 99;
      height: 50px;
      top: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-main {
        width: 75%;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.7);
        line-height: 30px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        .main-main {
          font-size: 20px;
          color: #00c8c8;
          padding: 0 10px;
          border-right: 1px solid #666;
        }
        .main-search {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .swipe {
      .van-swipe-item {
        color: #fff;
        img {
          width: 375px;
        }
      }
    }
    .menu {
      .menu-list {
        display: flex;
        flex-wrap: wrap;
        .menu-item {
          width: 20%;
          height: 75px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          img {
            width: 36px;
            height: 36px;
          }
          span {
            font-size: 12px;
          }
        }
      }
    }

    .goods {
      .good-header {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        background-color: #f9f9f9;
      }

      .good-list {
        display: flex;
        flex-wrap: wrap;
        .good-item {
          box-sizing: border-box;
          padding: 10px;
          width: 50%;
          border-bottom: 1px solid #e9e9e9;
          &:nth-child(2n + 1) {
            border-right: 1px solid #e9e9e9;
          }
          font-size: 13px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          .good-img {
            width: 120px;
            height: 120px;
          }
          .good-describe {
            color: #000;
          }
          .good-price {
            margin-top: 5px;
            color: #00c8c8;
          }
        }
      }
    }
  }
</style>
