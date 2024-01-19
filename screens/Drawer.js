import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from './HomeScreen'
import uploads from './uploads'
import Profile from './Profile'
import MapScreen from './MapScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      <Drawer.Screen name="uploads" component={uploads} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator