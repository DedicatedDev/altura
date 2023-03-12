import {useState} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useWalletStore from '../stores/wallet';
import {navigate, navigatePop} from '../utils/helper';
import useGlobalStore from '../stores/app';
import Overlay from '../components/button/Overlayer';
const PinCode = ({recoverMode = false}: {recoverMode: boolean}) => {
  const {createWallet} = useWalletStore();
  const {loading, setLoading} = useGlobalStore();

  const [pinInfo, setPinInfo] = useState<{pin: string; confirm: string}>({
    pin: '',
    confirm: '',
  });

  const setPinCode = (pin: string) => {
    setPinInfo(state => ({...state, pin}));
  };
  const setConfirmPin = (confirmPin: string) => {
    setPinInfo(state => ({...state, confirmPin}));
  };

  const create = async () => {
    if (pinInfo.confirm !== pinInfo.confirm || pinInfo.pin.length < 8) {
      return;
    }
    try {
      setLoading(true);
      createWallet(pinInfo.pin);
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
        {!recoverMode && (
          <View className="mt-10">
            <Text>Confirm</Text>
            <TextInput
              className="p-3 border border-black rounded-md"
              onChangeText={setConfirmPin}></TextInput>
          </View>
        )}
        <TouchableHighlight className="mt-10" onPress={create}>
          <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
            Next
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="mt-10"
          onPress={() => {
            navigatePop();
          }}>
          <Text className="px-3 py-4 text-center text-white bg-red-600 rounded-md">
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
      <Overlay isLoading={loading} />
    </SafeAreaView>
  );
};
export default PinCode;
