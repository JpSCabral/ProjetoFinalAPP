import React from "react";
import { View, Text, DimensionValue } from "react-native";
import { COLORS } from "@/constants/theme";
import { styles } from "./styles";

interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}

export function CalorieSummary({ consumed, goal }: CalorieSummaryProps) {
  // Evita divisão por zero
  const rawProgress = goal > 0 ? consumed / goal : 0;

  // Trava a barra visualmente em 100% para não "estourar" o layout
  const visualProgress = Math.min(rawProgress, 1);

  // Lógica de Cor: Se passou da meta, fica Vermelho (Danger). Se não, Verde (Primary).
  const isOverLimit = consumed > goal;
  const barColor = isOverLimit ? COLORS.danger : COLORS.primary;

  // Percentual para CSS
  const widthPercent = `${visualProgress * 100}%` as DimensionValue;

  return (
    <View style={styles.container}>
      {/* Linha de Textos */}
      <View style={styles.textRow}>
        {/* Bloco Consumido */}
        <View style={styles.textBlock}>
          <Text
            style={[
              styles.value,
              { color: isOverLimit ? COLORS.danger : COLORS.text.primary },
            ]}
          >
            {consumed}
          </Text>
          <Text style={styles.label}>kcal consumidas</Text>
        </View>

        {/* Divisória Vertical */}
        <View style={styles.divider} />

        {/* Bloco Meta */}
        <View style={styles.textBlock}>
          <Text style={styles.value}>{goal}</Text>
          <Text style={styles.label}>kcal meta</Text>
        </View>
      </View>

      {/* Barra de Progresso Customizada (Sem bibliotecas externas) */}
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: widthPercent,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
    </View>
  );
}
