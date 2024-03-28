import { FC } from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="my-6 px-4 text-center text-2xl font-bold text-gray-700 dark:text-white sm:text-4xl">
      {title}
    </h2>
  );
};
