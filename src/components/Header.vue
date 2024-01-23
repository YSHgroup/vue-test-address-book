<template>
  <q-header
    elevated
    class="glossy border-top-sm"
    style="padding: 10px; color: white"
  >
    <q-toolbar>
      <q-toolbar-title> Address Book </q-toolbar-title>
      <q-input
        color="white"
        input-style="color: white"
        label-color="white"
        label="search"
        v-model.lazy.trim="search"
      >
        <template v-slot:prepend>
          <q-icon color="white" name="search" />
        </template>
      </q-input>
      <q-btn flat dense round icon="group_add" @click="card = true" />
      <address-modal v-model:card-state="card" />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import AddressModal from './childcomponents/Modal.vue';
import { useAddressStore } from '../store/store';
export default defineComponent({
  name: 'HeaderComponent',
  components: { AddressModal },
  setup() {
    const search = ref('');
    const card = ref(false);
    const addressStore = useAddressStore();
    watch(search, (value) => {
      addressStore.search(value);
    });
    return {
      card,
      search,
    };
  },
});
</script>
