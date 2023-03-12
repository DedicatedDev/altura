import {useState} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useWalletStore from '../stores/wallet';
import {navigate, navigatePop} from '../utils/helper';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const RecoverSeed = () => {
  const {recoverWallet} = useWalletStore();
  const [mnemonic, setMnemonic] = useState('');

  const setSeed = (mnemonic: string) => {
    setMnemonic(mnemonic);
  };

  const recover = async () => {
    recoverWallet(mnemonic);
    navigate('Home');
  };

  return (
    <SafeAreaView>
      <View className="flex justify-center w-full h-full px-10 alinge">
        <View>
          <Text>Mnemonic</Text>
          <TextInput
            className="p-3 border border-black rounded-md"
            onChangeText={setSeed}></TextInput>
        </View>
        <TouchableHighlight className="mt-10" onPress={recover}>
          <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
            Recover
          </Text>
        </TouchableHighlight>

        <TouchableHighlight className="mt-10" onPress={navigatePop}>
          <Text className="px-3 py-4 text-center text-white bg-red-600 rounded-md">
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
export default RecoverSeed;
