import { MdLogout as LogoutIcon } from "react-icons/md";
import { useStore } from "@/store";

type Props = {
  className?: string;
};

export const WelcomeLogout = ({ className }: Props) => {
  const username = useStore((state) => state.username);
  const signout = useStore((state) => state.removeUser);

  return (
    <div className={className}>
      <p className="font-bold">
        Welcome! <span className="font-normal italic">{username}</span>
      </p>
      <span
        className="flex cursor-pointer items-center gap-2 hover:underline"
        onClick={() => signout()}
      >
        log out <LogoutIcon />
      </span>
    </div>
  );
};
