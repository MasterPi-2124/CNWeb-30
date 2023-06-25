import QuizItem from "./quizzes";
import ClassItem from "./classes";

const Item = ({ type, data, token, index }) => {

    if (type == "Quizzes") {
        return <QuizItem data={data} token={token} />;
    } else if (type == "Classes") {
        return <ClassItem data={data} token={token} />;
    }
}
export default Item