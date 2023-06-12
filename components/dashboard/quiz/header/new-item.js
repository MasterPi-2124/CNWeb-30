import Modal from "../modal";
import Image from "next/image";
import { useState } from "react";

const NewItem = () => {
  const [openItemModal, setOpenItemModal] = useState(false);

  return (
    <>
      <button
        className="btn btn__primary btn-lg"
        onClick={() => setOpenItemModal(true)}
      >
        + Add New Item
      </button>
      <button
        className="btn btn__primary px-5 flex justify-center items-center"
        onClick={() => setOpenItemModal(true)}
      >
        <Image
          src="/icon-add-item-mobile.svg"
          alt="plus icon"
          height={12}
          width={12}
        />
      </button>
      <Modal show={openItemModal} onClose={() => setOpenItemModal(false)}>
        <NewItemModal onClose={() => setOpenItemModal(!openItemModal)} />
      </Modal>
    </>
  );
};

export default NewItem;
