import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import DetailsIcon from '../../img/details-icon.svg';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import InputWrapper from '../../components/InputWrapper';
import TypePaper from '../../img/type-paper.svg';
import TypeWizard from '../../img/type-wizard.svg';

const Details = () => {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({ mode: 'onChange', defaultValues: { expiration: 'none', duration: 'none' } });
    const onSubmit = (data) => history.push('/exams/new-exam/questions');

    let form = {
        title: {
            attr: {
                name: 'title',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.title
        },
        description: {
            attr: {
                name: 'description',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 250
            }),
            errors: errors.description
        },
        type: {
            vertical: false,
            attr: {
                name: 'type',
                className: ''
            },
            options: [
                {
                    label: 'Paper',
                    description: 'Show all questions in one page',
                    icon: <img src={TypePaper} alt="TypePaper" />,
                    value: 'PAPER'
                },
                {
                    label: 'Wizard',
                    description: 'Show questions one at a time',
                    icon: <img src={TypeWizard} alt="TypeWizard" />,
                    value: 'WIZARD'
                }
            ],
            ref: register({
                required: true
            }),
            errors: errors.type
        },
        expiration: {
            vertical: true,
            attr: {
                name: 'expiration',
                className: '',
            },
            options: [
                {
                    label: 'none',
                    value: 'none',
                    default: true
                },
                {
                    label: 'in a day',
                    value: '+1'
                },
                {
                    label: 'in 2 days',
                    value: '+2',
                },
                {
                    label: 'in 3 days',
                    value: '+3',
                },
                {
                    label: 'in a week',
                    value: '+7',
                }
            ],
            ref: register({
                required: true
            }),
            errors: errors.expiration
        },
        duration: {
            vertical: true,
            attr: {
                name: 'duration',
                className: '',
            },
            options: [
                {
                    label: 'none',
                    value: 'none',
                },
                {
                    default: true,
                    label: '1 hour',
                    value: '+1',
                },
                {
                    label: '2 hours',
                    value: '+2',
                },
                {
                    label: '3 hours',
                    value: '+3',
                },
                {
                    label: 'a day',
                    value: '+24',
                }
            ],
            ref: register({
                required: true
            }),
            errors: errors.duration
        }
    }

    return (
        <div style={{ maxWidth: "50%", margin: "0 auto" }}>
            <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={DetailsIcon} /> Details</React.Fragment>}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper label="Title" htmlFor="title" errors={errors}>
                        <Input text attr={form['title'].attr} register={form['title'].ref} errors={form['title'].errors} />
                    </InputWrapper>
                    <InputWrapper label="Description" htmlFor="description" errors={errors}>
                        <Input textArea attr={form['description'].attr} register={form['description'].ref} errors={form['description'].errors} />
                    </InputWrapper>
                    <InputWrapper label="Type" htmlFor="type" errors={errors}>
                        <Radio attr={form['type'].attr} options={form['type'].options} register={form['type'].ref} vertical={form['type'].vertical} errors={form['type'].errors} />
                    </InputWrapper>
                    <InputWrapper label={<>Deadline <span className="subtitle">(Optional)</span></>}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', boxSizing: 'border-box' }}>
                            <InputWrapper htmlFor="expiration" errors={errors}>
                                <h1 style={{ color: '#636363', fontSize: '13px', marginBottom: '10px', marginLeft: '42px' }}>Sheet Expiration</h1>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Radio attr={form['expiration'].attr} options={form['expiration'].options} register={form['expiration'].ref} vertical={form['expiration'].vertical}>
                                        <div className="radio-item">
                                            <input type="radio" attr={form['expiration'].attr} ref={form['expiration'].register} />
                                            <h1>custom</h1>
                                        </div>
                                    </Radio>
                                </div>
                            </InputWrapper>
                            <InputWrapper htmlFor="duration" errors={errors}>
                                <h1 style={{ color: '#636363', fontSize: '13px', marginBottom: '10px', marginLeft: '42px' }}>Exam Duration</h1>
                                <div style={{ display: 'flex', flexDirection: 'column' }} >
                                    <Radio attr={form['duration'].attr} options={form['duration'].options} register={form['duration'].ref} vertical={form['duration'].vertical} />
                                </div>
                            </InputWrapper>
                        </div>
                    </InputWrapper>
                    <button type="submit" className="submit card">Next</button>
                </form>
            </Card>
        </div>
    )
}

export default Details
