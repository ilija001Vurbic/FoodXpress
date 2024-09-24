import { getDatabase, ref, set } from 'firebase/database'; // Import Realtime Database
import { productData, menuData, specialData, menuDetailedData, restaurantsData, filterData, filterData2, menu } from './Data';

const db = getDatabase(); // Initialize Realtime Database

const uploadDataToFirebase = async () => {

  productData.forEach(async (product) => {
    const productRef = ref(db, `products/${product.id}`); // Create a reference
    await set(productRef, product); // Use set instead of setDoc
  });

  menuData.forEach(async (menu) => {
    const menuRef = ref(db, `menu/${menu.key}`);
    await set(menuRef, menu);
  });

  specialData.forEach(async (special) => {
    const specialRef = ref(db, `special/${special.key}`);
    await set(specialRef, special);
  });

  menuDetailedData.forEach(async (menuDetail) => {
    const menuDetailRef = ref(db, `menuDetails/${menuDetail.id}`);
    await set(menuDetailRef, menuDetail);
  });

  restaurantsData.forEach(async (restaurantsDetail) => {
    const restaurantsDetailRef = ref(db, `restaurantDetails/${restaurantsDetail.id}`);
    await set(restaurantsDetailRef, restaurantsDetail);
  });

  filterData.forEach(async (filterDetail) => {
    const filterDetailRef = ref(db, `filter/${filterDetail.id}`);
    await set(filterDetailRef, filterDetail);
  });

  filterData2.forEach(async (filterDetail2) => {
    const filterDetail2Ref = ref(db, `filter2/${filterDetail2.id}`);
    await set(filterDetail2Ref, filterDetail2);
  });

  menu.forEach(async (menuDet) => {
    const menuDetRef = ref(db, `menuSpecifics/${menuDet.id}`);
    await set(menuDetRef, menuDet);
  });
};

export default uploadDataToFirebase;