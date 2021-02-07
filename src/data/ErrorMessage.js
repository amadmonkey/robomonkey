export default {
    GENERAL: {
        REQUIRED: (field) => <><span className="bold">{field}</span> field is required</>,
        QUESTION: "Enter a question",
        ANSWER: "Provide an answer for your question"
    },
    MULTIPLE_CHOICE: {
        REQUIRED_ANSWER: "Please choose an answer from the list of choices",
        REQUIRED_CHOICES: "Please add two or more choices to choose from"
    },
    TRUE_FALSE: {
        REQUIRED: "Is your question true or false?",
    },
    MATCHING: {
        REQUIRED_CHOICES: (col) => <>Please add 1 or more choices to column <span className="bold">{col}</span></>
    }
}