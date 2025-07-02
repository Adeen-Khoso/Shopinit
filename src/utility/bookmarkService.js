// import { db } from "../firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   getDoc,
// } from "firebase/firestore";

// // 👉 Add bookmark to Firestore
// export const addBookmark = async (userId, product) => {
//   try {
//     await addDoc(collection(db, "bookmarks"), {
//       userId,
//       ...product,
//     });
//   } catch (err) {
//     console.error("Error adding bookmark:", err);
//   }
// };

// // 👉 Get all bookmarks for a user
// export const getBookmarks = async (userId) => {
//   try {
//     const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (err) {
//     console.error("Error fetching bookmarks:", err);
//     return [];
//   }
// };

// // 👉 Remove a bookmark (based on productId and userId)
// export const removeBookmark = async (userId, productId) => {
//   try {
//     const q = query(
//       collection(db, "bookmarks"),
//       where("userId", "==", userId),
//       where("id", "==", productId)
//     );
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach(async (docSnap) => {
//       await deleteDoc(doc(db, "bookmarks", docSnap.id));
//     });
//   } catch (err) {
//     console.error("Error removing bookmark:", err);
//   }
// };

// export const isProductBookmarked = async (userId, productId) => {
//   try {
//     const docRef = doc(db, "bookmarks", userId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const bookmarks = docSnap.data().items || [];
//       return bookmarks.some((product) => product.id === productId);
//     }

//     return false;
//   } catch (error) {
//     console.error("Error checking bookmark status:", error);
//     return false;
//   }
// };

import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// 1) Add bookmark: create or overwrite /users/{userId}/bookmarks/{productId}
export const addBookmark = async (userId, productId) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", productId);
    await setDoc(ref, { createdAt: Timestamp.now() });
    console.log(`Bookmarked product ${productId}`);
  } catch (err) {
    console.error("Error adding bookmark:", err);
  }
};

// 2) Remove bookmark: delete that doc
export const removeBookmark = async (userId, productId) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", productId);
    await deleteDoc(ref);
    console.log(`Removed bookmark for ${productId}`);
  } catch (err) {
    console.error("Error removing bookmark:", err);
  }
};

// 3) Check if bookmarked: just get the doc and see if it exists
export const isProductBookmarked = async (userId, productId) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", productId);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch (err) {
    console.error("Error checking bookmark:", err);
    return false;
  }
};

// 4) Get all bookmarked IDs for a user
export const getBookmarkedIds = async (userId) => {
  try {
    const q = collection(db, "users", userId, "bookmarks");
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.id); // each doc ID is a productId
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    return [];
  }
};
