import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Game } from "../App";
import { api } from "../services/axios";

export type Ad = {
  discord: string;
  hourEnd: number;
  hourStart: number;
  name: string;
  useVoiceChannel: boolean;
  yearsPlaying: boolean;
};

interface CreateAdModalProps {
  games: Game[];
}

export function CreateAdModal({ games }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    const formData = new FormData(e?.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name || !data.discord) {
      return;
    }

    api.post(`/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: data.useVoiceChannel === "on"
    }).then(() => {
      alert("Anúncio criado com sucesso!");
    }).catch(() => {
      alert("Erro ao criar anúncio");
    });
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px]">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="input-box">
            <label className="font-semibold" htmlFor="game">Qual o game?</label>
            <select 
              id="game" 
              name="game"
              placeholder="Selecione o game que deseja jogar"
              className="appearance-none"
              defaultValue=""
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              {
                games.map(game => {
                  return (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  );
                })
              }
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="name">Qual seu nome (ou nickname)?</label>
            <input id="name" name="name" type="text" placeholder="Como te chamar dentro do game?"/>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-box">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
            </div>
            <div className="input-box">
              <label htmlFor="discord">Qual seu Discord?</label>
              <input id="discord" name="discord" type="text" placeholder="Usuário#0000"/>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="input-box">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type="multiple"
                className="flex flex-row flex-wrap gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item 
                  value={"0"} 
                  className={`day-button ${weekDays.includes("0")? "bg-violet-500":""}`} 
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"1"} 
                  className={`day-button ${weekDays.includes("1")? "bg-violet-500":""}`} 
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"2"} 
                  className={`day-button ${weekDays.includes("2")? "bg-violet-500":""}`} 
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"3"} 
                  className={`day-button ${weekDays.includes("3")? "bg-violet-500":""}`} 
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"4"} 
                  className={`day-button ${weekDays.includes("4")? "bg-violet-500":""}`} 
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"5"} 
                  className={`day-button ${weekDays.includes("5")? "bg-violet-500":""}`} 
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value={"6"} 
                  className={`day-button ${weekDays.includes("6")? "bg-violet-500":""}`} 
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="input-box flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="flex flex-row gap-2">
                <input id="hourStart" name="hourStart" type="time" placeholder="De"/>
                <input id="hourEnd" name="hourEnd" type="time" placeholder="Até"/>
              </div>
            </div>
          </div>

          <label className="input-box flex-row items-center">
            <Checkbox.Root name="useVoiceChannel" className="w-6 p-1 h-6 rounded bg-zinc-900">
              <Checkbox.CheckboxIndicator>
                <Check className="w-4 h-4 text-emerald-400"/>
              </Checkbox.CheckboxIndicator>
            </Checkbox.Root>

            Costume me conectar ao chat de voz
          </label>

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
  );
}