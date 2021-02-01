const consants = {
    IDENTIFY: { label: "Identify", value: "IDENTIFY" },
    MULTIPLE_CHOICE: { label: "Multiple Choice", value: "MULTIPLE_CHOICE" },
    TRUE_FALSE: { label: "True / False", value: "TRUE_FALSE" },
    MATCHING: { label: "Matching", value: "MATCHING" },
    ESSAY: { label: "Essay", value: "ESSAY" },
    CODE: { label: "Code", value: "CODE" },
    VIDEO: { label: "Video", value: "VIDEO" },
}

export default {
    CONSTANTS: consants,
    GET: {
        IDENTIFY: (props) => <Identify {...props} />,
        MULTIPLE_CHOICE: (props) => <MultipleChoice {...props} />,
        TRUE_FALSE: (props) => <TrueFalse {...props} />,
        MATCHING: (props) => <Matching {...props} />,
        ESSAY: (props) => <Essay {...props} />,
        CODE: (props) => <Code {...props} />,
        VIDEO: (props) => <Video {...props} />
    }
}