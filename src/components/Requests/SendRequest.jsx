import React, { useContext, useEffect, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/userContext";
import { RequestContext } from "../../contexts/requestContext";
import useForm from "../common/Form/useForm";
import Icon from "../common/Icon/Icon";
import userService from "../../services/userService";

const SendRequest = () => {
    const { user } = useContext(UserContext);
    const { addRequest } = useContext(RequestContext);

    const [data, setData] = useState({ teacherUsername: "" });
    const [errors, setErrors] = useState({});
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function run() {
            try {
                let { data: newTeachers } = await userService.getTeachers();
                newTeachers = newTeachers.map((t) => {
                    return {
                        id: t.username,
                        name: t.name,
                    };
                });
                setTeachers(newTeachers);
            } catch (error) {
                toast.error("Error loading Teachers");
            }
        }
        run();
    }, []);

    const { handleSubmit, renderSelect, renderSubmitButton } = useForm({
        data,
        setData,
        errors,
        setErrors,
        doSubmit,
        requiresValidation: true,
        schema: {
            teacherUsername: Joi.string()
                .min(3)
                .max(255)
                .email()
                .required()
                .label("Teacher Username"),
        },
    });

    async function doSubmit() {
        try {
            await addRequest(data.teacherUsername, user.username);
            toast.success("Successfully Sent Request to Your Teacher");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const newErrors = { ...errors };
                newErrors.teacherUsername = error.response.data;
                setErrors(newErrors);
            }
        }
    }

    return (
        <form className="form fl-1" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-5-of-6 u-x-center">
                    {renderSelect({
                        name: "teacherUsername",
                        placeholder: "Enter teacher id...",
                        className: "username__input",
                        options: teachers,
                        valuePath: "id",
                        formGroupClassName: "form-group u-x-center fl-1",
                        formErrorClassName: "form__error--popup",
                        autoFocus: true,
                    })}
                </div>
                <div className="col u-x-center m-x-0">
                    {renderSubmitButton({
                        render: (
                            <>
                                <Icon name="send" size="15" />
                                <span>Send Request</span>
                            </>
                        ),
                        className: "btn btn-primary btn-icon btn-round fl-1",
                    })}
                </div>
            </div>
        </form>
    );
};

export default SendRequest;
