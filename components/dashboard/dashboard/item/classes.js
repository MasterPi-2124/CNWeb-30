import { useState } from "react";
import { useBoards } from "../../context";
import axios from "axios";
import Modal from "../../class/modal";
import ItemDetailModal from "../../class/modal/item-detail";
import DeleteItemModal from "../../class/modal/delete-item";

const API = process.env.NEXT_PUBLIC_API;
const HOST = process.env.NEXTAUTH_URL;

const ClassItem = ({ data }) => {
    const [openItemModal, setOpenItemModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { deleteItem } = useBoards();

    return (
        <>
            <li className="items-group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer dark:bg-darkGrey dark:text-white"
                onClick={() => setOpenItemModal(true)}>
                <div className="item-title">
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data._id}</h4>
                </div>
                <hr />
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
            <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                <DeleteItemModal
                    title={data._id}
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
export default ClassItem