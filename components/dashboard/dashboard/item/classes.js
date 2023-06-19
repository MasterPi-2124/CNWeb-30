import { useState } from "react";
import { useBoards } from "../../context";
import Modal from "../../modal";
import ItemDetailModal from "../../modal/item-detail";
import HumanIcon from "@/assets/icons/thin/human.svg";
import SubjectIcon from "@/assets/icons/thin/subject.svg";
import Image from "next/image";
import DeleteItemModal from "../../modal/delete-item";

const API = process.env.NEXT_PUBLIC_API;

const ClassItem = ({ data }) => {
    const [openItemModal, setOpenItemModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { deleteItem } = useBoards();

    return (
        <>
            <li className="items-group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer dark:bg-darkGrey dark:text-white"
                onClick={() => setOpenItemModal(true)}>
                <div className="item-title">
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">Quiz #{data._id.substring(0, 5)}</h4>
                    <h6>{data.subject}</h6>
                    <hr />
                    <div className="item-footer">
                        <div className="footer-class-name">
                            <Image src={HumanIcon} />
                            <p>{data.studentCount} students</p>
                        </div>
                        <div className="footer-class-name">
                            <Image src={SubjectIcon} />
                            <p>{data.subject}</p>
                        </div>

                    </div>
                </div>
                <hr />
            </li>
            <Modal show={openItemModal} onClose={() => setOpenItemModal(false)}>
                <ItemDetailModal
                    type="class"
                    data={data}
                    close={() => setOpenItemModal(false)}
                    switchToDelete={() => {
                        setOpenItemModal(false);
                        setDeleteModal(true);
                    }}
                />
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                <DeleteItemModal
                    type="class"
                    data={data}
                    onClose={() => {
                        setDeleteModal(false);
                        setOpenItemModal(true);
                    }}
                    onConfirm={() => {
                        deleteItem(data._id)
                        setDeleteModal(false);
                    }} />
            </Modal>
        </>
    )
}
export default ClassItem