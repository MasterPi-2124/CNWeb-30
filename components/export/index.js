import React, { useState, useEffect } from "react";
import { Dropdown } from "@nextui-org/react";
import { instanceCoreApi } from "@/services/setupAxios";
import * as XLSX from "xlsx";

const API = process.env.NEXT_PUBLIC_API;

const Export = ({ token }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [quiz, setQuiz] = useState("");

    useEffect(() => {
        instanceCoreApi.get(`${API}/quizzes`).then(res => {
            setQuizzes(res.data.data);
        }).catch(err => {
            console.error(err);
        })
    }, []);

    const handleExport = (event) => {
        event.preventDefault();
        if (quiz !== "") {
            getResponses(quiz)
        }
    }

    const getResponses = (quizID) => {
        instanceCoreApi.get(`${API}/quizRecords/${quizID}`).then(res => {
            const list = res.data.data.studentList;
            const worksheet = XLSX.utils.json_to_sheet(list);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            const downloadUrl = URL.createObjectURL(data);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${quizID}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    return (
        <>
            <form className="form" onSubmit={handleExport}>
                <label>First, choose a quiz to export</label>
                <Dropdown className="classes-choices">
                    <Dropdown.Button flat>
                        {quiz ? quiz : 'Choose a quiz'}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="primary"
                        items={quizzes}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={quiz}
                    >
                        {quizzes?.map((data) => {
                            return <Dropdown.Item
                                key={data._id}
                                style={{ display: 'flex' }}
                                description={`Class ID: ${data._class.codename}`}
                            >
                                <button
                                    onClick={() => {
                                        setQuiz(data._id);
                                    }}
                                >
                                    {data._id}
                                </button>
                            </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <button type="submit">Export</button>
            </form>
        </>
    )
};

export default Export;