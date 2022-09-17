import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { GameBanner } from "./components/GameBanner";
import { api } from "./services/axios";

export type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
};

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api.get<Game[]>("/games")
      .then(res => setGames(res.data))
      .catch(err => console.log(err));
  }, [api]);

  return (
    <section className="max-w-[1344px] my-20 mx-auto flex flex-col items-center">
      <img src={logo} className="max-w-[20%]" alt=""/>
      
      <h1 className="text-4xl text-white font-black mt-10">
        Seu <span className="bg-clip-text bg-nlw-gradient text-transparent">duo</span> está aqui
      </h1>

      <main className="grid grid-cols-6 gap-6 mt-14">
        {
          games.map(({ title, id, bannerUrl, _count }) => {
            return (
              <GameBanner
                key={id}
                title={title}
                ads={_count.ads}
                bannerUrl={bannerUrl}
              />
            );
          })
        }
      </main>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal
          games={games}
        />
      </Dialog.Root>
    </section>
  );
}

export default App;
