import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tilesRouter = createTRPCRouter({
  getAll: publicProcedure.query( async ({ctx}) => {
    try {
      return await ctx.prisma.tiles.findMany({
        select:{
          id: true,
          type: true,
          description: true,
        },
        orderBy:{
          id: "asc",
        },
      });
    }catch(error){
      console.log("error", error)
    }
  }),
});

