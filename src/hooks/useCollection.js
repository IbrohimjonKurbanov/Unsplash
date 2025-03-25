import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    onSnapshot(collection(db, collectionName), (spanshot) => {
      const queryData = [];
      spanshot.forEach((doc) => {
        queryData.push({ id: doc.id, ...doc.data() });
      });
      setData(queryData);
    });
  }, []);

  return { data };
};
