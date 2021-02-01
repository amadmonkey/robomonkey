import React, { useState, useEffect } from 'react';
import Exam from '../../img/exam.svg';
import Plus from '../../img/plus.svg';
import Card from '../Card';
import Tooltip from '../../components/Tooltip';
import Tag from '../../components/Tag';
import { Link } from 'react-router-dom';
import { ReactComponent as Pin } from '../../img/pin.svg';
import { ReactComponent as Trash } from '../../img/trash.svg';
import './style.scss';

const ExamsTable = (props) => {

    const [examList, setExamList] = useState([]);

    useEffect(() => {
        setExamList([
            {
                name: "Lorem Ipsum",
                date_published: "October 3, 2020",
                last_updated: "an hour ago",
                questions: {
                    questions_id: 9678354798423,
                    count: 81,
                },
                participants: {
                    participants_id: 390847287564,
                    count: 11
                },
                tags: [
                    {
                        name: "English",
                        color: "#5B8CBC",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Code",
                        color: "#F65C5C",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Scratch Page",
                        color: "#FFC857",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Calculator",
                        color: "#33C778",
                        link: "/add-tag-to-filter",
                    },
                ]
            },
            {
                name: "Lorem Ipsum",
                date_published: "October 3, 2020",
                last_updated: "an hour ago",
                questions: {
                    questions_id: 9678354798423,
                    count: 81,
                },
                participants: {
                    participants_id: 390847287564,
                    count: 11
                },
                tags: [
                    {
                        name: "English",
                        color: "#5B8CBC",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Code",
                        color: "#F65C5C",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Scratch Page",
                        color: "#FFC857",
                        link: "/add-tag-to-filter",
                    },
                    {
                        name: "Calculator",
                        color: "#33C778",
                        link: "/add-tag-to-filter",
                    },
                ]
            }
        ]);
    }, [])

    const getLink = () => {
        return props.dashboard ?
            { label: "Go to Exams", link: "/exams" } :
            {
                label:
                    <button>
                        <img src={Exam} />
                        <img src={Plus} />
                    </button>,
                link: "/new-exam"
            }
    }


    return (
        <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={Exam} /> Exams</React.Fragment>} link={props.link}>
            {/* <div className="tools">
                <Link to="/new-exam">
                    <button>
                        <img src={Exam} />
                        <img src={Plus} />
                    </button>
                </Link>
            </div> */}
            <table className="exams-table">
                {/* <thead>
                    <th className="details">Details</th>
                    <th className="numbers"></th>
                    <th className="tags">Tags</th>
                    <th className="tools"></th>
                </thead> */}
                <tbody>
                    {
                        examList.length &&
                        examList.map((obj, i) => {
                            return (
                                <tr key={i}>
                                    <td className="details">
                                        <h1>{obj.name}</h1>
                                        <p>Published on <b>{obj.date_published}</b></p>
                                        <p>Updated <b>{obj.last_updated}</b></p>
                                    </td>
                                    <td className="numbers">
                                        <p>Questions: <b>{obj.questions.count}</b></p>
                                        <p>Participants: <b>{obj.participants.count}</b></p>
                                    </td>
                                    <td className="tags">
                                        {
                                            obj.tags.map((obj, i) => {
                                                return <Tag key={i} data={obj} />
                                            })
                                        }
                                    </td>
                                    <td className="tools">
                                        <Tooltip label="Pin"><button className="tool-pin"><Pin /></button></Tooltip>
                                        <Tooltip label="Delete"><button className="tool-delete"><Trash /></button></Tooltip>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        </Card >
    )
}

export default ExamsTable
