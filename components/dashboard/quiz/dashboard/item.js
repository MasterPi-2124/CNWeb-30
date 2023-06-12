import { useState } from "react";

import Modal from "../modal";
import ItemDetailModal from "../modal/item-detail";
import UpdateItemModal from "../modal/update-item";
import DeleteItemModal from "../modal/delete-item";
import { useBoards } from "../context";

const Item = ({ data, index }) => {
    const [openItemModal, setOpenItemModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { deleteItem } = useBoards();

    return (
        <>
            <li className="items-group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer dark:bg-darkGrey dark:text-white"
                onClick={() => setOpenItemModal(true)}>
                <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data.title}</h4>
            </li>
            <Modal show={openItemModal} onClose={() => setOpenItemModal(false)}>
                <ItemDetailModal
                    data={data}
                    close={() => setOpenItemModal(false)}
                    switchToUpdate={() => {
                        setOpenItemModal(false);
                        setUpdateModal(true);
                    }}
                    switchToDelete={() => {
                        setOpenItemModal(false);
                        setDeleteModal(true);
                    }} />
            </Modal>
            <Modal show={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                <UpdateItemModal data={data} close={() => setUpdateModal(false)} />
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                <DeleteItemModal
                    title={data.title}
                    onClose={() => {
                        setDeleteModal(false);
                        setOpenItemModal(true);
                    }}
                    onConfirm={() => {
                        console.log("asd")
                        deleteItem(data.id)
                        setDeleteModal(false);
                    }} />
            </Modal>
        </>
    )
}
export default Item