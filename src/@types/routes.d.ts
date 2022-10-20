import { IAlert } from '../Screens/Home';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Chat: { data: IAlert };
    }
  }
}
