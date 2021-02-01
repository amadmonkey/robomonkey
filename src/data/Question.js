import Code from '../components/Question/Code';
import Essay from '../components/Question/Essay';
import Identify from '../components/Question/Identify'; 
import Matching from '../components/Question/Matching';
import MultipleChoice from '../components/Question/MultipleChoice';
import TrueFalse from '../components/Question/TrueFalse';
import Video from '../components/Question/Video';

class QuestionType {
    constructor(label, value, component){
        this.label = label;
        this.value = value;
        this.component = component;
    }
    getComponent() {
        return this.component;
    }
}

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