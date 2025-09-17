import { Text, View, TextInput, TextInputProps } from "react-native";
import { Component } from "react";
import { Style } from "./Styles";

interface Props extends TextInputProps {
  texto: string;
  textoPlace: string;
  textoBaixo: string;
  secure?: boolean;
}

export default function InputField({
  texto,
  textoPlace,
  textoBaixo,
  secure,
  ...rest
}: Props) {
  return (
    <View style={Style.container}>
      <Text style={Style.textTop}>{texto}</Text>
      <TextInput
        style={Style.textPlace}
        placeholder={textoPlace}
        secureTextEntry={secure}
        {...rest}
      />
      <Text style={Style.textBottom}>{textoBaixo}</Text>
    </View>
  );
}
