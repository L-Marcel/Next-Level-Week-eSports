import { GameRouteProps } from "../screens/Home";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: GameRouteProps;
    }
  }
}