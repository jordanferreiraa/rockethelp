//useState para utilizar estado
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
//exportação default, por isso não tem chave
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//para as navegações
import { useNavigation } from '@react-navigation/native';
//HStack deixa os elementos um do lado do outro
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoreDateFormat';

import Logo from '../assets/logo_secondary.svg'

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';

export function Home() {
  const [isloading, setIsLoading] = useState(true);
  //função de atualização de estado, ela so vai receber open ou closed
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');

  const [orders, setOrders] =useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  //função para navegação
  function handleNewOrder(){
    navigation.navigate('new');
  }
  //função para navegação. indo para a tela de details e levando o orderId para lá
  function handleOpenDetails(orderId: string){
    navigation.navigate('details', { orderId });
  }
  function handleLogout(){
    auth().signOut()
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possível sair.');
    });
  }

  useEffect(() => {
    //o loading também vai está habilitado aqui, para aparecer quando o usuário trocar os filtros(em andamento ou finalizado)
    setIsLoading(true)
    //ir no firestore, na coleção orders, onde o status é igual ao statusSelected
    const subscriber = firestore()
    .collection('orders')
    .where('status', '==', statusSelected)
    .onSnapshot(snapshot => { //atualiza os dados em tempo real
      //percorrendo os docs retornados baseados no filtro. Percorrendo cada um deles para formatar e salvando no "data"
      const data = snapshot.docs.map(doc => {
        const { patrimony, description, status, created_at } = doc.data();

        return {
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at)
        }
      });
      setOrders(data);
      setIsLoading(false);
    });
    //retornando o método de limpeza
    return subscriber;
  },[statusSelected]) //nessa linha o statusSelected está como uma dependencia do useEffect

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter 
            type="closed"
            title="finalizado"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {
          isloading ? <Loading /> :
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'}
                  solicitação {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        }

        <Button title="nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}