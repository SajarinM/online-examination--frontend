import React from "react";

const Select = ({
    name,
    label,
    error,
    options,
    formGroupClassName,
    formErrorClassName,
    formLabelClassName,
    valuePath,
    ...rest
}) => {
    return (
        <div className={formGroupClassName}>
            {label && (
                <label className={formLabelClassName} htmlFor={name}>
                    {label}
                </label>
            )}
            <select {...rest} name={name} id={name}>
                <option value="" />
                {options.map((option) => (
                    <option key={option._id} value={option[valuePath]}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div className={`${formErrorClassName} ${error ? "" : "u-hidden"}`}>
                {error || "error"}
            </div>
        </div>
    );
};

export default Select;
