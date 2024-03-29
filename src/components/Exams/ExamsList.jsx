import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { ExamContext } from "../../contexts/examContext";
import Card from "../common/Card/Card";
import "./Examslist.scss";
import date from "./../../utilities/date";
import Icon from "./../common/Icon/Icon";
import ListGroup from "../common/ListGroup";

const navItems = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Upcoming",
        value: "upcoming",
    },
    {
        label: "Ended",
        value: "ended",
    },
];

const ExamsList = ({ exams }) => {
    const [selectedStatus, setSelectedStatus] = useState(navItems[1]);

    const {
        user: { isTeacher },
    } = useContext(UserContext);
    const { deleteExam } = useContext(ExamContext);

    function mapToCardModel(exam) {
        const {
            _id,
            startingTime,
            dueTime,
            name,
            noOfQuestions,
            author,
            totalMarks,
        } = exam;

        const isOnTime =
            new Date(startingTime) <= new Date() &&
            new Date() <= new Date(dueTime);

        const card = {
            title: name,
            details: [
                `Start : ${date.toDisplay(startingTime)}`,
                `Due : ${date.toDisplay(dueTime)}`,
                `No Of Questions : ${noOfQuestions}`,
                `Total Marks : ${totalMarks}`,
                `Invigilator : ${author.name}`,
            ],
            buttons: [
                {
                    icon: isTeacher ? (
                        <Icon name="edit-pencil" size="15" />
                    ) : null,
                    text: `${isTeacher ? "" : "Start Now"}`,
                    link: `/exams/${isTeacher ? _id : "write/" + _id}`,
                    className: `btn-warning btn-round`,
                    disabled: isTeacher ? false : !isOnTime,
                },
                {
                    text: "Results",
                    link: `/results/?exam=${_id}`,
                    className: `btn-primary btn-round`,
                },
            ],
            isHoverEnabled: isTeacher ? true : isOnTime,
        };

        if (isTeacher) {
            card.buttons.splice(1, 0, {
                icon: <Icon name="bin" size="18" />,
                link: `/exams`,
                disabled: isTeacher ? false : !isOnTime,
                className: "btn-danger btn-round",
                onClick: () => {
                    deleteExam(_id);
                },
            });
            card.details.pop();
        } else if (!exam.isResultPublished) {
            card.buttons.pop();
        }

        return card;
    }

    function getFilteredExams(exams) {
        const currentTime = new Date();
        return exams.filter((e) => {
            if (selectedStatus.value === "all") {
                return true;
            } else if (selectedStatus.value === "upcoming") {
                return currentTime < e.startingTime;
            } else if (selectedStatus.value === "ended") {
                return currentTime > e.dueTime;
            }
            return currentTime >= e.startingTime && currentTime <= e.dueTime;
        });
    }
    const filteredExams = getFilteredExams(exams);
    return (
        <>
            <ListGroup
                items={navItems}
                selectedItem={selectedStatus}
                onItemSelect={(status) => setSelectedStatus(status)}
                containerClassName="navigation-sub"
                itemClassName="navigation-sub__item"
                itemActiveClassName="navigation-sub__item--active"
                keyProperty="label"
            />
            {filteredExams.length && (
                <div className="card-container">
                    {filteredExams.map((exam) => (
                        <Card key={exam._id} {...mapToCardModel(exam)} />
                    ))}
                </div>
            )}
            {!filteredExams.length && (
                <div className="card-container">
                    No{" "}
                    {selectedStatus.label === "All" ? "" : selectedStatus.label}{" "}
                    Exams
                </div>
            )}
        </>
    );
};

export default ExamsList;
