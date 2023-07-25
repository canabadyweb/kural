import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const thirukkuralRouter = createTRPCRouter({
  postMessage: publicProcedure
  .input(
    z.object({
      id: z.number(),
      easy_kural: z.string(),
      kural: z.string(),
    })
  )
  .mutation(async ({ctx, input }) => {
    try {
      await ctx.prisma.thirukkural.create({
        data: {
          id: input.id,
          easy_kural: input.easy_kural,
          kural: input.kural,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  getKuralsForAthikaram: publicProcedure
  .input(z.object({chapter_index: z.number().min(1).max(133)}))
  .query( async ({ctx, input}) => {
    try {
      return await ctx.prisma.thirukkural.findMany({
        select:{
          id: true,
          easy_kural: true,
          kural: true,
        },
        where:{
          chapter_index: input.chapter_index,
        },
        orderBy:{
          id: "asc",
        },
      });
    }catch(error){
      console.log("error", error)
    }
  }),
  getAll: publicProcedure.query( async ({ctx}) => {
    try {
      return await ctx.prisma.thirukkural.findMany({
        select:{
          id: true,
          easy_kural: true,
          kural: true,
        },
        orderBy:{
          chapter_index: "asc",
        },
      });
    }catch(error){
      console.log("error", error)
    }
  }),
});

