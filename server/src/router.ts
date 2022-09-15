import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const router = Router();
const prisma = new PrismaClient();

router.get("/games", async(_: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });
  return res.json(games);
});

router.post("/games/:id/ads", async(req: Request, res: Response) => {
  const gameId = req.params.id;
  const data = req.body;

  const newAd = await prisma.ad.create({
    data: {
      ...data,
      weekDays: data.weekDays.join(","),
      hourStart: convertHourStringToMinutes(data.hourStart),
      hourEnd: convertHourStringToMinutes(data.hourEnd),
      gameId,
    }
  });

  return res.status(201).json(newAd);
});

router.get("/games/:id/ads", async(req: Request, res: Response) => {
  const gameId = req.params.id;
  
  const ads = await prisma.ad.findMany({
    where: {
      gameId
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  
  return res.json(ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(","),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd)
  })));
});

router.get("/ads/:id/discord", async(req: Request, res: Response) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });
  
  return res.json(ad);
});

export default router;