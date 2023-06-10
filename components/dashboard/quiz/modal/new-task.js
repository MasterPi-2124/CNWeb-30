import { useBoards } from '../context';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import StatusDropdown from '../shared/statusDropdown';
import TextInput from '../shared/textInput';
import TextArea from '../shared/textArea';
import InputArray from '../shared/inputArray';

const NewTaskModal = ({ onClose }) => {
    const { columns, createTask } = useBoards();
    const [status, setStatus] = useState(columns[0].name);

    const validate = Yup.object({
        title: Yup.string().required("Can't be empty"),

    })
    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                status: status
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log('test');
                values.status = status;
                createTask(values)
                onClose()
            }}
        >
            {formik => (
                <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
                    <h1 className="heading-lg mb-6">Add New Task</h1>
                    <Form>
                        <TextInput label="Title" name="title" type="text" placeholder="e.g. Take coffee break" />
                        <TextArea label="Description" name="description" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." />

                        <StatusDropdown status={status} setStatus={setStatus} />

                        <button type="submit" className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">+ Add New Task</button>
                    </Form>
                </div>
            )}

        </Formik>
    )
}
export default NewTaskModal
