import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
}

export function Header({ title, ...rest}: Props) {
  const { colors } = useTheme();
  const navegation = useNavigation();

  //função para voltar de tela. O proprio navegation já tem uma função que facilita isso "navegation.goBack()"
  function handleGoBack(){
    navegation.goBack();
  }

  return (
    <HStack 
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton 
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
      />

      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-6} >
        {title}
      </Heading>

    </HStack>
  );
}