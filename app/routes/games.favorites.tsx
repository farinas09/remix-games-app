import type { Favorite } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import SectionHeader from "~/components/SectionHeader";
import { getUserId } from "~/modules/auth";
import { getFavorites } from "~/modules/games";
import { FavoriteItem } from "~/modules/games/components/";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const favorites = await getFavorites(userId);

  return json({
    favorites,
  });
};

export default function Favorites() {
  const { favorites } = useLoaderData<typeof loader>() || {};

  return (
    <div className="flex-1 p-6">
      <SectionHeader title="Games Liked" />
      <hr className="mb-4" />
      {favorites?.map((favorite) => (
        <FavoriteItem
          favorite={favorite as unknown as Favorite}
          key={favorite.id}
        />
      ))}
    </div>
  );
}
