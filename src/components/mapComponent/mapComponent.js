import React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// import StandaloneSearchBox  from "react-google-maps/lib/components/places/StandaloneSearchBox";
import PropTypes from "prop-types";

import { compose, withProps, withStateHandlers } from "recompose";
import { googleMapKey } from "../../constants/config";
import { colors, sizes } from "../../constants/constants";
const MyMapComponent = compose(
  withProps(props => ({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      googleMapKey +
      "&&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: props.height }} />,
    mapElement: <div style={{ height: `100%` }} />
  })),

  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 24.8607, lng: 67.0011 }}
    zoom={10}
    tilt={5}
  >
    {props.markersArray.map((val, ind) => {
      if (val[0].long !== 0 && val[0].lat !== 0) {
        return (
          <Marker
            key={val[0].localId}
            position={{ lat: val[0].lat, lng: val[0].long }}
            onClick={props.onToggleOpen}
            options={{
              icon: {
                url:
                  "https://elasticbeanstalk-us-east-1-435177095658.s3.amazonaws.com/9bd90220-754e-11e9-a78a-83bba6d9dbfd",
                scaledSize: { height: 50, width: 50 },
                size: { height: 50, width: 50 }
              }
            }}
          >
            {props.isOpen ? (
              <InfoWindow key={ind} onCloseClick={props.onToggleOpen}>
                <span
                  style={{
                    color: colors.primaryColor,
                    fontSize: sizes.h2,
                    fontWeight: 400
                  }}
                >
                  {val[0].name}
                </span>
              </InfoWindow>
            ) : (
              <div />
            )}
          </Marker>
        );
      }
    })}
  </GoogleMap>
));

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { height, markersArray } = this.props;
    return (
      <MyMapComponent
        isMarkerShown={true}
        height={height}
        markersArray={markersArray}
        onToggleOpen={() => this.onToggleOpen()}
        isOpen={this.state.isOpen}
      />
    );
  }
}
export default MapComponent;
MapComponent.propTypes = {
  markersArray: PropTypes.array,
  height: PropTypes.string
};
MapComponent.defaultProps = {
  height: "230px"
};
