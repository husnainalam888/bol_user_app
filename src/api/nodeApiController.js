import {Alert} from 'react-native';
import {mmkvStorage} from '../../Utils/Modules';
import {NodePostRequest} from '../../Utils/NodeApi';

export const toggleFollow = async (id, setLoading, setData) => {
  try {
    setLoading(true);
    const respone = await NodePostRequest(
      `auth/vendor/toggleFollow/${id}`,
      {
        userId: mmkvStorage.getMap('userData').mongo_id || 'no_id',
      },
      true,
    );
    console.log('toggleFollow() : respone', JSON.stringify(respone, null, 2));
    setLoading(false);
    if (respone.status) {
      setData(respone.data);
    } else {
      setTimeout(() => {
        Alert.alert('Error', respone.message);
      }, 1000);
    }
  } catch (e) {
    console.log(e);
    setLoading(false);
    setTimeout(() => {
      Alert.alert('Error', 'Something went wrong');
    }, 1000);
  }
};
