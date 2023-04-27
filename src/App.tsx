import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes, mainRoutes } from "@/routes";
import { useStore } from "@/store";
import { Button, Modal } from "@/components";

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const isErrorModalOpen = useStore((state) => state.toggleableElements.error);
  const toggleElement = useStore((state) => state.toggleElement);
  const router = createBrowserRouter(isLoggedIn ? mainRoutes : authRoutes);

  return (
    <>
      <RouterProvider router={router} />
      <Modal
        isOpen={isErrorModalOpen}
        onOutsideClick={() => toggleElement("error", false)}
      >
        <div className="grid justify-items-center gap-5 text-center">
          <h1 className="text-gray-650 text-3xl font-bold">Error</h1>
          <img
            className="w-20 md:w-[6.5rem]"
            src="/img/icon-error.svg"
            alt=""
          />
          <p>
            <strong> Something went wrong.</strong> <br /> If the error still
            persists, contact the administrator for further assistance.
          </p>
          <Button
            color="dark-blue"
            onClick={() => toggleElement("error", false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default App;
