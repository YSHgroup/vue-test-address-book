<template>
  <!-- <q-btn flat dense round icon="group_add" @click="card = true" /> -->
  <q-dialog v-model="internalCard">
    <q-card class="my-card">
      <q-card-section
        class="flex justify-content-center bg-grey-8 text-white align-center"
      >
        <div class="text-h6">
          {{ addressInfo ? 'Address Edit' : 'New Address' }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <div class="row">
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="firstName"
            label="First Name"
            autofocus
            @keyup.enter="prompt = false"
          />
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="lastName"
            label="Last Name"
            @keyup.enter="prompt = false"
          />
        </div>
        <div class="row">
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="email"
            label="E-mail"
            autofocus
            @keyup.enter="prompt = false"
          />
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="phone"
            label="Phone Number"
            @keyup.enter="prompt = false"
          />
        </div>
      </q-card-section>

      <q-card-actions class="text-grey-8 justify-end">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Save address" @click="saveAddress" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch, Ref } from 'vue';
import uniqueId from 'lodash.uniqueid';
import { Address } from '../models';

export default defineComponent({
  name: 'AddressModal',
  props: {
    cardState: { required: true, type: Boolean },
    addressInfo: { required: false, type: Object as () => Address },
  },
  emits: ['update:cardState', 'save-address'],
  setup(props, { emit }) {
    const internalCard = ref(false);
    let card = toRef(props, 'cardState');
    let firstName = ref(props.addressInfo ? props.addressInfo.name.first : '');
    let lastName = ref(props.addressInfo ? props.addressInfo.name.last : '');
    let email = ref(props.addressInfo ? props.addressInfo.email : '');
    let phone = ref(props.addressInfo ? props.addressInfo.phone : '');

    const saveAddress = () => {
      const address: Address = {
        id: uniqueId('address-'),
        name: { first: firstName.value, last: lastName.value },
        email: email.value,
        phone: phone.value,
      };
      emit('save-address', address);
    };
    watch(card, (card) => {
      internalCard.value = card;
    });
    watch(internalCard, (newValue: boolean) => {
      emit('update:cardState', newValue);
    });
    return {
      internalCard,
      firstName,
      lastName,
      email,
      phone,
      prompt: ref(false),
      saveAddress,
    };
  },
});
</script>

<style scoped></style>
