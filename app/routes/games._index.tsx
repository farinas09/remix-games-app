import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";

import { getUserId } from "~/modules/auth";
import type { Game } from "~/modules/games";
import { GameSearch } from "~/modules/games/components/";
import { searchForGames, getFavorites } from "~/modules/games/games.server";
import type { RawgListResponse } from "~/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search");
  const uri = url.searchParams.get("uri");

  let games;
  if (searchTerm && !uri) {
    games = await searchForGames(searchTerm);
  }

  if (uri) {
    const decodedUri = decodeURIComponent(uri);
    const response = await fetch(decodedUri, { method: "GET" });
    games = (await response.json()) as RawgListResponse<Game>;
  }

  const favorites = await getFavorites(userId);

  return json({
    searchTerm,
    games,
    favorites,
  });
};

export default function GamesPage() {
  const navigation = useNavigation();
  const { searchTerm, games, favorites } = useLoaderData<typeof loader>() || {};

  return (
    <GameSearch
      searchTerm={searchTerm}
      games={games}
      navigationState={navigation.state}
      favorites={favorites.map((favorite) => ({
        ...favorite,
        createdAt: new Date(favorite.createdAt),
        updatedAt: new Date(favorite.updatedAt),
      }))}
    />
  );
}

const pp = () => {
  return <div></div>;
};
