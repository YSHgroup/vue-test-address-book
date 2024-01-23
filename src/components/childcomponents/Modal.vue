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
            :readonly="!!addressInfo?.id"
            label="First Name"
            :rules="nameRules"
            autofocus
            clearable
            @keyup.enter="prompt = false"
          />
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="lastName"
            label="Last Name"
            clearable
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
            clearable
            @keyup.enter="prompt = false"
          />
          <q-input
            class="q-ma-sm"
            style="width: 200px"
            dense
            v-model="phone"
            label="Phone Number"
            mask="(###) ### - ####"
            clearable
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
import { defineComponent, ref, toRef, watch } from 'vue';
import { useAddressStore } from 'src/store/store';
import { Address } from 'src/models';

export default defineComponent({
  name: 'AddressModal',
  props: {
    cardState: { required: true, type: Boolean },
    addressInfo: { required: false, type: Object as () => Address },
  },
  emits: ['update:cardState'],
  setup(props, { emit }) {
    const addressStore = useAddressStore();
    const internalCard = ref(false);
    let card = toRef(props, 'cardState');
    const id = ref(props.addressInfo?.id);
    let firstName = ref(props.addressInfo ? props.addressInfo.name.first : '');
    let lastName = ref(props.addressInfo ? props.addressInfo.name.last : '');
    let email = ref(props.addressInfo ? props.addressInfo.email : '');
    let phone = ref(props.addressInfo ? props.addressInfo.phone : '');

    const saveAddress = async () => {
      if(firstName.value.length <3) return
      const address: Address = {
        id: '',
        name: { first: firstName.value, last: lastName.value },
        email: email.value,
        phone: phone.value,
      };
      if (!!id.value) {
        const addressId = id.value;
        address.id = addressId;
        await addressStore.updateData({ addressId, address });
      } else {
        await addressStore.addData(address);
      }
      emit('update:cardState', false);
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      phone.value = ''
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
      nameRules: [
        (val: string) => (val && val.length > 0) || 'Please type Name',
        (val: string) => (val && val.length >= 3) || 'Please enter 3 or more',
        (val: string) => (val && /^[a-z]+$/gi.test(val)) || 'String only',
      ],
      saveAddress,
    };
  },
});
</script>

<style scoped></style>
