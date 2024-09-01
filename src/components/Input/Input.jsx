import { BiErrorCircle } from "react-icons/bi";

function Input({ label, type, setFieldValue, errors, touched }) {


    const handleInputFocus = (e) => {
        e.target.classList.add("border-theme", "shadow-md")
    }

    const handleInputBlur = (e) => {
        if (!e.target.value) {
            e.target.classList.remove("border-theme", "shadow-md")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFieldValue(name, value)
    }

    return (
        <div className="flex flex-col gap-y-1">
            <label htmlFor={label} className="pl-1 font-bold capitalize">
                {label}
            </label>
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                id={label}
                className={`py-2 px-3 rounded-md outline-none border ${(errors[label] && touched[label]) && 'border-red-500'}`}
                type={type}
                name={label}
            />
            {
                (errors[label] && touched[label]) && <div className="flex items-center capitalize text-red-500 text-sm py-1 px-2">
                    <BiErrorCircle className="m-1" /> {errors[label]}
                </div>
            }

        </div>
    )
}

export default Input