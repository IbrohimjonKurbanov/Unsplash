import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
export const useFireStore = () => {
  const addDocument = (collectionName, id, data) => {
    setDoc(doc(db, collectionName, id), data)
      .then(() => {
        toast.success("You liked this image ❤");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deleteDocument = (collectionName, id) => {
    deleteDoc(doc(db, collectionName, id))
      .then(() => {
        toast.success("You deleted this image 🗑");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return { addDocument, deleteDocument };
};
