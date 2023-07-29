import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const athikaramRouter = createTRPCRouter({
  getAll: publicProcedure.query( async ({ctx}) => {
    try {
      return await ctx.prisma.athikaram.findMany({
        select:{
          athikaramNumber: true,
          description: true,
          backgroundColor: true,
          textColor: true,
          borderColor: true,
          tiles: true,
        },
        orderBy:{
          athikaramNumber: "asc",
        },
      });
    }catch(error){
      console.log("error", error)
    }
  }),
});

