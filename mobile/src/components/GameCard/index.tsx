import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Game } from "../../screens/Home";
import { THEME } from "../../theme";
import { styles } from "./styles";

interface GameCardProps extends TouchableOpacityProps {
  data: Game;
}

export function GameCard({
  data,
  ...rest
}: GameCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      {...rest}
    >
      <ImageBackground
        source={{
          uri: data.bannerUrl
        }}
        style={styles.cover}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data._count.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}