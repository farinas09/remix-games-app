import * as ReactForm from "@radix-ui/react-form";
import { Form, Link } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import { FaMagnifyingGlass } from "react-icons/fa6";
import type { RawgListResponse } from "~/types";
import type { Game } from "../types";
import { GameCard } from "./GameCard";

interface GamesSearchProps {
  navigationState?: "idle" | "loading" | "submitting";
  searchTerm?: string | null;
  games?: RawgListResponse<Game> | null;
  //favorites?: Favorite[] | null;
}

export const GamesSearch: React.FC<GamesSearchProps> = ({
  navigationState,
  searchTerm,
  //favorites,
  games,
}) => {
  return (
    <div className="flex flex-1 flex-col p-6 lg:py-3">
      <div className="flex flex-col lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="mb-6 text-center text-3xl font-bold text-white sm:text-6xl lg:mb-0">
          Lista de juegos
        </h1>
        <Form
          method="get"
          action="/games?index"
          className="mb-6 flex flex-col items-center lg:mb-0"
        >
          <ReactForm.Root asChild>
            <ReactForm.Field
              name="search"
              className="relative flex w-80 items-center gap-4"
            >
              <FaMagnifyingGlass className="absolute left-2 top-1 h-8 w-8 fill-black" />
              <ReactForm.Control
                type="text"
                placeholder="Search for a game"
                defaultValue={searchTerm || ""}
                className="flex-1 rounded-full border border-slate-500 py-2 pl-12 pr-4"
              />
              <ReactForm.Submit
                className="text-white disabled:opacity-25"
                disabled={navigationState === "submitting"}
              >
                Go
              </ReactForm.Submit>
            </ReactForm.Field>
          </ReactForm.Root>
        </Form>
      </div>
      <hr className="mb-4" />
      <div className="mt-4 flex flex-1 flex-col">
        {searchTerm && (
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-left sm:text-4xl">
            Showing results for "{searchTerm}"
          </h2>
        )}
        <div className="flex flex-wrap gap-10 items-center justify-center">
          {games &&
            games?.results?.length > 0 &&
            games.results.map((game) => (
              <GameCard key={game.id} game={game} favorite={false} />
            ))}
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
