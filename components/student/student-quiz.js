import { useEffect, useState } from "react"
import GetLocation from "./get-location";
import GetName from "./get-name";
import GetID from "./get-id";
import GetForm from "./get-form";

const StudentQuiz = ({ quizDetail, classDetail, checkLat, checkLon }) => {
    const [location, setLocation] = useState();
    const [studentName, setStudentName] = useState("");
    const [studentID, setStudentID] = useState();
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const studentLocation = localStorage.getItem("studentLocation");
        const studentName = localStorage.getItem("studentName");
        const studentID = localStorage.getItem("studentID");
        if (studentLocation) {
            setLocation(studentLocation);
            if (studentName) {
                setStudentName(studentName);
                if (studentID) {
                    setStudentID(studentID);
                    setStage(3);
                } else {
                    setStage(2);
                }
            } else {
                setStage(1);
            }
        } else {
            setStage(0);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (location) {
            localStorage.setItem("studentLocation", JSON.stringify(location));
            if (studentName) {
                localStorage.setItem("studentName", JSON.stringify(studentName));
                if (studentID) {
                    localStorage.setItem("studentID", JSON.stringify(studentID));
                    setStage(3);
                } else {
                    setStage(2);
                }
            } else {
                setStage(1);

            }
        } else {
            setStage(0);
        }
    };

    const handleReset = () => {
        setStage(0);
    }

    return (
        <div className="content">
            {
                (stage === 0) ? (
                    <GetLocation
                        quizDetail={quizDetail}
                        classDetail={classDetail}
                        location={location}
                        checkLat={checkLat}
                        checkLon={checkLon}
                        setLocation={setLocation}
                        handleSubmit={handleSubmit}
                    />
                ) : (stage === 1) ? (
                    <GetName
                        quizDetail={quizDetail}
                        classDetail={classDetail}
                        studentName={studentName}
                        setStudentName={setStudentName}
                        handleSubmit={handleSubmit}
                    />
                ) : (stage === 2) ? (
                    <GetID
                        quizDetail={quizDetail}
                        classDetail={classDetail}
                        studentID={studentID}
                        studentName={studentName}
                        setStudentID={setStudentID}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <GetForm
                        studentName={studentName}
                        studentID={studentID}
                        quizDetail={quizDetail}
                        classDetail={classDetail}
                        studentLocation={location}
                    />
                )
            }
        </div>
    );
};

export default StudentQuiz;

20.976799, 105.846851