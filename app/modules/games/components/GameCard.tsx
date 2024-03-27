import { Link, useFetcher } from "@remix-run/react";
import { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";
import type { Game } from "../types";
import { FaRegHeart, FaHeart, FaArrowRight } from "react-icons/fa6";

interface GameCardProps {
  game: Game;
  favorite?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, favorite }) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      fetcher.submit(formRef.current, {});
    },
    [fetcher],
  );

  return (
    <div className="relative flex min-h-[420px] w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
      {fetcher.state !== "idle" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-slate-600" />
            <span className="text-slate-400">Loading...</span>
          </div>
        </div>
      )}
      {game.background_image ? (
        <div className="h-52 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img
            key={game.id}
            alt={game.name}
            src={game.background_image}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-60 w-full items-center justify-center border-b border-slate-400 lg:border-b-0 lg:border-r">
          <h3 className="text-center text-xl font-bold text-white">
            No image available
          </h3>
        </div>
      )}

      <div className="flex p-4">
        <div className="flex-grow">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {game.name}
          </h5>
          <h4 className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {game.released && dateFormatter.format(new Date(game.released))}
          </h4>
        </div>
        <div className="">
          <fetcher.Form
            ref={formRef}
            method="post"
            className="flex justify-center"
            action={`/games/toggle-favorite`}
          >
            <input type="hidden" name="gameId" value={game.id} />
            <input type="hidden" name="redirectTo" value={`/games`} />
            {favorite ? (
              <FaHeart
                className="h-8 w-8 fill-current text-red-600"
                onClick={handleToggleFavorite}
              />
            ) : (
              <FaRegHeart
                className="h-8 w-8 fill-current text-slate-800"
                onClick={handleToggleFavorite}
              />
            )}
          </fetcher.Form>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center">
        {game.platforms.map((platform) => (
          <span
            key={platform.platform.id}
            className="text-xs font-normal px-0.5 py-0.5 bg-gray-200 rounded text-gray-700 align-middle mr-1 mb-1"
          >
            {platform.platform.name}
          </span>
        ))}
      </div>

      <div className="flex justify-end">
        <Link
          className={`!font-medium !text-blue-gray-900 !transition-colors hover:!text-blue-500" ${
            fetcher.state !== "idle" && "pointer-events-none opacity-50"
          }`}
          to={`/games/${game.id}`}
        >
          <button
            className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-blue-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            Ver detalles
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};
