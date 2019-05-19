import React from 'react';
import './Sidebar.css';

let Sidebar = (props) => {
  return (
    <div>
      <section className="top_location_private">
        <div className="private_board">
          <div>Private Board</div>
          <ul>
          </ul>
        </div>
      </section>
      <section className="top_location_team">
        <div className="team_board">
          <div>Team Board</div>
          <ul>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Sidebar;
