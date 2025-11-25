import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING } from "@/constants/theme";
import { useDiary } from "@/contexts/DiaryContext";
import { DiaryEntry } from "@/types";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Componente: Barra de Macro Individual
const MacroBar = ({
  label,
  value,
  color,
  total = 200,
}: {
  label: string;
  value: number;
  color: string;
  total?: number;
}) => {
  // Limita a barra a 100%
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <View style={styles.macroRow}>
      <View style={styles.macroInfo}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>{value.toFixed(0)}g</Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

export default function ProgressScreen() {
  const { entries } = useDiary();

  // --- 1. Calcular Dados de HOJE ---
  const todayStats = useMemo(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const todayEntries = entries.filter((e) => e.date.startsWith(todayKey));

    return todayEntries.reduce(
      (acc, curr) => ({
        calories: acc.calories + curr.food.calories,
        protein: acc.protein + (curr.food.protein || 0),
        carbs: acc.carbs + (curr.food.carbs || 0),
        fats: acc.fats + (curr.food.fats || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [entries]);

  // --- 2. Calcular Dados dos ÚLTIMOS 7 DIAS (Gráfico) ---
  const weeklyData = useMemo(() => {
    const days = [];
    const today = new Date();

    // Loop para os últimos 7 dias (invertido para o gráfico ir da esq para dir)
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];

      // Soma calorias deste dia específico
      const dayCalories = entries
        .filter((e) => e.date.startsWith(dateKey))
        .reduce((sum, e) => sum + e.food.calories, 0);

      // Nome do dia (ex: "Seg", "Ter")
      const dayName = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
        .format(d)
        .slice(0, 3);

      days.push({ day: dayName, value: dayCalories, fullDate: dateKey });
    }
    return days;
  }, [entries]);

  // Encontrar o maior valor para escalar o gráfico (evita divisão por zero)
  const maxCal = Math.max(...weeklyData.map((d) => d.value), 2000);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Verde Fixo */}
      <View style={styles.header}>
        <SafeAreaView edges={["top"]}>
          <Text style={styles.headerTitle}>Estatísticas</Text>
          <Text style={styles.headerSubtitle}>Sua evolução nutricional</Text>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- CARD: MACROS DE HOJE --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo de Hoje</Text>
          <View style={styles.divider} />

          <View style={styles.caloriesHighlight}>
            <Text style={styles.bigNumber}>{todayStats.calories}</Text>
            <Text style={styles.unitLabel}>kcal consumidas</Text>
          </View>

          <View style={styles.macrosContainer}>
            {/* Metas fictícias: P: 160g, C: 200g, G: 70g */}
            <MacroBar
              label="Proteínas"
              value={todayStats.protein}
              total={160}
              color={COLORS.secondary}
            />
            <MacroBar
              label="Carboidratos"
              value={todayStats.carbs}
              total={200}
              color="#FBBF24"
            />
            <MacroBar
              label="Gorduras"
              value={todayStats.fats}
              total={70}
              color="#F87171"
            />
          </View>
        </View>

        {/* --- CARD: GRÁFICO SEMANAL --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Últimos 7 Dias</Text>
          <Text style={styles.cardSubtitle}>Histórico de consumo calórico</Text>
          <View style={styles.divider} />

          <View style={styles.chartContainer}>
            {weeklyData.map((data, index) => {
              // Altura relativa da barra (mínimo de 5% para não sumir)
              const barHeight = Math.max((data.value / maxCal) * 100, 5);
              const isToday = index === 6; // Último item é hoje

              return (
                <View key={index} style={styles.chartColumn}>
                  {/* Valor acima da barra (só se tiver valor relevante) */}
                  {data.value > 0 && (
                    <Text style={styles.chartValueText}>{data.value}</Text>
                  )}

                  {/* A Barra */}
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: `${barHeight}%`,
                        backgroundColor: isToday ? COLORS.secondary : "#E5E7EB", // Hoje fica verde
                      },
                    ]}
                  />

                  {/* Dia da Semana */}
                  <Text
                    style={[
                      styles.chartLabel,
                      isToday && styles.chartLabelToday,
                    ]}
                  >
                    {data.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text.inverted,
    marginTop: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  scrollContent: {
    padding: SPACING.md,
    marginTop: -SPACING.lg, // Sobe os cards para cima do header
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  // Estilos de Macros
  caloriesHighlight: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  unitLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
  },
  macrosContainer: {
    gap: SPACING.md,
  },
  macroRow: {
    marginBottom: 4,
  },
  macroInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  macroValue: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  track: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 4,
  },
  // Estilos do Gráfico
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150, // Altura fixa do gráfico
    paddingTop: 20,
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  chartBar: {
    width: 8, // Largura da barra
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 10,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
  },
  chartLabelToday: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  chartValueText: {
    fontSize: 10,
    color: COLORS.text.light,
    marginBottom: 4,
  },
});
