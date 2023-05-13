import { UserDTO } from '@dtos/UserDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_STORAGE } from '@storage/storageConfig';

export const storageUserSave = async (user: UserDTO): Promise<void> => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async (): Promise<UserDTO> => {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
};

export const storageUserClear = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
