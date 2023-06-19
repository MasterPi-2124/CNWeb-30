import { useState, useEffect } from "react";
import Modal from "../../modal";
import ItemDetailModal from "../../modal/item-detail";
import DeleteItemModal from "../../modal/delete-item";
import QRModal from "../../modal/qr-full";
import { useBoards } from "../../context";
import ClassIcon from "@/assets/icons/thin/class.svg";
import TimeIcon from "@/assets/icons/thin/time.svg";
import DateIcon from "@/assets/icons/thin/date.svg";
import HumanIcon from "@/assets/icons/thin/human.svg";
import Image from "next/image";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;
const HOST = process.env.NEXT_PUBLIC_BASE_URL;

const QuizItem = ({ data }) => {
    const [openItemModal, setOpenItemModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [qrModal, setQRModal] = useState(false);
    const { deleteItem } = useBoards();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${API}/quizRecords/${data._id}`).then(res => {
                console.log("ahihi", res.data)
                setResponses(res.data.data.studentList);
            })

        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <>
            <li className="items-group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer dark:bg-darkGrey dark:text-white"
                onClick={() => setOpenItemModal(true)}>
                <div className="item-title">
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">Quiz #{data._id.substring(0, 5)}</h4>
                    {data.status === "In Progress" ? (
                        <button onClick={() => {
                            setQRModal(true);
                            setOpenItemModal(false);
                        }}>
                            Get QR
                        </button>
                    ) : data.status === "Finished" ? (
                        <button onClick={() => {
                            setQRModal(true);
                        }}>
                            See Result
                        </button>
                    ) : (
                        <></>
                    )}

                </div>
                <hr />
                <div className="item-footer">
                    <div className="footer-class-name">
                        <Image src={ClassIcon} />
                        <p>{data._class.subject}</p>
                    </div>
                    <div className="footer-class-name">
                        <Image src={TimeIcon} />
                        <p>{(new Date(data.endTime) - new Date(data.startTime)) / (1000 * 60)} mins</p>
                    </div>
                    <div className="footer-class-name">
                        <Image src={DateIcon} />
                        <p>{new Date(data.startTime).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                    </div>
                    <div className="footer-class-name">
                        <Image src={HumanIcon} />
                        <p>{responses.length}/{data._class.studentCount}</p>
                    </div>
                </div>
            </li>
            <Modal show={openItemModal} onClose={() => setOpenItemModal(false)}>
                <ItemDetailModal
                    type="quiz"
                    data={data}
                    responses={responses}
                    close={() => setOpenItemModal(false)}
                    switchToDelete={() => {
                        setOpenItemModal(false);
                        setDeleteModal(true);
                    }}
                />
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                <DeleteItemModal
                    type="quiz"
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
            <Modal show={qrModal} onClose={() => setQRModal(!qrModal)}>
                <QRModal
                    startTime={data.startTime}
                    endTime={data.endTime}
                    url={`${HOST}/quiz/${data._id}`}
                />
            </Modal>
        </>
    )



}
export default QuizItem