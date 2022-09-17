export interface GameBannerProps {
  title: string;
  bannerUrl: string;
  ads: number;
}

export function GameBanner({
  ads,
  bannerUrl,
  title
}: GameBannerProps) {
  return (
    <a href="#" className="relative overflow-hidden rounded-lg">
      <img src={bannerUrl} alt=""/>
      <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm">{ads} anúncio(s)</span>
      </div>
    </a>
  );
}