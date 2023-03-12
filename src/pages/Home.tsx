import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useWalletStore from '../stores/wallet';
import {navigate} from '../utils/helper';

import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

const Home = () => {
  const {wallet, provider, checkRestoreMode} = useWalletStore();
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const insets = useSafeAreaInsets();
  const [refresh, setRefresh] = useState<boolean>(false);

  const getBalance = async () => {
    if (wallet?.address === undefined || provider === undefined) {
      return;
    }
    const balance = await provider.getBalance(wallet.address);
    setBalance(+ethers.utils.formatEther(balance));
  };
  const checkWalletRestoreMode = async () => {
    const isRecover = await checkRestoreMode();
    if (isRecover) {
      navigate('PinAsk');
    }
  };
  useEffect(() => {
    //checkWalletRestoreMode();
    setShowMnemonic(false);
    getBalance();
    return () => {
      setShowMnemonic(false);
    };
  }, []);

  useEffect(() => {
    getBalance();
  }, [wallet]);

  return (
    <SafeAreaView>
      <View className="flex w-full h-full px-10 alinge">
        <ScrollView
          className="top-10"
          refreshControl={
            <RefreshControl
              progressViewOffset={insets.top}
              refreshing={refresh}
              onRefresh={async () => {
                setRefresh(true);
                await getBalance();
                setRefresh(false);
              }}
            />
          }>
          <Text className="p-10 text-center">Altura Mock Wallet</Text>
          <View>
            <View className="flex-row justify-between">
              <Text>Wallet Address</Text>
              <TouchableHighlight
                onPress={() => {
                  if (wallet?.address !== undefined) {
                    Clipboard.setString(wallet?.address);
                  }
                }}>
                <Text className="px-2">Copy</Text>
              </TouchableHighlight>
            </View>
            <Text>{wallet?.address}</Text>
          </View>
          <View className="flex-row mt-3">
            <Text>Wallet balance: </Text>
            <Text className="px-5">{balance}ETH</Text>
          </View>
          {showMnemonic && (
            <View className="my-10 border-black">
              <View className="flex-row justify-between">
                <Text>Mnemonic</Text>
                <TouchableHighlight
                  onPress={() => {
                    if (wallet?.address !== undefined) {
                      Clipboard.setString(wallet?.mnemonic.phrase);
                    }
                  }}>
                  <Text className="px-2">Copy</Text>
                </TouchableHighlight>
              </View>
              <Text>{wallet?.mnemonic.phrase}</Text>
            </View>
          )}

          <TouchableHighlight
            onPress={() => {
              navigate('PinCode', {});
            }}
            className="mt-10">
            <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
              Create New Wallet
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            className="mt-10"
            onPress={() => {
              navigate('Recover');
            }}>
            <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
              Recover Wallet
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            className="mt-10"
            onPress={() => {
              setShowMnemonic(!showMnemonic);
            }}>
            <Text className="px-3 py-4 text-center text-white bg-green-600 rounded-md">
              {!showMnemonic ? 'Show Mnemonic' : 'Hide Mnemonic'}
            </Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Home;
