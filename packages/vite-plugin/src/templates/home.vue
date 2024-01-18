<template>
  <Head></Head>
  <div class="container">
    <div class="container--warp">
      <div class="container--warp__introduce">
        <div class="container--warp__introduce__title">Cherry Markdown</div>
        <div class="container--warp__introduce__detail">Cherry Markdown Editor is a Javascript Markdown editor. It has
          the
          advantages such as out-of-the-box,lightweight and easy to extend. It can run in browser or server(with
          NodeJs).
        </div>
        <div class="container__warp--introduce__btn">
          <a class="container--warp__introduce__btn-item" href="/guide/index">Get Started</a>
          <a class="container--warp__introduce__btn-item" target="_blank"
            href="https://github.com/Tencent/cherry-markdown">View Github</a>
        </div>
      </div>
      <div class="container--warp__logo"><img src="/logo.svg" /></div>
    </div>
  </div>

  <div class="details">
    <div v-for="(item, index) in details" class="details-item">
      <div :id="item.title" class="details-item__title">{{ item.title }}</div>
      <div :id="item.title" class="details-item__icon">{{ item.icon }}</div>
      <div :id="item.title" class="details-item__detail">{{ item.detail }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Head from './components/Head.vue';
import { useRouter } from "vue-router";
const router = useRouter();
const details = [
  {
    title: '快速使用',
    icon: '🚀',
    detail: '可以通过非常简单的方式调用和实例化 Cherry Markdown Editor，实例化的 Cherry Markdown Editor 默认支持最常用的 Markdown 语法（如标题、目录、流程图、公式等）。',
  },
  {
    title: '跨框架',
    icon: '🎨',
    detail: 'Cherry Markdown 编辑器应由纯 JavaScript 实现，不应依赖 Angular、Vue、React 等框架技术。框架只提供容器环境。它可以在浏览器或服务器（使用 NodeJs）中运行。',
  },
  {
    title: '易于扩展',
    icon: '📝',
    detail: '当Cherry Markdown 编辑器支持的语法不能满足您的需求时，可以快速进行二次开发或功能扩展。',
  }
]

</script>
<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 64px 0;

  &--warp {
    display: flex;
    max-width: 1150px;

    &__introduce {
      width: 812px;

      &__title {
        font-size: 42px;
        font-weight: 800;
        background-image: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
        background-clip: text;
        color: transparent;
      }

      &__detail {
        font-size: 22px;
        color: rgba(60, 60, 67, 0.78);
        margin: 48px 0;
      }

      &__btn {
        display: flex;
        align-items: center;

        &-item {
          margin-left: 24px;
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          background-color: #5672cd;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }

    &__logo {
      width: 462px;

      img {
        margin: 0 56px;
        width: 260px;
      }
    }
  }
}

.details {
  width: 100%;
  display: flex;
  justify-content: center;

  &-item {
    width: 300px;
    padding: 20px;
    border-radius: 20px;
    background-color: #f4f4f4;

    &__title {
      font-size: 26px;
      font-weight: 800;
      background-image: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
      background-clip: text;
      color: transparent;
    }

    &__icon {
      font-size: 28px;
      margin: 10px;
    }

    &__detail {
      font-size: 16px;
      color: rgba(60, 60, 67, 0.78);
      margin-top: 20px;
    }
  }
}
</style>