import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';
import { SignIn } from '../screens/SignIn';

import { AppRoutes } from './app.routes';

//aqui vamos definir quais rotas vão ser exibidas, se o usuário estiver conectado vai mostar o AppRoutes, se não estiver, vai mostrar a SignIn
export function Routes(){
  //estado para armazenar a informação de q está carregando. E já vai começar com true
  const [loading, setIsLoading] = useState(true);
  //estado para armazenar se o usuário está logado ou não
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    //verificando se o usuário está autenticado. Se ele ta autenticado, eu tô salvando dentro de user
    const subscribe = auth().onAuthStateChanged(response => {
      setUser(response);
      setIsLoading(false);
    })

    return subscribe;
  },[])

  //so vai entrar nesse if quando o loading for true
  if(loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}