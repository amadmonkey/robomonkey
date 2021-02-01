import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import QuestionsIcon from '../../img/questions-icon.svg';
import Card from '../../components/Card';
import Question from '../../components/Question';

import _QUESTION from '../../data/Question';

import InputWrapper from '../../components/InputWrapper';
import Input from '../../components/Input';
import Identify from '../../components/Question/Identify';
import QuestionWrapper from '../../components/Question/QuestionWrapper';

const Questions = () => {

    const [questions, setQuestions] = useState([]);
    const { register, control, handleSubmit, errors, setValue, getValues, setError } = useForm({ mode: 'onChange' });
    const { fields, append, remove, insert } = useFieldArray({ name: `question`, control: control });
    const onSubmit = data => {
        console.table(questions);
        console.table(data);
    };

    // const add = data => {
    //     // setQuestions([...questions, data]);
    //     append(data)
    //     console.table(questions);
    // };

    useEffect(() => {
        console.table(fields);
    }, [])

    console.log('errors', errors);

    const changeType = (newType, number) => {
        remove(number - 1);
        insert(number - 1, newType)
        // setQuestions([...questions.slice(0, number - 1), newType, ...questions.slice((number - 1) + 1)]);
    }

    return (
        <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={QuestionsIcon} /> Questions</React.Fragment>}>
            <div className="questions-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        fields.map((obj, i) => {
                            return _QUESTION.GET[obj.value]({ key: obj.id, number: i + 1, id: obj.id, type: obj, changeTypeCallback: changeType, register: register, errors: errors, setValue: setValue, getValues: getValues, setError: setError, control: control, focus: true });
                        })
                    }
                    <button type="submit" className="submit card">Next</button>
                </form>
                <QuestionWrapper changeTypeCallback={(data) => append(data)} />
            </div>
        </Card>
    )
}

export default Questions
