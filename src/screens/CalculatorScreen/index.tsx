import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS, SPACING } from "@/constants/theme";
import {
  GenderMaleIcon,
  GenderFemaleIcon,
  CalculatorIcon,
  CheckIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDiary } from "@/contexts/DiaryContext";

// Tipos para os seletores
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extreme";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Pouco ou nenhum exercício
  light: 1.375, // Exercício leve 1-3 dias/semana
  moderate: 1.55, // Exercício moderado 3-5 dias/semana
  active: 1.725, // Exercício pesado 6-7 dias/semana
  extreme: 1.9, // Exercício muito pesado + trabalho físico
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentário (Pouco ou nada)",
  light: "Levemente Ativo (1-3 dias)",
  moderate: "Moderadamente Ativo (3-5 dias)",
  active: "Muito Ativo (6-7 dias)",
  extreme: "Extremamente Ativo (2x dia)",
};

export default function CalculatorScreen() {
  // Estados do Formulário
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("sedentary");
  const { updateGoal } = useDiary();
  const navigation = useNavigation();

  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Fórmula de Harris-Benedict
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
    setResult(Math.round(tdee));
  };

  const handleSaveMeta = () => {
    if (result) {
      updateGoal(result);

      Alert.alert("Sucesso!", `Sua meta foi atualizada para ${result} kcal.`, [
        {
          text: "OK",
          onPress: () => navigation.goBack(), // Volta para Settings automaticamente
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Calculadora TDEE</Text>
      <Text style={styles.headerSubtitle}>
        Descubra quantas calorias você gasta por dia.
      </Text>

      <Text style={styles.label}>Gênero</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.genderCard,
            gender === "male" && styles.genderCardActive,
          ]}
          onPress={() => setGender("male")}
        >
          <GenderMaleIcon
            size={32}
            color={gender === "male" ? "#FFF" : COLORS.text.light}
          />
          <Text
            style={[styles.genderText, gender === "male" && styles.textActive]}
          >
            Homem
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderCard,
            gender === "female" && styles.genderCardActive,
          ]}
          onPress={() => setGender("female")}
        >
          <GenderFemaleIcon
            size={32}
            color={gender === "female" ? "#FFF" : COLORS.text.light}
          />
          <Text
            style={[
              styles.genderText,
              gender === "female" && styles.textActive,
            ]}
          >
            Mulher
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. DADOS PESSOAIS */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Ex: 75"
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Ex: 175"
          />
        </View>
      </View>

      <Text style={styles.label}>Idade (anos)</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Ex: 25"
      />

      {/* 3. NÍVEL DE ATIVIDADE */}
      <Text style={styles.label}>Nível de Atividade</Text>
      <View style={styles.activityContainer}>
        {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.activityOption,
              activity === level && styles.activityOptionActive,
            ]}
            onPress={() => setActivity(level)}
          >
            <View
              style={[
                styles.radioCircle,
                activity === level && styles.radioCircleActive,
              ]}
            >
              {activity === level && <View style={styles.radioDot} />}
            </View>
            <Text
              style={[
                styles.activityText,
                activity === level && styles.activityTextActive,
              ]}
            >
              {ACTIVITY_LABELS[level]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO CALCULAR */}
      <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
        <CalculatorIcon
          size={24}
          color="#FFF"
          weight="bold"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Calcular Calorias</Text>
      </TouchableOpacity>

      {/* 4. RESULTADO */}
      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Seu Gasto Diário Estimado</Text>
          <Text style={styles.resultValue}>
            {result} <Text style={{ fontSize: 18 }}>kcal</Text>
          </Text>
          <Text style={styles.resultDesc}>
            Para manter seu peso atual, você precisa consumir essa quantidade de
            calorias.
          </Text>

          <TouchableOpacity
            style={styles.saveMetaButton}
            onPress={handleSaveMeta}
          >
            <CheckIcon
              size={20}
              color="#FFF"
              weight="bold"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveMetaText}>Usar como Meta Diária</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 40 },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xl,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.secondary,
    marginBottom: 8,
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  // Gênero
  genderCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  genderCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: { marginTop: 8, fontWeight: "600", color: COLORS.text.light },
  textActive: { color: "#FFF" },

  // Inputs
  halfInput: { width: "48%" },
  input: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },

  // Atividade
  activityContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  activityOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  activityOptionActive: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
  },
  activityText: { fontSize: 14, color: COLORS.text.primary, marginLeft: 10 },
  activityTextActive: { color: COLORS.primary, fontWeight: "600" },

  // Radio Button Customizado
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.text.light,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: { borderColor: COLORS.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  // Botão Principal
  calcButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginTop: SPACING.md,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },

  // Resultado
  resultCard: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  resultTitle: { fontSize: 16, color: COLORS.text.secondary, marginBottom: 8 },
  resultValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  resultDesc: {
    textAlign: "center",
    color: COLORS.text.light,
    fontSize: 14,
    marginBottom: 20,
  },

  saveMetaButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveMetaText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
