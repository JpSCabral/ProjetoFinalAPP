import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

export function ShopList() {
  // In the future, you can replace these with dynamic user data from Supabase
  const Shops = {
    rice: 1.5,
    beans: 0.5,
    chicken: 3,
    potato: 3,
    tomato: 0.3,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Shopping list</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Rice:</Text>
        <Text style={styles.value}>{Shops.rice} kg</Text>

        <Text style={styles.label}>Beans:</Text>
        <Text style={styles.value}>{Shops.beans} kg</Text>

        <Text style={styles.label}>Chicken breast:</Text>
        <Text style={styles.value}>{Shops.chicken} kg</Text>

        <Text style={styles.label}>Potato:</Text>
        <Text style={styles.value}>{Shops.potato} kg</Text>

        <Text style={styles.label}>Tomato:</Text>
        <Text style={styles.value}>{Shops.tomato} g</Text>
      </View>
    </View>
  );
}
