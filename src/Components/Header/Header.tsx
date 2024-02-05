import React, { useState } from 'react';
import { Image, Segment, Header, Icon, Menu, MenuItem, Sidebar, Grid } from 'semantic-ui-react';

const HeaderWithSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <Segment>
        <Grid columns={3} stackable>
          <Grid.Column width={4}>
            <Image src="../../assets/images/logo.png" />
          </Grid.Column>

          <Grid.Column width={8} textAlign="center">
            <Header as="h2">Your Header Title</Header>
          </Grid.Column>

          <Grid.Column width={4} textAlign="right">
            <Image src="../../assets/images/Adrien.png" avatar />
            <span>Bonjour, Adrien Verwaerde</span>
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
          </Grid.Column>
        </Grid>
      </Segment>

      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setSidebarVisible(false)}
          vertical
          visible={sidebarVisible}
          width='thin'
          style={{
            height: '100%',
            top: 0,
            left: 0,
            position: 'fixed',
            transform: `translateY(${sidebarVisible ? '0%' : '-100%'})`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <MenuItem as='a'>
            <Icon name='home' />
            Home
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='gamepad' />
            Games
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='camera' />
            Channels
          </MenuItem>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarVisible}>
          <Segment basic>
            {/* Your main content goes here */}
            <Header as='h3'>Application Content</Header>
            <Image src='/images/wireframe/paragraph.png' />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default HeaderWithSidebar;
