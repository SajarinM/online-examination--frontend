import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/Form/useForm";

const questionTypes = [
    { _id: 0, name: "optional" },
    { _id: 1, name: "custom" },
];

const QuestionForm = ({ selectedQuestion, addQuestion }) => {
    const [data, setData] = useState({
        type: "",
        label: "",
        mark: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });
    const [errors, setErrors] = useState({});
    const [schema, setSchema] = useState({});

    const {
        handleSubmit,
        renderTextInput,
        renderSubmitButton,
        renderResetButton,
        renderSelect,
    } = useForm({
        data,
        setData,
        errors,
        setErrors,
        doSubmit: function () {
            addQuestion(mapToPhysicalModel(data));
        },
        onReset: function (e) {
            e.preventDefault();
            let newData = {};
            for (let item of Object.keys(data)) newData[item] = "";
            newData._id = data._id;
            setData(newData);
            setErrors({});
        },
        requiresValidation: true,
        schema,
    });

    useEffect(() => {
        function getSchema() {
            const { type } = data;
            if (type === "optional") {
                return {
                    type: Joi.string().valid("optional", "custom").required(),
                    label: Joi.string().required(),
                    mark: Joi.string().required(),
                    option1: Joi.string().required(),
                    option2: Joi.string().required(),
                    option3: Joi.string().required(),
                    option4: Joi.string().required(),
                    answer: Joi.string().required(),
                };
            }

            return {
                type: Joi.string().valid("optional", "custom").required(),
                label: Joi.string().required(),
                mark: Joi.string().required(),
            };
        }
        setSchema(getSchema());
    }, [data]);

    useEffect(() => {
        function mapToViewModel(question) {
            const data = {
                _id: question._id,
                type: question.type,
                label: question.label,
                mark: question.mark,
            };
            if (question.type === "optional") {
                data.option1 = question.options[0];
                data.option2 = question.options[1];
                data.option3 = question.options[2];
                data.option4 = question.options[3];
                data.answer = question.answer;
            }
            return data;
        }
        if (!selectedQuestion) return;
        setData(mapToViewModel(selectedQuestion));
    }, [selectedQuestion]);

    function mapToPhysicalModel(data) {
        const question = {
            type: data.type,
            label: data.label,
            mark: data.mark,
        };
        if (data.type === "optional") {
            const { option1, option2, option3, option4, answer } = data;
            question.options = [option1, option2, option3, option4];
            question.answer = answer;
        }
        if (data._id) {
            question._id = data._id;
        }
        return question;
    }

    function getPossibleAnswers() {
        const answers = [];
        for (let i = 1; i < 5; i++) {
            if (data[`option${i}`]) {
                answers.push({ _id: i, name: data["option" + i] });
            }
        }
        return answers;
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {renderSelect({
                name: "type",
                label: "Question Type",
                options: questionTypes,
                valuePath: "name",
            })}

            {renderTextInput({
                name: "label",
                label: "Question",
            })}

            {renderTextInput({
                name: "mark",
                label: "Mark",
            })}

            {data.type === "optional" && (
                <section className="question-type-optional">
                    <div className="row">
                        <div className="col-1-of-4">
                            {renderTextInput({
                                name: "option1",
                                label: "Option 1",
                                formErrorClassName: "u-hide",
                            })}
                        </div>
                        <div className="col-1-of-4">
                            {renderTextInput({
                                name: "option2",
                                label: "Option 2",
                            })}
                        </div>
                        <div className="col-1-of-4">
                            {renderTextInput({
                                name: "option3",
                                label: "Option 3",
                            })}
                        </div>
                        <div className="col-1-of-4">
                            {renderTextInput({
                                name: "option4",
                                label: "Option 4",
                            })}
                        </div>
                    </div>
                    {renderSelect({
                        name: "answer",
                        label: "Answer",
                        options: getPossibleAnswers(),
                        valuePath: "name",
                    })}
                </section>
            )}

            <div className="form__button-group u-pad-y-2">
                {renderSubmitButton("Submit", "btn btn--green")}
                {renderResetButton("Reset", "btn btn--green")}
            </div>
        </form>
    );
};

export default QuestionForm;
