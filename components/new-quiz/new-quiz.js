import { useEffect, useState } from "react"
import ChooseClass from "./choose-class";
import CreateQuiz from "./create-quiz";

const NewQuiz = ({ token }) => {
    const [classSelected, setClassSelected] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const savedClass = JSON.parse(localStorage.getItem("classSelected"));
        if (savedClass !== null && Object.keys(savedClass).length > 0) {
            setClassSelected(savedClass);
            setSubmitted(true);
        } else {
            setSubmitted(false);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (classSelected.className) {
            localStorage.setItem("classSelected", JSON.stringify(classSelected));
            setSubmitted(true);
        } else {
            setSubmitted(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
    }

    return (
        <div className="content">
            {(!submitted) ? (
                <ChooseClass
                    classSelected={classSelected}
                    setClassSelected={setClassSelected}
                    handleSubmit={handleSubmit}
                    token={token}
                />
            ) : (
                <CreateQuiz
                    classSelected={classSelected}
                    setClassSelected={setClassSelected}
                    handleReset={handleReset}
                    token={token}
                />
            )}
        </div>
    );
};

export default NewQuiz;