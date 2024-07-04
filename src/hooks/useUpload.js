import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



const storage = getStorage();
const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;