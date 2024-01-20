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
      <q-list>
        <address-item
          v-for="item in addressList"
          :key="item.id"
          :address="item"
        />
      </q-list>
      <q-btn @click="putData" class="q-mt-sm" label="PutExample" />
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  Ref,
  onMounted,
  onBeforeMount,
  toRef,
  reactive,
} from 'vue';
import uniqueId from 'lodash.uniqueid';
import { useAddressStore } from '../store/store';
import { Address } from 'src/models';
import AddressItem from '../components/AddressItem.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { AddressItem },
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
    const putData = async () => {
      const data = {
        id: uniqueId('address-'),
        name: { first: 'John', last: 'Doe' },
        email: 'johndoe@gmail.com',
        phone: '+1 607 821 0404',
      };
      await addressState.addData(data);
    };

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
      putData,
    };
  },
});
</script>

<style scoped></style>
