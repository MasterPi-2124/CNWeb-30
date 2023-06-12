import { useBoards } from "../context";
import EditButton from "../shared/editButton";
import StatusDropdown from "../shared/statusDropdown";

const ItemDetailModal = ({ data, switchToUpdate, switchToDelete }) => {

  return (
    <div className="modal w-full mx-auto rounded-md p-6 dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="heading-lg">{data.title}</h1>
            <EditButton
            switchToUpdate={switchToUpdate}
            switchToDelete={switchToDelete}
            itemId={data.id}
            type="Item"
            className="bottom-0 left-0 -translate-x-2/4 translate-y-28"/>
        </div>
        <p className="body-lg text-mediumGrey">
            {data.description}
        </p>

        <StatusDropdown label="Current Status" data={data} />

    </div>
  )
}
export default ItemDetailModal
