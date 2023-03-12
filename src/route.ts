import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Home from './pages/Home';
import PinCode from './pages/PinCode';
import PinAsk from './pages/PinAsk';
import RecoverSeed from './pages/Recover';
export interface ScreenNavigation {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

const routes: ScreenNavigation[] = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'PinCode',
    component: PinCode,
  },
  {
    name: 'PinAsk',
    component: PinAsk,
  },
  {
    name: 'Recover',
    component: RecoverSeed,
  },
];

export default routes;
