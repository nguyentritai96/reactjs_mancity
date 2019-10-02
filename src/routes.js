import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Layout from './Hoc/Layout';
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';

import SignIn from './Components/signin/';
import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/AddEditMatch';
import AdminPlayers from './Components/admin/players';
import AddEditPlayers from './Components/admin/players/addEditPlayers';

import NotFound from './Components/ui/not_found';

// có 2 trường hợp cần duyệt route:
// 1 là không phải user, vào trang admin => redirect ra login
// 2 là user, vào trang login => trang admin => dùng restricted

// có 2 trường hợp route:
// 1 là public route for non-user, user
// 2 là private route for user

class routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <PrivateRoute {...this.props} exact path="/admin_players" component={AdminPlayers} />
          <PrivateRoute {...this.props} exact path="/admin_players/add_player" component={AddEditPlayers} />
          <PrivateRoute {...this.props} exact path="/admin_players/add_player/:id" component={AddEditPlayers} />
        
          <PrivateRoute {...this.props} exact path="/admin_matches" component={AdminMatches} />
          <PrivateRoute {...this.props} exact path="/admin_matches/edit_match" component={AddEditMatch} />
          <PrivateRoute {...this.props} exact path="/admin_matches/edit_match/:id" component={AddEditMatch} />
          
          <PrivateRoute {...this.props} exact path="/dashboard" component={Dashboard} />
          
          <PublicRoute {...this.props} restricted={true} exact path='/sign_in' component={SignIn} />
          <PublicRoute {...this.props} restricted={false} exact path="/the_team" component={TheTeam} />
          <PublicRoute {...this.props} restricted={false} exact path="/the_matches" component={TheMatches} />
          <PublicRoute {...this.props} restricted={false} exact path='/' component={Home} />
          <PublicRoute {...this.props} restricted={false} component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default routes;