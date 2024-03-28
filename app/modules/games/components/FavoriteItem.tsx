import type { Favorite } from "@prisma/client";
import { Link, useFetcher } from "@remix-run/react";
import { FC, useCallback, useRef } from "react";
import { FaTrash } from "react-icons/fa6";

interface FavoriteItemProps {
  favorite: Favorite;
}

export const FavoriteItem: FC<FavoriteItemProps> = ({ favorite }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDeleteFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      fetcher.submit(formRef.current, {});
    },
    [fetcher],
  );

  return (
    <Link to={`/games/${favorite.gameId}`} key={favorite.id}>
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 h-48 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <img src={favorite.screenshotUrl as string} alt="game-cover" />
        </div>
        <div className="p-6 text-center">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {favorite.name}
          </h4>
          <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            {`Liked ${dateFormatter.format(favorite.createdAt.getDate)}`}
          </p>
          <div className="mx-4">
            <fetcher.Form
              ref={formRef}
              method="post"
              action={"/games/toggle-favorite"}
            >
              <input type="hidden" name="gameId" value={favorite.gameId} />
              <FaTrash
                className="h-8 w-8 cursor-pointer fill-red-700 hover:fill-red-500"
                onClick={handleDeleteFavorite}
              />
            </fetcher.Form>
          </div>
        </div>
      </div>
    </Link>
  );
};
