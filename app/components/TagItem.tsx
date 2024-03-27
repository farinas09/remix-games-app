interface TagItemProps {
  text: string;
}

export default function TagItem({ text }: TagItemProps) {
  return (
    <span className="bg-gray-100 text-gray-800 text-sm font-semibold m-2 px-4 py-2 rounded-xl dark:bg-gray-700 dark:text-gray-300">
      {text}
    </span>
  );
}
