import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px]">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="input-box">
                <label className="font-semibold" htmlFor="game">Qual o game?</label>
                <input id="game" type="text" placeholder="Selecione o game que deseja jogar"/>
              </div>

              <div className="input-box">
                <label htmlFor="name">Qual seu nome (ou nickname)?</label>
                <input id="name" type="text" placeholder="Como te chamar dentro do game?"/>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="input-box">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
                </div>
                <div className="input-box">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <input id="discord" type="text" placeholder="Usuário#0000"/>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="input-box">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="flex flex-row flex-wrap gap-2">
                    <button className="day-button" title="Domingo">D</button>
                    <button className="day-button" title="Segunda">S</button>
                    <button className="day-button" title="Terça">T</button>
                    <button className="day-button" title="Quarta">Q</button>
                    <button className="day-button" title="Quinta">Q</button>
                    <button className="day-button" title="Sexta">S</button>
                    <button className="day-button" title="Sábado">S</button>
                  </div>
                </div>
                <div className="input-box flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="flex flex-row gap-2">
                    <input id="hourStart" type="time" placeholder="De"/>
                    <input id="hourEnd" type="time" placeholder="Até"/>
                  </div>
                </div>
              </div>

              <div className="input-box flex-row">
                <input id="" type="checkbox"/>
                Costume me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="cancel-button" type="button">cancelar</Dialog.Close>
                <button className="apply-button" type="submit">
                  <GameController 
                    size={24}
                  />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

export default App;
