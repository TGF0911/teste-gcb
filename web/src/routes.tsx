import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateDoctors from './pages/CreateDoctors'
import FindDoctors from './pages/FindDoctors';
import UpdateDoctor from './pages/UpdateDoctor';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create-doctors" component={CreateDoctors} />
        <Route path="/upadte-doctors" component={UpdateDoctor} />
        <Route path="/doctors" component={FindDoctors} />
      </Switch>
    </BrowserRouter>
  )
}