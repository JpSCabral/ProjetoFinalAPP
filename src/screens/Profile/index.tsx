import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Styles";

export function ProfileScreen() {
  // In the future, you can replace these with dynamic user data from Supabase
  const user = {
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "1998-06-14",
    weight: 72,
    height: 178,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{user.dateOfBirth}</Text>

        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{user.weight} kg</Text>

        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{user.height} cm</Text>
      </View>
    </View>
  );
}
