import * as Dialog from "@radix-ui/react-dialog";
import { FaXmark } from "react-icons/fa6";

interface ImageDialogProps {
  image: string;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ image }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <img className="h-60 w-full" src={image} alt={image} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center">
          <Dialog.Title className="sr-only">Image</Dialog.Title>
          <div className="relative">
            <Dialog.Close className="absolute right-2 top-2 rounded-full border border-white bg-slate-800 bg-opacity-90 p-2 text-white">
              <FaXmark />
            </Dialog.Close>
            <img className="w-full lg:h-96 lg:w-auto" src={image} alt={image} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
