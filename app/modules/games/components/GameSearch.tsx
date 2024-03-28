import { FC } from "react";
import { Favorite } from "@prisma/client";
import * as ReactForm from "@radix-ui/react-form";
import { Form, Link } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

import type { RawgListResponse } from "~/types";

import type { Game } from "../types";

import { GameCard } from "./index";

interface GamesSearchProps {
  navigationState?: "idle" | "loading" | "submitting";
  searchTerm?: string | null;
  games?: RawgListResponse<Game> | null;
  favorites?: Favorite[] | null;
}

export const GameSearch: FC<GamesSearchProps> = ({
  navigationState,
  searchTerm,
  favorites,
  games,
}) => {
  return (
    <div className="flex flex-1 flex-col p-6 lg:py-3">
      <div className="flex flex-col lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <Form
          method="get"
          action="/games?index"
          className="flex items-center max-w-md mx-auto bg-white rounded-lg"
        >
          <ReactForm.Root asChild>
            <ReactForm.Field name="search" className="flex w-full items-center">
              <ReactForm.Control
                type="search"
                placeholder="Search for a game"
                defaultValue={searchTerm || ""}
                className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              />
              <ReactForm.Submit
                className="flex items-center bg-blue-500 justify-center w-12 h-12 px-4 text-white rounded-r-lg disabled:opacity-25"
                disabled={navigationState === "submitting"}
              >
                Go
              </ReactForm.Submit>
            </ReactForm.Field>
          </ReactForm.Root>
        </Form>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        {searchTerm ? (
          <h2 className="mb-8 text-center text-xl font-bold text-white sm:text-left sm:text-4xl">
            Showing results for {searchTerm}
          </h2>
        ) : null}
        <div className="flex flex-wrap gap-10 items-center justify-center">
          {games && games?.results?.length > 0
            ? games.results.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  favorite={
                    !!favorites?.find((favorite) => favorite.gameId === game.id)
                  }
                />
              ))
            : null}
        </div>
      </div>
      <div className="flex w-full items-center justify-between self-end">
        <Link
          to={`/games?index&search=${searchTerm}&uri=${encodeURIComponent(
            games?.previous || "",
          )}`}
          className={twMerge(
            "rounded-md bg-slate-800 px-4 py-2 text-white",
            !games?.previous && "cursor-not-allowed opacity-25",
          )}
          onClick={(e) => games?.previous || e.preventDefault()}
        >
          Previous
        </Link>
        <Link
          to={`/games?index&search=${searchTerm}&uri=${encodeURIComponent(
            games?.next || "",
          )}`}
          className={twMerge(
            "rounded-md bg-slate-800 px-4 py-2 text-white",
            !games?.next && "cursor-not-allowed opacity-25",
          )}
          onClick={(e) => games?.next || e.preventDefault()}
        >
          Next
        </Link>
      </div>
    </div>
  );
};
