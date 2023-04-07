import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreenPosts from './nestedScreens/DefaultScreenPosts';
import CommentsScreen from './nestedScreens/CommentsScreen';
import MapScreen from './nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerShown: true,
          headerTitle: 'Публикации',
          headerTitleStyle: { color: '#212121', fontSize: 17 },
          headerTitleAlign: 'center',
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: 'Комментарии',
          headerTitleStyle: { color: '#212121', fontSize: 17 },
          headerTitleAlign: 'center',
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
