import React, { useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import QuestionsIcon from '../../img/questions-icon.svg';
import Card from '../../components/Card';
import _QUESTION from '../../data/Question';
import QuestionWrapper from '../../components/Question/QuestionWrapper';

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

    return (
        <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={QuestionsIcon} /> Questions</React.Fragment>}>
            <div className="questions-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        fields.map((obj, i) => {
                            return _QUESTION.GET[obj.value]({ questionRef: el => questionRefs.current[i] = el, key: obj.id, number: i + 1, id: obj.id, type: obj, changeTypeCallback: changeType, register: register, errors: errors, setValue: setValue, getValues: getValues, watch: watch, setError: setError, control: control, focus: true, formState: formState });
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
