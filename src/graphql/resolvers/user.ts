import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {}
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { prisma, session } = context;

      const { id: userId } = session?.user;

      try {
        if (!session?.user) {
          return {
            error: "Not authorized"
          };
        }

        // check that username is not taken
        const existingUser = await prisma.user.findUnique({
          where: { username }
        });

        if (existingUser) {
          return {
            error: " Username already taken. Try another"
          };
        }

        // update user
        await prisma.user.update({ where: { id: userId }, data: { username } });

        return { success: true };
      } catch (error: any) {
        console.log("create username error", error);
        return { error: error?.message };
      }
    }
  }
};

export default resolvers;
