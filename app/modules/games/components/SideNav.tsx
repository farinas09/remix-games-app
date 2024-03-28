import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import {
  FaArrowRightFromBracket,
  FaGamepad,
  FaHeart,
  FaUser,
} from "react-icons/fa6";

interface SideNavProps {
  onItemClick?: () => void;
  user: User;
}

export const SideNav: FC<SideNavProps> = ({ user, onItemClick }) => {
  return (
    <div className="text-gray-700 dark:text-white h-full flex flex-col bg-primary-light dark:bg-primary-dark">
      <div className="mb-auto w-full ">
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 dark:text-white">
          <Link
            to="/games"
            onClick={onItemClick}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <FaGamepad />
            </div>
            Games
          </Link>
          <Link
            to="favorites"
            onClick={onItemClick}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <FaHeart />
            </div>
            Favorites
          </Link>
          <Form method="post" action="/logout">
            <button
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              type="submit"
            >
              <div className="grid place-items-center mr-4">
                <FaArrowRightFromBracket />
              </div>
              Logout
            </button>
          </Form>
        </nav>
      </div>
      <nav className="mt-auto w-full">
        <div className="flex items-center gap-4 m-4">
          <FaUser />
          <span>{user.email}</span>
        </div>
      </nav>
    </div>
  );
};
