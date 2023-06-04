import Modal from "../modal";
import Image from "next/image";
import { useState } from "react";

const NewTask = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);

  return (
    <>
      <button
        className="btn btn__primary btn-lg"
        onClick={() => setOpenTaskModal(true)}
      >
        + Add New Task
      </button>
      <button
        className="btn btn__primary px-5 flex justify-center items-center"
        onClick={() => setOpenTaskModal(true)}
      >
        <Image
          src="/icon-add-task-mobile.svg"
          alt="plus icon"
          height={12}
          width={12}
        />
      </button>
      <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <NewTaskModal onClose={() => setOpenTaskModal(!openTaskModal)} />
      </Modal>
    </>
  );
};

export default NewTask;
