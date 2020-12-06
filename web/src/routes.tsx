import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateDoctors from './pages/CreateDoctors'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create-doctors" component={CreateDoctors} />
      </Switch>
    </BrowserRouter>
  )
}