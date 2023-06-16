import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import EditIcon from '@/assets/icons/thin/edit.svg';

const EditButton = ({
  type,
  className = "",
  onConfirm,
  switchToUpdate,
  switchToDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useOnClickOutside(menuRef, () => setShowMenu(false));

  const menuVariations = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      <button className="h-8 w-8" onClick={() => setShowMenu(!showMenu)}>
        <Image
          src={EditIcon}
          alt="vertical ellipsis"
          // height={16}
          // width={4}
        />
      </button>
      <motion.div
        ref={menuRef}
        variants={menuVariations}
        initial="closed"
        animate={showMenu ? "open" : "closed"}
        className={`edit-button ${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize dark:bg-veryDarkGrey`}
      >
        <button className="text-mediumGrey" onClick={() => switchToUpdate()}>
          Edit {type}
        </button>
        <button className="text-mainRed" onClick={() => switchToDelete()}>
          Delete {type}
        </button>
      </motion.div>
    </div>
  );
};
export default EditButton;
