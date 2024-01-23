import { openDB } from 'idb';
import { uniqueId } from 'src/utils/uniqueId';
import { Address } from 'src/models';

export async function openIndexedDB() {
  const db = await openDB('myAddressDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('addressStore')) {
        db.createObjectStore('addressStore', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
  return db;
}

export async function addToDatabase(data: Address) {
  const db = await openIndexedDB();
  const tx = db.transaction('addressStore', 'readwrite');
  const store = tx.objectStore('addressStore');
  const preId =(await store.getAll()).map(item => item.id)
  data.id = uniqueId( preId[preId.length-1] ,'address-');
  await store.add(data);
  await tx.done;
}

export async function getDataFromDatabase() {
  const db = await openIndexedDB();
  const tx = db.transaction('addressStore', 'readonly');
  const store = tx.objectStore('addressStore');
  const data = await store.getAll();
  await tx.done;
  return data;
}

export async function deleteDataFromDatabase(id: string) {
  const db = await openIndexedDB();
  const tx = db.transaction('addressStore', 'readwrite');
  const store = tx.objectStore('addressStore');
  await store.delete(id);
  await tx.done;
}

export async function updateData(id: string, newData: Address) {
  try {
    const db = await openIndexedDB();
    const tx = db.transaction('addressStore', 'readwrite');
    const store = tx.objectStore('addressStore');

    // Retrieve the existing data using the provided ID
    let existingData = await store.get(id);

    // Modify the desired properties of the existing data
    existingData = newData;

    // Update the modified data in the object store
    await store.put(existingData);

    // Complete the transaction
    await tx.done;

  } catch (error) {
    console.error('Error updating data:', error);
  }
}
