import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateDoctors from './pages/CreateDoctors'
import FindDoctors from './pages/FindDoctors';
import Pagina from './pages/Pagina';
import UpdateDoctor from './pages/UpdateDoctor';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateDoctors} />
        <Route path="/update-doctors/:id" component={UpdateDoctor} />
        <Route path="/doctors" component={FindDoctors} />
        <Route path="/page" component={Pagina} />
      </Switch>
    </BrowserRouter>
  )
}