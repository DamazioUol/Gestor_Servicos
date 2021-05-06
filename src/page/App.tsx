import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";
import ServiceContext from '../contexts/Service/ServiceContext';
import TodoContext from "../contexts/Todo/TodoContext";
import AddService from './Service/AddService/AddService';
import ServiceList from './Service/Page/ServiceList';
import AddTodo from './Todo/AddTodo/AddTodo';
import TodoList from "./Todo/Page/TodoList";


const App = () => {
    return (
        <TodoContext>
            <ServiceContext>
                <Router>
                    <NavBar></NavBar>
                    <br />
                    <div className="uk-container"  >
                        <Switch>
                            <Route path="/finished/:id" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/prefinished/:id" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/info/:id" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/editTodo/:id" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/addTodo" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/todo">
                                <TodoList />
                            </Route>

                            <Route path="/editService/:id" render={(props) => <AddService {...props} />}>
                            </Route>
                            <Route path="/addService" render={(props) => <AddService {...props} />}>
                            </Route>
                            <Route path="/service">
                                <ServiceList />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </ServiceContext>
        </TodoContext>

    );
}

export default App;