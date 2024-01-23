<template>
  <q-layout view="lHh Lpr lFf">
    <header-component> </header-component>

    <q-page-container class="book-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from 'components/Header.vue';
export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderComponent,
  },
});
</script>
<style scoped></style>
