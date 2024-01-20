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
import { isObject } from 'src/utils/functions';

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
    } catch (error) {
      console.log(error);
      state.addressList = [];
    }
  }
  const getData = computed(() => {
    const data = state.addressList.filter((address) => {
      return Object.values(address)
        .map((item) => (isObject(item) ? Object.values(item) : item))
        .flat()
        .slice(1)
        .join()
        .includes(state.searchStr);
    });
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

export default pinia;
