import {create} from 'zustand';

interface GlobalState {
  loading: boolean;
  setLoading: (loading: boolean) => Promise<void>;
}
const useGlobalStore = create<GlobalState>()(set => ({
  loading: false,
  setLoading: async (loading: boolean) => {
    set(state => ({...state, loading}));
  },
}));

export default useGlobalStore;
