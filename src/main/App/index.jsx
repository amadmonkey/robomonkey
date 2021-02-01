// app
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ROUTES from '../../routes.js';

// styles
import './style.scss';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                {Object.keys(_ROUTES).map((key, i) => {
                    return <Route key={i} path={_ROUTES[key].path} component={_ROUTES[key].component} exact={_ROUTES[key].exact} />
                })}
                <Route component={_ROUTES["not_found"].component} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
