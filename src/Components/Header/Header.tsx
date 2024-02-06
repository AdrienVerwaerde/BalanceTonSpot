import React, { useState } from "react";
import {
  Segment,
  Icon,
  Menu,
  MenuItem,
  Sidebar,
  Grid,
} from "semantic-ui-react";
import "./Header.css";

const HeaderWithSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <header>
      <Segment id="header-banner">
            <img
              id="logo"
              src="https://i.goopics.net/6p1uuc.png"
              alt="Balance Ton Spot"
            ></img>
            
          <Grid.Column>
            <button id="sidebar-button" onClick={toggleSidebar}>V</button>
          </Grid.Column>
      </Segment>

      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setSidebarVisible(false)}
          vertical
          visible={sidebarVisible}
          width="thin"
          style={{
            height: "200%",
            top: 0,
            left: 0,
            position: "fixed",
            transform: `translateY(${sidebarVisible ? "0%" : "-100%"})`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <MenuItem as="a">
            <Icon name="home" />
            Home
          </MenuItem>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarVisible}>
          <Segment basic></Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </header>
  );
};

export default HeaderWithSidebar;
