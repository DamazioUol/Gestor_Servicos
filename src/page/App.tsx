import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";
import LoginContext from '../contexts/Login/LoginContext';
import ServiceContext from '../contexts/Service/ServiceContext';
import TodoContext from "../contexts/Todo/TodoContext";
import Home from './Home/Home';
import Login from './Login/Login';
import AddService from './Service/AddService/AddService';
import ServiceList from './Service/Page/ServiceList';
import AddTodo from './Todo/AddTodo/AddTodo';
import TodoList from "./Todo/Page/TodoList";

const App = () => {
    return (
        <LoginContext>
            <TodoContext>
                <ServiceContext>
                    <Router>
                        <Route render={(props) => <NavBar {...props} />} />
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

                                <Route path="/editService/:id" render={(props) => <AddService {...props} />}>
                                </Route>
                                <Route path="/addService" render={(props) => <AddService {...props} />}>
                                </Route>

                                <Route path="/login" render={(props) => <Login {...props} />}>
                                </Route>

                                <Route path="/service">
                                    <ServiceList />
                                </Route>
                                <Route path="/todo">
                                    <TodoList />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </ServiceContext>
            </TodoContext>
        </LoginContext>
    );
}

export default App;