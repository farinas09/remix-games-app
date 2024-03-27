import { FaArrowRight } from "react-icons/fa6";

interface GameHeaderProps {
  name: string;
  releaseDate: string;
  website: string;
  imageUrl: string;
}

export default function GameHeader({
  imageUrl,
  name,
  releaseDate,
  website,
}: GameHeaderProps) {
  return (
    <div className="relative bg-blend-multiply">
      <img
        src={imageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <section className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 relative">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          {name}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Released {releaseDate}
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Visit website
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
