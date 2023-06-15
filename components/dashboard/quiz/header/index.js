import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { useBoards } from "../context";



const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentBoard, deleteBoard } = useBoards();
  const { theme } = useTheme();

  return (
    <header className="p-4 h-[85px] flex bg-white justify-between items-center border-b border-lightGreyLine dark:bg-darkGrey dark:text-white dark:border-darkGreyLine md:p-0">
      <div className="flex items-center ">
        <AnimatePresence>
          {8999 <= 768 ? (
            <>
              <Image
                src="/logo-mobile.svg"
                alt="kanban logo"
                height={25}
                width={24}
              />
              <button
                className="flex justify-center items-center"
                onClick={() => setShowMenu(true)}
              >
                <h2 className="heading-lg ml-5 mr-2">
                  {currentBoard?.name || "No Board Found"}
                </h2>
                {showMenu ? (
                  <Image
                    src="/icon-chevron-up.svg"
                    alt="chevron"
                    height={4}
                    width={8}
                  />
                ) : (
                  <Image
                    src="/icon-chevron-down.svg"
                    alt="chevron"
                    height={4}
                    width={8}
                  />
                )}
              </button>
            </>
          ) : (
            <>
              <div className="w-[260px] lg:w-[300px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
                <Image
                  src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                  alt="kanban logo"
                  height={25}
                  width={152}
                />
              </div>
              <h2 className="heading-lg ml-5 mr-2">
                {currentBoard?.name || "No Board Found"}
              </h2>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-4 md:pr-4">
      <button
        className="btn btn__primary btn-lg"
        onClick={() => setOpenItemModal(true)}
      >
        + Add New Item
      </button>
      </div>
    </header>
  );
};
export default Header;
