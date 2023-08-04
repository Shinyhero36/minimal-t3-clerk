import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
