import {useState} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useWalletStore from '../stores/wallet';
import {navigate} from '../utils/helper';
import Overlay from '../components/button/Overlayer';
import useGlobalStore from '../stores/app';

const PinAsk = () => {
  const {restoreWallet} = useWalletStore();
  const {loading, setLoading} = useGlobalStore();
  const [pin, setPin] = useState('');

  const setPinCode = (pin: string) => {
    setPin(pin);
  };

  const recover = async () => {
    if (pin.length < 8) {
      return;
    }
    try {
      setLoading(true);
      await restoreWallet(pin);
    } catch (error) {}
    setLoading(false);
    navigate('Home');
  };
  return (
    <SafeAreaView>
      <View className="flex justify-center w-full h-full px-10 alinge">
        <View>
          <Text>PinCode</Text>
          <TextInput
            className="p-3 border border-black rounded-md"
            onChangeText={setPinCode}></TextInput>
        </View>
        <TouchableHighlight className="mt-10" onPress={recover}>
          <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
            Confirm
          </Text>
        </TouchableHighlight>
        <Overlay isLoading={loading} />
      </View>
    </SafeAreaView>
  );
};
export default PinAsk;
