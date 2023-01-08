<script lang="ts" setup>
import anime from "animejs";

const config = useAppConfig()

useHead({
  title: config.TITLE,
  meta: [
    {
      name: "description",
      content: config.DESCRIPTION
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
    delay: 2000,
    complete: () => {
      animationFinished.value = true;
    }
  })
})
</script>

<template>
  <div class="absolute -z-50 top-0 index-x-0 flex justify-center overflow-hidden pointer-events-none w-full h-full bg-slate-900">
    <div class="w-[108rem] flex-none flex justify-end">
      <nuxt-img alt="bg-effect" format="webp" class="w-[90rem] flex-none max-w-none" decoding="async" src="/bgdecdark.png"/>
    </div>
  </div>
  <div
      class="absolute w-screen h-screen text-slate-400 antialiased text-center">
    <h1 id="title"
        class="glow-strong text-transparent top-[50%] mx-auto text-[20vmin] md:text-9xl relative top-50 translate-y-[-50%]">
      {{ config.TITLE }}</h1>
    <a target="_blank" class="absolute bottom-0 right-0 mb-1 mr-2 hover:underline text-white/[0.3] hover:text-white transition-colors" href="https://dreaming.codes">Website by Lorenzo Rizzotti</a>
    <TransitionScale easing="cubicBezier(0.3, 0.001, 0.2, 1)">
      <div v-if="animationFinished">
        <NuxtPage/>
      </div>
    </TransitionScale>
  </div>
</template>

<style lang="scss">
</style>