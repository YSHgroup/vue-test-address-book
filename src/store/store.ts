import { reactive, computed } from 'vue';
import { createPinia, defineStore } from 'pinia';
import uniqueId from 'lodash.uniqueid';
import {
  openIndexedDB,
  getDataFromDatabase,
  addToDatabase,
  deleteDataFromDatabase,
  updateData as UpdataDataInDB,
} from 'src/dbManagement';
import type { AddressState } from 'src/models';

const pinia = createPinia();

const dummy = [
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

export const useAddressStore = defineStore('address', () => {
  const state = reactive<AddressState>({
    searchStr: '',
    addressList: [],
  });

  function search(payload: string) {
    state.searchStr = payload;
  }
  async function openDB() {
    await openIndexedDB();
  }
  async function addData(data: any) {
    await addToDatabase(data);
    await loadData();
  }
  async function updateData({
    addressId,
    address,
  }: {
    addressId: string;
    address: any;
  }) {
    await UpdataDataInDB(addressId, address);
    await loadData();
  }
  async function deleteData(id: string) {
    await deleteDataFromDatabase(id);
    await loadData();
  }
  async function loadData() {
    try {
      await openIndexedDB();
      const data = await getDataFromDatabase();
      if (!data.length) throw new Error('No data in IndexedDB');
      state.addressList = [...data];
      console.log('pinia data from indexedDB: ', state.addressList);
    } catch (error) {
      console.log(error);
      state.addressList = [...dummy];
    }
  }
  const getData = computed(() => {
    const data = state.addressList.filter((address) => {
      console.log(
        '---->',
        Object.values(address)
          .map((item) => (isObject(item) ? Object.values(item) : item))
          .flat()
          .join()
          .includes('')
      );
      return Object.values(address)
        .map((item) => (isObject(item) ? Object.values(item) : item))
        .flat()
        .join()
        .includes(state.searchStr);
    });
    console.log('seach--> ', data);
    return data;
  });
  return {
    openDB,
    addData,
    deleteData,
    loadData,
    updateData,
    search,
    getData,
  };
});

function isObject(value: any) {
  return value && typeof value === 'object' && value.constructor === Object;
}

export default pinia;
