import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar'
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import history from '../history';


class App extends React.Component {
    render() {
        return (
            <Router history={history}>   
                <div className="ui container" style={{ marginTop: '20px' }}>
                    <NavBar />
                    <Switch>
                        <Route path='/' exact component={StreamList} />
                        <Route path='/streams/create' exact component={StreamCreate} />
                        <Route path='/streams/delete/:id' exact component={StreamDelete} />
                        <Route path='/streams/edit/:id' exact component={StreamEdit} />
                        <Route path='/streams/:id' exact component={StreamShow} />
                    </Switch>
                </div>
            </Router>        
        );
    }
}


export default App;