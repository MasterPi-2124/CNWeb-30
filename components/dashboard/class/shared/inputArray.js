import { FieldArray } from "formik"
import TextInput from "./textInput"

const InputArray = ({ label, array, ...props }) => {
    return (
        <>
            <label className="body-md capitalize text-mediumGrey dark:text-white mt-6 block">
                {label}
            </label>

            <FieldArray name={label}
                render={arrayHelpers => (
                    <div>
                        {array.map((_, i) => (
                            <div key={i} className="flex">
                                <TextInput name={`${label}[${i}].title`} type="text" placeholder="e.g. Take a break" />
                                <button onClick={() => arrayHelpers.remove(i)} className="text-mediumGrey hover:text-mainRed ml-4">
                                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="currentColor" fillRule="evenodd">
                                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            />
        </>
    )
}
export default InputArray
