import React from 'react';
import myGif from '../images/dunk.gif';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';


function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div className="fixed-top border mb-3" style={{ backgroundColor: `theme=='light'?whitesmoke:`}}>
      <nav className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={myGif} alt="crying Jordon" width={40} height={40} className="ms-5" loading="lazy" />
          <large style={{ fontSize: '20px', marginLeft: '4px', fontWeight: 'bold' }}>BasketBallWiki</large>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <Link className="nav-link me-4" style={{ fontWeight: 'bold' }} to='/'>Home</Link>
          <Link className="nav-link me-4" style={{ fontWeight: 'bold' }} to='/news'>News</Link>
          {user && (
            <>
              <span className="pe-4">
                Signed in as {user.displayName}
              </span>
              <button className="btn btn-primary btn-sm" onClick={() => { signOut(auth) }}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
