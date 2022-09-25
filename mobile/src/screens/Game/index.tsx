
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoCard/DuoMatch";
import { Heading } from "../../components/Heading";
import { api } from "../../services/axios";
import { THEME } from "../../theme";
import { GameRouteProps } from "../Home";
import { styles } from "./styles";

export type Ad = {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: number;
  hourEnd: number;
};

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameRouteProps;

  const [ads, setAds] = useState<Ad[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  useEffect(() => {
    api.get<Ad[]>(`/games/${game.id}/ads`)
      .then(res => setAds(res.data))
      .catch(err => console.log(err));
  }, [api, game]);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOnClose() {
    setDiscordDuoSelected("");
  }

  async function handleGetDiscordUser(adId: string, onGetDiscord: (discord: string) => void) {
    try {
      const res = await api.get<{ discord: string }>(`/ads/${adId}/discord`);
      onGetDiscord(res.data.discord);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              size={24}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>

          <View style={styles.right}>
            <Image
              source={logoImg}
              style={styles.logo}
            />
          </View> 
        </View>

        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: game.bannerUrl
            }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => handleGetDiscordUser(item.id, setDiscordDuoSelected)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ads.length > 0? styles.contentList:styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => 
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={handleOnClose}
        />
      </SafeAreaView>
    </Background>
  );
}