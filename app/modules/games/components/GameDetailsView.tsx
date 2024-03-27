import { FaStar } from "react-icons/fa6";
import type { GameDetails as GameDetailsType } from "../types";
import { ImageDialog } from "~/components";
import GameHeader from "./GameHeader";
import SectionHeader from "~/components/SectionHeader";
import TagItem from "~/components/TagItem";
import RatingDetail from "~/components/RatingDetail";

interface GameDetailsViewProps {
  gameDetails?: GameDetailsType | null;
  screenshots?: string[] | null;
}

export const GameDetailsView: React.FC<GameDetailsViewProps> = ({
  gameDetails,
  screenshots,
}) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageUrl =
    gameDetails?.background_image || "https://default-image-url.jpg"; // Aquí establece una imagen de respaldo si `background_image` no está definida

  return (
    gameDetails && (
      <div className="flex flex-1 flex-col">
        <GameHeader
          imageUrl={imageUrl}
          name={gameDetails.name}
          releaseDate={dateFormatter.format(new Date(gameDetails.released))}
          website={gameDetails.website}
        />
        <SectionHeader key="description" title="Description" />
        <div
          className="mb-6 px-4 text-lg text-gray-700 dark:text-white"
          dangerouslySetInnerHTML={{ __html: gameDetails?.description || "" }}
        />

        <SectionHeader key="platforms" title="Platforms" />
        <div className="mb-6 flex flex-wrap items-center justify-center">
          {gameDetails?.platforms.map(({ platform }) => (
            <TagItem key={platform.id} text={platform.name} />
          ))}
        </div>

        <SectionHeader key="genres" title="Genres" />
        <div className="mb-6 flex flex-wrap items-center justify-center">
          {gameDetails?.genres.map((genre) => (
            <TagItem key={genre.id} text={genre.name} />
          ))}
        </div>

        <SectionHeader key="details" title="Details" />
        <div className="flex flex-col lg:flex-row items-center justify-center ">
          <RatingDetail title="Rating" rating={gameDetails?.rating} />

          <RatingDetail
            title="Metacritic Rating"
            rating={gameDetails?.metacritic}
          />
        </div>

        <SectionHeader key="screenshots" title="Screenshots" />
        {screenshots && screenshots.length > 0 ? (
          <div className="flex flex-wrap gap-10 items-center justify-center mb-6 px-4">
            {screenshots.map((screenshot) => (
              <ImageDialog key={screenshot} image={screenshot} />
            ))}
          </div>
        ) : (
          <div className="mb-6 flex h-60 w-full items-center justify-center border border-slate-400">
            <h3 className="text-center text-xl font-bold text-slate-600">
              No screenshots available
            </h3>
          </div>
        )}
      </div>
    )
  );
};
