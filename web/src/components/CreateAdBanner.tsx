import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <footer className="bg-nlw-gradient pt-1 mt-8 w-full rounded-lg overflow-hidden">
      <article className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <h6><strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong></h6>
          <p className="text-zinc-400">Publique um anúncio para encontrar novos players!</p>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3">
          <MagnifyingGlassPlus size={24}/>
          Publicar anúncio
        </Dialog.Trigger>
      </article>
    </footer>
  );
}