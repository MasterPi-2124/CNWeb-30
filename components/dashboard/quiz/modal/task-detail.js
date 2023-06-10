import { useBoards } from "../context";
import EditButton from "../shared/editButton";
import StatusDropdown from "../shared/statusDropdown";

const TaskDetailModal = ({ data, switchToUpdate, switchToDelete }) => {

  return (
    <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="heading-lg">{data.title}</h1>
            <EditButton
            switchToUpdate={switchToUpdate}
            switchToDelete={switchToDelete}
            taskId={data.id}
            type="Task"
            className="bottom-0 left-0 -translate-x-2/4 translate-y-28"/>
        </div>
        <p className="body-lg text-mediumGrey">
            {data.description}
        </p>

        <StatusDropdown label="Current Status" data={data} />

    </div>
  )
}
export default TaskDetailModal
