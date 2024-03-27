import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserId } from "~/modules/auth";
import {
  GameDetailsView,
  getGameDetails,
  getGameScreenshots,
} from "~/modules/games";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const { gameId } = params;

  let gameDetails;
  let screenshots: string[] = [];
  if (gameId) {
    gameDetails = await getGameDetails(Number.parseInt(gameId, 10));
    screenshots = await getGameScreenshots(Number.parseInt(gameId, 10));
  }

  return json({
    gameDetails,
    screenshots,
  });
};

export default function GameDetailsPage() {
  const { gameDetails, screenshots } = useLoaderData<typeof loader>() || {};

  return (
    <GameDetailsView gameDetails={gameDetails} screenshots={screenshots} />
  );
}
