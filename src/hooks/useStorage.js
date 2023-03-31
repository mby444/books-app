import { useEffect, useState } from "react";
import {
  deleteStorage,
  getStorageData,
  setStorageData,
} from "../utils/storage";

const useStorage = (key) => {
  const [storage, setStorage] = useState("");

  useEffect(() => {
    (async () => {
      const storageData = await getStorageData(key);
      if (storageData) setStorage(storageData);
    })();
  }, []);

  const output = {
    value: storage,
    set(value) {
      setStorageData(key, value).then(() => setStorage(value));
    },
    clear() {
      deleteStorage(key).then(() => setStorage(""));
    },
  };

  return output;
};

export default useStorage;
