import { Link, useFetcher } from "@remix-run/react";
import { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";
import type { Game } from "../types";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

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
    <Link
      to={`/games/${game.id}`}
      className={twMerge(
        "mx-auto right-0 mt-2 w-60",
        fetcher.state !== "idle" && "pointer-events-none opacity-50",
      )}
    >
      {fetcher.state !== "idle" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-slate-600" />
            <span className="text-slate-400">Loading...</span>
          </div>
        </div>
      )}

      <div className="mx-auto right-0 mt-2 w-60">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="text-center p-6 bg-gray-800 border-b">
            {game.background_image ? (
              <img
                key={game.id}
                alt={game.name}
                src={game.background_image}
                width={160}
                height={160}
                className="h-24 w-24 text-white rounded-full mx-auto"
              />
            ) : (
              <div className="flex h-60 w-full items-center justify-center border-b border-slate-400 lg:border-b-0 lg:border-r">
                <h3 className="text-center text-xl font-bold text-white">
                  No image available
                </h3>
              </div>
            )}
            <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
              {game.name}
            </p>
            <p className="text-sm text-gray-100"></p>
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-slate-300">
                {game.released && dateFormatter.format(new Date(game.released))}
              </h4>
            </div>
          </div>
          <div className="border-b w-full text-center">
            <fetcher.Form
              ref={formRef}
              method="post"
              className="flex justify-center"
              action={`/games/toggle-favorite`}
            >
              <input type="hidden" name="gameId" value={game.id} />
              <input type="hidden" name="redirectTo" value={`/games`} />
              {favorite ? (
                <FaRegHeart
                  className="h-8 w-8 fill-current text-red-600"
                  onClick={handleToggleFavorite}
                />
              ) : (
                <FaHeart
                  className="h-8 w-8 fill-current text-slate-800"
                  onClick={handleToggleFavorite}
                />
              )}
            </fetcher.Form>
            <div>
              {game.platforms.map((platform) => (
                <span
                  key={platform.platform.id}
                  className="mr-1 inline-block rounded bg-green-700 px-2 py-1 text-xs font-semibold text-white"
                >
                  {platform.platform.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
