///Para utilizar estados
import { useState } from 'react';

import { Alert } from 'react-native';

//Para utilizar a autenticação do firebase
import auth from '@react-native-firebase/auth';

//VStack empilha os elementos na vertical
//useTheme para acessar as cores
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key} from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

//todo componente é uma função. Componentes começam com letra maiuscula e não podem retornar mais de um elementos
export function SignIn(){
  //estado para informar o carregamento, enquanto está verificando o BD para concluir o login.
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {colors} = useTheme();

  function handleSignIn() {
    //caso o usuario esqueça de digitar o email ou a senha
    if(!email || !password) {
      return Alert.alert('Entrar', 'Informe o e-mail e senha.');
    }

    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      if(error.code === 'auth/invalid-email'){
        return Alert.alert('Entrar', 'E-mail inválido.');
      }
      if(error.code === 'auth/wrong-password'){
        return Alert.alert('Entrar', 'E-mail ou senha inválida.');
      }
      if(error.code === 'auth/user-not-found'){
        return Alert.alert('Entrar', 'E-mail ou senha inválida.');
      }

      return Alert.alert('Não foi possível acessar');

    })
  }

  return(
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" marginTop={20} marginBottom={6}>
        Acesse sua conta
      </Heading>

      <Input 
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4} />}
        //propriedade do input que observa toda vez q o conteudo muda e passa esse conteudo para alguma coisa
        onChangeText={setEmail}
      />
      <Input 
        mb={8}
        placeholder="Senha" 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4} />}
        //os caracteres secretos da senha
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title="Entrar" 
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading} 
      />

    </VStack>
  )
}