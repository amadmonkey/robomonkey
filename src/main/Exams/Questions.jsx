// app
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

// components
import Card from '../../components/Card';
import Form from '../../components/Form';
import QuestionWrapper from '../../components/Question/QuestionWrapper';

// icons
import QuestionsIcon from '../../img/questions-icon.svg';
import _QUESTION from '../../data/Question';

const Questions = () => {

    const { register, control, handleSubmit, errors, setValue, getValues, watch, setError, formState } = useForm({ mode: 'onChange' });
    const { fields, append, remove, insert } = useFieldArray({ name: `question`, control: control });

    const questionRefs = useRef([]);

    const onSubmit = data => {
        console.table(data);
    };

    console.log('errors', errors);

    const changeType = (newType, i) => {
        remove(i - 1);
        insert(i - 1, newType)
    }

    const additionalButtons = () => {
        return <Link to="/exams/new-exam/details" className="button bg-default hover">Previous</Link>
    }

    return (
        <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={QuestionsIcon} /> Questions</React.Fragment>}>
            <div className="questions-container">
                <Form onSubmit={handleSubmit(onSubmit)} additionalButtons={additionalButtons()}>
                    {
                        fields.map((obj, i) => {
                            return _QUESTION.GET[obj.value]({ questionRef: el => questionRefs.current[i] = el, key: obj.id, number: i + 1, id: obj.id, type: obj, changeTypeCallback: changeType, register: register, errors: errors, setValue: setValue, getValues: getValues, watch: watch, setError: setError, control: control, focus: true, formState: formState });
                        })
                    }
                </Form>
                <QuestionWrapper changeTypeCallback={(data) => append(data)} style={{ width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "40px" }} />
            </div>
        </Card>
    )
}

export default Questions
