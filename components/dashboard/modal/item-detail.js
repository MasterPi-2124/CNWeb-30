import EditButton from "../shared/editButton";

const ItemDetailModal = ({ type, data, responses, switchToDelete }) => {
  if (type === "class") {
    return (
      <div className="modal w-full mx-auto rounded-md p-6 dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="heading-lg">{data.title}</h1>
          <EditButton
            switchToDelete={switchToDelete}
            className="bottom-0 left-0 -translate-x-2/4 translate-y-28"
          />
        </div>
        <p className="body-lg text-mediumGrey">
          Class Id: {data.codename}
        </p>
        <p className="body-lg text-mediumGrey">
          Subject: {data.subject}
        </p>
  
        <p className="body-lg text-mediumGrey">
          Semester: {data.semester}
        </p>
  
        <p className="body-lg text-mediumGrey">
          Total Student: {data.studentCount}
        </p>
  
        <p className="body-lg text-mediumGrey">
          Note: {data.note}
        </p>
  
  
  
      </div>
    )
  } else {
    return (
      <div className="modal w-full mx-auto rounded-md p-6 dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="heading-lg">{data.title}</h1>
          <EditButton
            switchToDelete={switchToDelete}
            itemId={data.id}
            type="Item"
            className="bottom-0 left-0 -translate-x-2/4 translate-y-28"
          />
        </div>
        <p className="body-lg text-mediumGrey">
          Start Time: {new Date(data.startTime).toLocaleString()}
        </p>
        <p className="body-lg text-mediumGrey">
          Subject: {data._class.subject}
        </p>
        <p className="body-lg text-mediumGrey">
          Responses: {responses.length}
        </p>
        <p className="body-lg text-mediumGrey">
          Interval: {(new Date(data.endTime) - new Date(data.startTime)) / 1000 / 60} mins
        </p>
        <p className="body-lg text-mediumGrey">
          Start Time: {data.startTime}
        </p>
  
      </div>
    )
  }
  
}
export default ItemDetailModal
