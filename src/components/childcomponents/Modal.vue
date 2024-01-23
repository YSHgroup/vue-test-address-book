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
            :rules="nameRules"
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
            :rules="emailRules"
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
            :rules="phoneRules"
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
import { useAddressStore } from '../../store/store';
import { Address } from 'src/models';
import { isValidated } from 'src/utils/functions';
import { useQuasar } from 'quasar';

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
    const card = toRef(props, 'cardState');
    const id = ref(props.addressInfo?.id);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const firstName = ref(
      props.addressInfo ? props.addressInfo.name.first : ''
    );
    const lastName = ref(props.addressInfo ? props.addressInfo.name.last : '');
    const email = ref(props.addressInfo ? props.addressInfo.email : '');
    const phone = ref(props.addressInfo ? props.addressInfo.phone : '');
    const $q = useQuasar();
    
    const triggerNegative = () => {
      $q.notify({
        type: 'negative',
        position: 'top',
        message: 'Please check all details for validation purposes.',
      });
    };

    const saveAddress = async () => {
      if (
        !isValidated({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
        })
      ) {
        return triggerNegative();
      }
      const first = firstName.value[0].toUpperCase().concat(firstName.value.slice(1))
      const last = lastName.value[0].toUpperCase().concat(lastName.value.slice(1))
      const address: Address = {
        id: '',
        name: { first, last },
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
    };
    watch(card, (card) => {
      internalCard.value = card;
    });
    watch(internalCard, (newValue: boolean) => {
      firstName.value = props.addressInfo ? props.addressInfo.name.first : '';
      lastName.value = props.addressInfo ? props.addressInfo.name.last : '';
      email.value = props.addressInfo ? props.addressInfo.email : '';
      phone.value = props.addressInfo ? props.addressInfo.phone : '';
      emit('update:cardState', newValue);
    });
    return {
      internalCard,
      firstName,
      lastName,
      email,
      phone,
      prompt: ref(false),
      emailPattern,
      nameRules: [
        (val: string) => (val && val.length > 0) || 'Please type Name',
        (val: string) => (val && val.length >= 3) || 'Please enter 3 or more',
        (val: string) => (val && /^[a-z]+$/gi.test(val)) || 'String only',
      ],
      emailRules: [
        (val: string) =>
          (val && emailPattern.test(val)) || 'Invalid email format',
      ],
      phoneRules: [
        () => (phone.value.replace(/[-()\s]/g,'').length>=10) || 'Invalid phone number format'
      ],
      saveAddress,
    };
  },
});
</script>

<style scoped></style>
