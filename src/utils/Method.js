import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    // saving error
  }
};
