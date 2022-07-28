import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
  //screenOptions={{ headerShown: false}} para tira o nome "home" que ficou em cima da aplicação
  return(
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  )
}