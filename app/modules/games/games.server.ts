import type { Favorite, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";
import type { RawgListResponse } from "~/types";

import type { Game, GameDetails } from "./types";

export async function searchForGames(
  searchTerm: string,
): Promise<RawgListResponse<Game>> {
  console.log(process.env.RAWG_API_KEY);
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchTerm}&parent_platforms=7`,
    {
      method: "GET",
    },
  );
  const json = (await response.json()) as RawgListResponse<Game>;
  return json;
}

export async function getGameDetails(gameId: number): Promise<GameDetails> {
  const response = await fetch(
    `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`,
    {
      method: "GET",
    },
  );
  const json = (await response.json()) as GameDetails;
  return json;
}

export async function getGameScreenshots(gameId: number): Promise<string[]> {
  const response = await fetch(
    `https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.RAWG_API_KEY}`,
    {
      method: "GET",
    },
  );
  const json = (await response.json()) as {
    results: {
      id: number;
      image: string;
    }[];
  };
  return json.results.map((screenshot) => screenshot.image);
}

export async function addOrRemoveGameFromFavorites(
  params: Prisma.FavoriteUncheckedCreateInput,
): Promise<Favorite> {
  const { userId, gameId } = params;

  const found = await prisma.favorite.findUnique({
    where: {
      userId_gameId: {
        userId,
        gameId,
      },
    },
  });

  if (found) {
    return prisma.favorite.delete({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
    });
  }

  return prisma.favorite.create({ data: params });
}

export async function getFavorites(userId: string): Promise<Favorite[]> {
  return prisma.favorite.findMany({
    where: {
      userId,
    },
  });
}
