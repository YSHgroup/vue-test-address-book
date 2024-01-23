<template>
  <q-item
    class="q-ma-sm bg-white shadow-1 rounded-borders cursor-pointer"
    style="border-radius: 16px"
  >
    <q-item-section avatar class="gt-xs">
      <q-avatar color="blue" text-color="white" icon="person" />
    </q-item-section>
    <q-item-section class="col-2" style="flex-grow: 1">
      <q-item-label class="q-mt-sm" lines="1">
        {{ address ? address.name.first + ' ' + address.name.last : 'Unknown' }}
      </q-item-label>
    </q-item-section>
    <q-item-section style="flex-grow: 4">
      <q-item-label caption>
        {{ address ? address.email : 'Unknown' }}
      </q-item-label>
      <q-item-label caption>
        {{ address ? address.phone : 'Unknown' }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-blue-8 q-gutter-xs">
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="edit"
          @click="modal = true"
        />
        <address-modal v-model:card-state="modal" :addressInfo="address" />

        <q-btn
          size="12px"
          flat
          dense
          round
          @click="confirm = true"
          icon="delete"
        />
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section
              ><h6 class="text-primary">
                Do you want to delete this address?
              </h6></q-card-section
            >
            <q-separator />
            <q-card-actions class="text-white" align="right">
              <q-btn
                flat
                label="Yes"
                class="bg-warning"
                @click="deleteAddress"
              ></q-btn>
              <q-btn flat label="Cancel" class="bg-primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-item-section>
  </q-item>
  <q-separator color="blue-4" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAddressStore } from 'src/store/store';
import AddressModal from './childcomponents/Modal.vue';
import type { Address } from '../models';
export default defineComponent({
  name: 'AddressItem',
  components: { AddressModal },
  props: {
    address: {
      required: true,
      type: Object as () => Address,
    },
  },
  setup(props) {
    const addressStore = useAddressStore();
    const modal = ref(false);
    const confirm = ref(false);
    const deleteAddress = async () => {
      await addressStore.deleteData(props.address.id);
      confirm.value = false;
    };
    return { modal, confirm, deleteAddress };
  },
});
</script>
<style></style>
