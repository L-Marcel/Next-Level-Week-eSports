import { GameController } from "phosphor-react-native";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Ad } from "../../screens/Game";
import { THEME } from "../../theme";
import { DuoInfo } from "./DuoInfo";

import { styles } from "./styles";

interface DuoCardProps extends TouchableOpacityProps  {
  data: Ad;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect, ...rest }: DuoCardProps) {
  return (
    <View style={styles.container} {...rest}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel? "Sim":"Não"}
        colorValue={data.useVoiceChannel? 
          THEME.COLORS.SUCCESS:
          THEME.COLORS.ALERT
        }
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}