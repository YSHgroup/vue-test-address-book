import { openDB } from 'idb';

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

export async function addToDatabase(data: any) {
  const db = await openIndexedDB();
  const tx = db.transaction('addressStore', 'readwrite');
  const store = tx.objectStore('addressStore');
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

export async function updateData(id: string, newData: any) {
  try {
    const db = await openIndexedDB();
    const tx = db.transaction('addressStore', 'readwrite');
    const store = tx.objectStore('addressStore');

    // Retrieve the existing data using the provided ID
    let existingData = await store.get(id);

    console.log('exist data-->', existingData);
    // Modify the desired properties of the existing data
    existingData = newData;

    console.log('changed data-->', existingData);
    // Update the modified data in the object store
    await store.put(existingData);

    // Complete the transaction
    await tx.done;

    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
