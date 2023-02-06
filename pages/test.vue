<template>
  <div class="main-transparency absolute translate-x-1/2 w-[70%] right-1/2">
    Ciao
  <div class="mt-10 h-[70vh]">
    <div class="max-h-[100%] overflow-auto">
      <Event v-for="_ in 20" name="name" description="description" :availableSlots="3" class="my-4"/>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss">

</style>