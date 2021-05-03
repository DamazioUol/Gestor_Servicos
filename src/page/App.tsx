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
        <ServiceContext>
            <TodoContext>
                <Router>
                    <NavBar></NavBar>
                    <br />
                    <div className="uk-container"  >
                        <Switch>
                            <Route path="/editTodo/:id" render={(props) => <AddTodo {...props} />}>
                            </Route>
                            <Route path="/addTodo">
                                <AddTodo />
                            </Route>
                            <Route path="/todo">
                                <TodoList />
                            </Route>

                            <Route path="/editService/:id" render={(props) => <AddService {...props} />}>
                            </Route>
                            <Route path="/addService">
                                <AddService />
                            </Route>
                            <Route path="/service">
                                <ServiceList />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </TodoContext>
        </ServiceContext>
    );
}

export default App;