import { Link } from "react-router-dom";

type Props = {
  type: "success" | "error";
  children: React.ReactNode;
};

export const Message = ({ type, children }: Props) => {
  return (
    <main className="grid h-screen content-center font-sans">
      <div className="container-shadow mx-auto grid w-[90%] max-w-[28rem] justify-items-center gap-6 rounded-lg-2 bg-white p-8 text-sm">
        <h1 className="text-gray-650 text-3xl font-bold capitalize">{type}</h1>
        <img
          className="w-20 md:w-[6.5rem]"
          src={`/img/icon-${type}.svg`}
          alt=""
        />
        {children}
        <Link
          className="text-center font-medium text-secondary-400 hover:underline"
          to="/auth/signin"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
};
