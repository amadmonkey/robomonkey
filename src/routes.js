import Login from './main/Login';
import Home from './main/Home';
import Exams from './main/Exams';
import NewExam from './main/Exams/NewExam';
import Details from './main/Exams/Details';
import NotFound from './main/404';

class Route {
    constructor({ label = "", path = "", component = "", exact = true, loggedin = false, visible = false }) {
        this.label = label;
        this.path = path;
        this.component = component;
        this.exact = exact;
        this.visible = visible;
    }
}

const routes = {
    home: new Route({
        label: "Home",
        path: "/",
        component: Home,
        exact: true,
        visible: true
    }),
    login: new Route({
        label: "Login",
        path: "/login",
        component: Login,
        exact: true,
        visible: false
    }),
    exams: new Route({
        label: "Exams",
        path: "/exams",
        component: Exams,
        exact: true,
        visible: false
    }),
    new_exam: new Route({
        label: "New Exam",
        path: "/exams/new-exam",
        component: NewExam,
        exact: true,
        visible: false,
    }),
    new_exam_part: new Route({
        label: "New Exam",
        path: "/exams/new-exam/:part",
        component: NewExam,
        exact: true,
        visible: false,
    }),
    not_found: new Route({
        label: "404",
        path: "/404",
        component: NotFound,
        exact: false,
        visible: false
    })
}

export default routes
