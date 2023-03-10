import React from "react";

import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 42.148778,
          longitude: 19.0403046,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
          description="My location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
