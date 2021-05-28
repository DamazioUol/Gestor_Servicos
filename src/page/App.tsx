import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute/GuardRoute';
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
import AddUser from './User/AddUser';

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

                                <GuardRoute path="/finished/:id" component={AddTodo} auth={true} />
                                <GuardRoute path="/prefinished/:id" component={AddTodo} auth={true} />
                                <GuardRoute path="/info/:id" component={AddTodo} auth={true} />
                                <GuardRoute path="/editTodo/:id" component={AddTodo} auth={true} />

                                <GuardRoute path="/editService/:id" component={AddService} auth={true} />
                                <GuardRoute path="/editService/:id" component={AddService} auth={true} />

                                <GuardRoute path="/editService/:id" component={AddService} auth={true} />
                                <GuardRoute path="/addService" component={AddService} auth={true} />

                                <GuardRoute path="/register" component={AddUser} auth={false} />
                                <GuardRoute path="/editUser" component={AddUser} auth={true} />

                                <GuardRoute path="/service" component={ServiceList} auth={true} />
                                <GuardRoute path="/login" component={Login} auth={false} />

                                <GuardRoute path="/todo" component={TodoList} auth={true} />
                                <GuardRoute path="/addTodo" component={AddTodo} auth={true} />

                                <GuardRoute path="/" component={Home} auth={true} />
                            </Switch>
                        </div>
                    </Router>
                </ServiceContext>
            </TodoContext>
        </LoginContext >
    );
}

export default App;