import { json, type ActionFunctionArgs } from "@remix-run/node";

import { getUserId } from "~/modules/auth";
import { addOrRemoveGameFromFavorites, getGameDetails } from "~/modules/games";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return json({ message: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const gameId = formData.get("gameId");
  if (!gameId) return json({ message: "Game ID is required" }, { status: 400 });

  const game = await getGameDetails(Number.parseInt(gameId as string, 10));

  await addOrRemoveGameFromFavorites({
    userId,
    gameId: Number.parseInt(gameId as string, 10),
    name: game.name,
    screenshotUrl: game.background_image,
  });

  return json({ message: `Game ${gameId} favorited` });
};
