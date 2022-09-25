import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { api } from "../../services/axios";
import { styles } from "./styles";

export type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
};

export type GameRouteProps = Omit<Game, "_count">;

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get<Game[]>("/games")
      .then(res => setGames(res.data))
      .catch(err => console.log(err));
  }, [api]);

  function handleOpenGame(game: GameRouteProps) {
    navigation.navigate("game", game);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => {
                handleOpenGame({
                  id: item.id,
                  bannerUrl: item.bannerUrl,
                  title: item.title
                });
              }}
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}