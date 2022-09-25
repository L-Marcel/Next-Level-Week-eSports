import { MaterialIcons } from "@expo/vector-icons";
import Clipboard from "expo-clipboard";
import { CheckCircle } from "phosphor-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";

import { THEME } from "../../../theme";
import { Heading } from "../../Heading";
import { styles } from "./styles";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false);
  
  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord cópiado!", "Usuário copiado para você colocar no Discord.");
    setIsCopping(false);
  }
  
  return (
    <Modal 
      transparent
      statusBarTranslucent
      animationType="fade"
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{
              alignItems: "center",
              marginTop: 24
            }}
          />

          <Text style={styles.label}>
          Adicione seu Discord
          </Text>

          <TouchableOpacity 
            style={styles.discorButton}
            disabled={isCopping}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              {isCopping? <ActivityIndicator color={THEME.COLORS.PRIMARY}/>:discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}