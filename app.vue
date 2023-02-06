<script lang="ts" setup>
import anime from "animejs";

const config = useAppConfig()

const themeColor = "#0F172A";

useHead({
  title: config.TITLE,
  meta: [
    {
      name: "description",
      content: config.DESCRIPTION
    },
    {
      name: "google-site-verification",
      content: "Noj9u0V2hrMOox_Ft5pMKfOK51vlpCab714vr_xic-Q"
    },
    {
      name: "theme-color",
      content: themeColor
    },
    {
      name: "msapplication-navbutton-color",
      content: themeColor
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: themeColor
    }
  ],
  htmlAttrs: {
    lang: config.LANG,
  }
})

let animationFinished = ref(false);

onMounted(() => {
  anime({
    targets: '#title',
    top: 10,
    translateY: ["-50%", 0],
    easing: 'cubicBezier(0.3, 0.001, 0.2, 1)',
    duration: 2000,
    loop: false,
    autoplay: true,
    delay: 500,
    complete() {
      animationFinished.value = true;
    }
  })
})
</script>

<template>
  <div id="background">
    <div class="w-[108rem] flex-none flex justify-end">
      <nuxt-img alt="bg-effect" format="webp" class="w-[90rem] flex-none max-w-none" decoding="async" src="/bgdecdark.png"/>
    </div>
  </div>
  <div id="pageContent">
    <h1 id="title"
        class="glow-strong text-transparent top-[50%] mx-auto text-[10vmin] md:text-8xl relative top-50 translate-y-[-50%] mb-6">
      {{ config.TITLE }}</h1>
    <TransitionScale easing="cubicBezier(0.3, 0.001, 0.2, 1)">
      <div v-if="animationFinished">
        <NuxtPage/>
      </div>
    </TransitionScale>
    <p class="fixed bottom-0 right-0 mb-1 mr-2 text-white/[0.3] transition-colors hidden min-[360px]:block">
      Website by
      <a class="hover:text-white hover:underline" target="_blank" href="https://dreaming.codes">Lorenzo Rizzotti</a>
      & <a class="hover:text-white hover:underline" target="_blank" href="https://www.youtube.com/watch?v=uHgt8giw1LY">Vincenzo Langone</a>
    </p>
  </div>
</template>

<style lang="scss">
#background {
  @apply fixed -z-50 top-0 flex justify-center overflow-hidden pointer-events-none w-screen h-screen bg-slate-900;
}

#pageContent {
  @apply absolute w-screen h-screen text-slate-400 antialiased text-center overflow-x-hidden;
}
</style>