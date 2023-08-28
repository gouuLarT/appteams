import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string){
  try{
    const storedGroups = await groupGetAll();

    const groupAlreadyExist = storedGroups.includes(newGroup);

    if(groupAlreadyExist){
      throw new AppError('There is already a group registered with this name.')
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  }catch(error){
    throw error;
  }
}