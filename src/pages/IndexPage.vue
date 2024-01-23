<template>
  <q-page
    padding
    class="row items-center justify-evenly bg-grey-3 scroll-wrapper"
  >
    <q-scroll-area
      :thumb-style="style.thumbStyle"
      :bar-style="style.barStyle"
      :style="{ height: '100%', width: '100%' }"
    >
      <q-list v-if="addressList.length">
        <address-item
          v-for="item in addressList"
          :key="item.id"
          :address="item"
        />
      </q-list>
      <banner-component v-else-if="addressState.getSearchStr.length === 0" />
      <h4 v-else class="text-center">Nothing matched</h4>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { useAddressStore } from '../store/store';
import { Address } from 'src/models';
import AddressItem from '../components/AddressItem.vue';
import BannerComponent from '../components/Banner.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { AddressItem, BannerComponent },
  setup() {
    const addressState = useAddressStore();
    const style = ref({
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75',
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: '0.2',
      },
    });
    let addressList = ref<Address[]>([]);

    onMounted(async () => {
      await addressState.loadData();
      const data = addressState.getData;
      addressList.value = data;
    });
    const updatedAddressList = computed(() => addressState.getData);

    watch(updatedAddressList, (val) => {
      addressList.value = val;
    });

    return {
      style,
      addressList,
      addressState,
    };
  },
});
</script>

<style scoped></style>
