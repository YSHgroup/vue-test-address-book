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
      {{ counter.count }}
      <q-btn @click="counter.increment()" label="Increment" />
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import uniqueId from 'lodash.uniqueid';
import { useCounterStore } from '../store/store';
import { Address } from 'src/components/models';
import AddressItem from '../components/AddressItem.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { AddressItem },
  setup() {
    const counter = useCounterStore();
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
    let addressList: Address[] = [
      {
        id: uniqueId('address-'),
        name: { first: 'John', last: 'Doe' },
        email: 'johndoe@gmail.com',
        phone: '+1 607 821 0404',
      },
      {
        id: uniqueId('address-'),
        name: { first: 'James', last: 'Brown' },
        email: 'sunlighter0218@gmail.com',
        phone: '+44 607 821 0404',
      },
    ];
    return { style, addressList, counter };
  },
});
</script>

<style scoped>
.scroll-wrapper {
  /* height: ;
  width: 100vw; */
}
</style>
