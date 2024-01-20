<template>
  <q-header elevated class="glossy" style="padding: 10px; color: white">
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
      <!-- {{ card }} -->
      <address-modal v-model:card-state="card" />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  Ref,
  onUpdated,
  watch,
  onMounted,
  computed,
} from 'vue';
import AddressModal from './childcomponents/Modal.vue';
import { Address } from '../models';
import { useAddressStore } from 'src/store/store';
export default defineComponent({
  name: 'HeaderComponent',
  components: { AddressModal },
  setup(props, { emit }) {
    const search = ref('');
    const card = ref(false);
    const addressStore = useAddressStore();
    // const addAddress = (address: Address) => {
    //   emit('');
    // };
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
