import { thirukkuralRouter } from "~/server/api/routers/thirukkural";
import { athikaramRouter } from "~/server/api/routers/athikaram";
import { tilesRouter } from "~/server/api/routers/tiles";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  thirukkural: thirukkuralRouter,
  athikaram: athikaramRouter,
  tiles: tilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
