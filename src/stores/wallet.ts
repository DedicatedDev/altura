import {create} from 'zustand';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import Keychain from 'react-native-keychain';
import Aes from 'react-native-aes-crypto';

interface WalletState {
  provider: ethers.providers.JsonRpcProvider | undefined;
  wallet: ethers.Wallet | undefined;
  createWallet: (pinCode: string) => Promise<void>;
  checkRestoreMode: () => Promise<boolean>;
  restoreWallet: (pinCode: string) => Promise<void>;
  recoverWallet: (mnemonic: string) => void;
}
const useWalletStore = create<WalletState>()(set => ({
  wallet: undefined,
  provider: new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/0LCd9cGRmF1MulGiFcQ0jQ6QpiDn3tTN',
  ),
  createWallet: async (pinCode: string) => {
    const wallet = ethers.Wallet.createRandom();

    //store wallet information to storage.
    const cipher = await encrypt(wallet.mnemonic!.phrase, pinCode);
    await Keychain.setGenericPassword('wallet', cipher);
    set(state => ({...state, wallet}));
  },
  recoverWallet: (mnemonic: string) => {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    set(state => ({...state, wallet}));
  },
  restoreWallet: async (pinCode: string) => {
    const key = await generateKey(pinCode, 'salt', 5000, 256);
    const data = await Keychain.getGenericPassword();
    if (data) {
      const mnemonic = await decrypt(data.password, key);
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      console.log('wallet', wallet.address);
      set(state => ({...state, wallet}));
    } else {
      console.log(data);
    }
  },
  checkRestoreMode: async () => {
    const data = await Keychain.getGenericPassword();
    if (data) {
      return true;
    }
    return false;
  },
}));

const encrypt = async (text: string, pinCode: string) => {
  try {
    const key = await generateKey(pinCode, 'salt', 5000, 256);
    const iv = (await Aes.sha256(key)).slice(0, 32);
    const cipher = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
    console.log(cipher);
    return cipher;
  } catch (error) {
    console.log(error);
  }
};

const decrypt = async (cipher: string, key: string) => {
  const iv = (await Aes.sha256(key)).slice(0, 32);
  const mnemonic = await Aes.decrypt(cipher, key, iv, 'aes-256-cbc');
  return mnemonic;
};

const generateKey = (
  password: string,
  salt: string,
  cost: number,
  length: number,
) => Aes.pbkdf2(password, salt, cost, length);

export default useWalletStore;
