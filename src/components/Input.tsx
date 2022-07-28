//IIpuntProps serve para conseguir ver as propriedades que consigo acessar
import { Input as NativeBaseInput, IInputProps } from 'native-base';

//...rest serve para conseguir passar propriedades e valores diferentes para cada componente
export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput 
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      //pseudo propriedade
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700"
      }}
      {...rest}
    />
  );
}