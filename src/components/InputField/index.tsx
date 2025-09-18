import { Text, View, TextInput, TextInputProps } from "react-native";
import { Style } from "./Styles";

interface Props extends TextInputProps {
  texto: string;
  textoPlace: string;
  textoBaixo: string;
  secure?: boolean;
  errorMessage?: string;
  isValid?: boolean;
}

export default function InputField({
  texto,
  textoPlace,
  textoBaixo,
  secure,
  errorMessage,
  isValid = true,
  ...rest
}: Props) {
  return (
    <View style={Style.componentContainer}>
      <Text style={Style.textTop}>{texto}</Text>

      <View style={[Style.inputContainer, !isValid ? Style.inputError : null]}>
        <TextInput
          style={Style.textInput}
          placeholder={textoPlace}
          placeholderTextColor="#888"
          secureTextEntry={secure}
          {...rest}
        />
      </View>

      <Text style={Style.textBottom}>{textoBaixo}</Text>
    </View>
  );
}
