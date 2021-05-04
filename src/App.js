import React, {useState} from 'react';
import Welcome from './Components/Welcome';
import Form from './Components/Form';
import TypeUsers from './Components/TypeUser';
import RedUser from './Components/TypeUser/RedUser';

import Terminos from './Components/Welcome/Terminos';
import Conocido from './Components/TypeUser/index';
import Redirection  from './Components/Redirect';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import SwitchWithSlide from "./SwitchWithSlide";
import Viables from './Components/TypeUser/Viables';
import UserGtypes from './Components/TypeUser/UserGtypes';

const Container = () =>  {
  const [animated, setAnimated] = useState(true);
  const SwitchComponent = animated ? SwitchWithSlide : Switch;

      return (
          <React.Fragment>
              <div className="contenApp">
                <SwitchComponent>
                  <Router>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/welcome" component={Welcome}/>
                    <Route exact path="/terminos" component={Terminos}/>
                    <Route exact path="/auth" component={Redirection}/>
                    <Route path="/complete-info" component={Form}/>
                    <Route path="/gratulations" component={Conocido}/>
                    <Route path="/user/red" component={RedUser}/>
                    <Route path="/viables" component={Viables}/>
                    <Route path="/user/gtypes/:type" component={UserGtypes}/>
                  </Router>
                  </SwitchComponent>
              </div>
          </React.Fragment>
      );
  }



const App = () => (
  <Router>
       <Container />
  </Router>
  );
export default App;
