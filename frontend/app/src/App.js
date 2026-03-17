import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './modules/Login';
import CambiarContraseña from './modules/CambiarContraseña';

import PresenterView from './modules/PresenterView';
import PresenterCreateSession from './modules/PresenterCreateSession';
import PresenterForest from './modules/PresenterForest';
import PresenterLobby from './modules/PresenterLobby';
import PresenterOcean from './modules/PresenterOcean';


import AudienceView from './modules/AudienceView';
import AudienceForest from './modules/AudienceForest';
import AudienceLobby from './modules/AudienceLobby';
import AudienceOcean from './modules/AudienceOcean';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* pantalla inicial */}
        <Route path="/" element={<Login />} />

        {/* cambiar contraseña */}
        <Route path="/cambiarcontraseña" element={<CambiarContraseña />} />
                
        {/* Login */}
        <Route path="/login" element={<Login />} />
        
        
        {/*---------------------------------------------------*/}
        {/*             PANTALLAS PRESENTADOR                 */}
        {/*---------------------------------------------------*/}

        {/* LOGIN PRESENTADOR */}
        <Route path="/presenterview" element={<PresenterView />} />

        {/* CREATE SESSION  */}
        <Route path="/createsession" element={<PresenterCreateSession />} />

        {/* LOBBY PRESENTER  */}
        <Route path="/presenterlobby" element={<PresenterLobby />} />

        {/* OCEAN PRESENTADOR   */}
        <Route path="/presenterocean" element={<PresenterOcean />} />

        {/* FOREST PRESENTER  */}
        <Route path="/presenterforest" element={<PresenterForest />} />

        {/*---------------------------------------------------*/}
        {/*             PANTALLAS ESPECTADOR                 */}
        {/*---------------------------------------------------*/}

        {/* LOGIN ESPECTADOR */}
        <Route path="/audienceview" element={<AudienceView />} />

        {/* LOBBY ESPECTADOR */}
        <Route path="/audiencelobby" element={<AudienceLobby />} />
      
        {/* OCEAN AUDIENCE    */}
        <Route path="/audienceocean" element={<AudienceOcean />} />

        {/* FOREST AUDIENCE  */}
        <Route path="/audienceforest" element={<AudienceForest />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;