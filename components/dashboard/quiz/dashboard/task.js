import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Modal from "../modal";
import TaskDetailModal from "../modal/task-detail";
import UpdateTaskModal from "../modal/update-task";
import DeleteTaskModal from "../modal/delete-task";
import { useBoards } from "../context";

const Task = ({ data, index }) => {
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { deleteTask } = useBoards();

    //number of completed subtasks
    const completedSubtasks = data.subtasks.reduce((acc, subtask) => subtask.isCompleted ? acc + 1 : acc, 0);
    return (
        <Draggable draggableId={data.slug} index={index} >
            {(provided) => (
                <>
                    <li className="group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white"
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        onClick={() => setOpenTaskModal(true)}>
                        <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data.title}</h4>
                        <p className="body-md text-mediumGrey">{completedSubtasks} of {data.subtasks.length} subtasks</p>
                    </li>
                    <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
                        <TaskDetailModal
                            data={data}
                            completedSubtasks={completedSubtasks}
                            close={() => setOpenTaskModal(false)}
                            switchToUpdate={() => {
                                setOpenTaskModal(false);
                                setUpdateModal(true);
                            }}
                            switchToDelete={() => {
                                setOpenTaskModal(false);
                                setDeleteModal(true);
                            }} />
                    </Modal>
                    <Modal show={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                        <UpdateTaskModal data={data} close={() => setUpdateModal(false)} />
                    </Modal>
                    <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                        <DeleteTaskModal
                            title={data.title}
                            onClose={() => {
                                setDeleteModal(false);
                                setOpenTaskModal(true);
                            }}
                            onConfirm={() => {
                                deleteTask(data.id)
                                setDeleteModal(false);
                            }} />
                    </Modal>
                </>
            )}
        </Draggable>
    )
}
export default Task