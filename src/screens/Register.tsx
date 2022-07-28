import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navegation = useNavigation();

  function handleNewOrderRegister(){
    //validar se o patrimony e a description foram informados, se não, irá aparecer um alert
    if(!patrimony || !description){
      Alert.alert('Registrar', 'Preencha todos os campos');
    }
    //ativar o loading
    setIsLoading(true);
    //banco de dados
    firestore()
    .collection('orders') //se a seleção não existe, ele vai criar p nós
    .add({  //adicionando o documento na coleção
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()  //para pegar a data de quando a solicitação foi enviada
    })
    //se ocorreu tudo certo, irá mostrar essa mensagem e irá voltar para a tela inicial
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
      navegation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Não foi possível registrar o pedido');
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />
      <Input 
        placeholder="Número do patrimônio" 
        mt={4}
        //pegando o texto do input e colocando no estado
        onChangeText={setPatrimony}
      />
      <Input 
        placeholder="Descrição do problema"
        flex={1} 
        mt={5}
        multiline
        textAlignVertical="top"
        //pegando o texto do input e colocando no estado
        onChangeText={setDescription}
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}