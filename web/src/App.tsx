import { MagnifyingGlassPlus } from "phosphor-react";
import logo from "./assets/logo.svg";

function App() {
  return (
    <section className="max-w-[1344px] my-20 mx-auto flex flex-col items-center">
      <img src={logo} className="max-w-[20%]" alt=""/>
      
      <h1 className="text-4xl text-white font-black mt-10">
        Seu <span className="bg-clip-text bg-nlw-gradient text-transparent ">duo</span> está aqui
      </h1>

      <main className="grid grid-cols-6 gap-6 mt-14">
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="lol.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">League of Legends</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="apex.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Apex Legends</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="cs.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Counter Strike</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="wow.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">World of Warcraft</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="lol.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">League of Legends</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative overflow-hidden rounded-lg">
          <img src="apex.png" alt=""/>
          <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Apex Legends</strong>
            <span className="text-zinc-300 text-sm">5 anúncios</span>
          </div>
        </a>
      </main>

      <footer className="bg-nlw-gradient pt-1 mt-8 w-full rounded-lg overflow-hidden">
        <article className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <h6><strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong></h6>
            <p className="text-zinc-400">Publique um anúncio para encontrar novos players!</p>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </button>
        </article>
      </footer>
    </section>
  );
}

export default App;
