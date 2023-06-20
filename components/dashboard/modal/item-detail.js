import * as XLSX from "xlsx";
import DeleteIcon from "@/assets/icons/thin/delete.svg";
import Image from "next/image";

const ItemDetailModal = ({ type, data, responses, switchToDelete }) => {
  if (type === "class") {
    return (
      <div className="modal w-full mx-auto rounded-md p-6 dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="heading-lg">Class #{data.codename}</h1>
          <button className="h-8 w-8" onClick={() => switchToDelete()}>
            <Image
              src={DeleteIcon}
              alt="vertical ellipsis"
            />
          </button>
        </div>
        <div className="stats">
          <p className="body-lg text-mediumGrey">
            Class ID: {data.codename}
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
      </div>
    )
  } else {
    const exportResponse = () => {
      const worksheet = XLSX.utils.json_to_sheet(responses);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const payload = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      const downloadUrl = URL.createObjectURL(payload);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${data._id}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return (
      <div className="modal w-full mx-auto rounded-md p-6 dark:bg-darkGrey md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="heading-lg">Quiz #{data._id.substring(0, 5)}</h1>
          <button className="h-8 w-8" onClick={() => switchToDelete()}>
            <Image
              src={DeleteIcon}
              alt="vertical ellipsis"
            />
          </button>
        </div>
        <div className="stats">
          <p className="body-lg text-mediumGrey">
            Start Time: {new Date(data.startTime).toLocaleString()}
          </p>
          <p className="body-lg text-mediumGrey">
            End Time: {new Date(data.endTime).toLocaleString()}
          </p>
          <p className="body-lg text-mediumGrey">
            Class: {data._class.codename}
          </p>
          <p className="body-lg text-mediumGrey">
            Subject: {data._class.subject}
          </p>
          <p className="body-lg text-mediumGrey">
            Responses: {responses.length} / {data._class.studentCount}
          </p>
          <p className="body-lg text-mediumGrey">
            Interval: {(new Date(data.endTime) - new Date(data.startTime)) / 1000 / 60} mins
          </p>
        </div>
        <div className="responses">
          <h2>Responses:</h2>
          <table className="responses-list">
            <thead>
              <tr>
                <th>Student</th>
                <th>Valid</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {responses.length > 0 ? (
                responses.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <p className="name">
                        {item.studentName}
                      </p>
                      <p className="id">
                        {item.studentId}
                      </p>
                    </td>
                    <td>{item.isValid ? 'Yes' : 'No'}</td>
                    <td>{item.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty" colSpan="3">No responses yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data.status === "Finished" ? (
          <button onClick={exportResponse} className="export-button">
            Export
          </button>
        ) : (
          <></>
        )
        }

      </div>
    )
  }

}
export default ItemDetailModal
