import React from 'react';
import ReactDOM from 'react-dom';
import Map from 'google-maps-react';
import AutocompleteInput from './autocomplete.jsx';
import {GoogleApiWrapper, Marker} from 'google-maps-react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import PinCreator from './pincreator.jsx';
import Popover from 'material-ui/Popover';
import FloatingSearchButton from 'material-ui/FloatingActionButton';
import Sherlock from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PinSelection from './pindrawer.jsx';

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: true,
      searchIsOpen: false,
      pin: false,
      centerAroundCurrentLocation: true,
      currentPlace: {},
      markers: [],
      markerOn: false,
      // zoom: props.zoom,
      // currentCenter: props.currentCenter
      currentIcon: {}
    };
    this.styles = {
      refresh: {
        position: 'relative'
      },
      mapFlexBox: {
        postition: 'relative',
        display: 'flex',
        width: '95%',
        height: '25em',
        paddingTop: '5em',
        paddingRight: '2em'
      },
      searchButton: {
        position: 'fixed',
        bottom: '1em',
        right: '1em'
      }
    };
  }

  centerMoved(mapProps, map) {
    this.props.updateCenter(map.getCenter());
  }

  searchLocation(place, map) {
    if (!place.geometry) { return; }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    this.props.updateCenter(window.map.getCenter());
    this.props.updateZoom(window.map.getZoom());
  }

  handleClick(mapProps, map, clickEvent) {
    if (this.state.markerOn) {
      // this.props.addMarker(clickEvent.latLng);
      console.log("The lat long is:",clickEvent.latLng);
      // this.props.addMarker(clickEvent.latLng);
      var marker = {
        position: clickEvent.latLng,
        icon: this.state.currentIcon
      };
      this.props.addMarker(marker);
      // var markers = this.state.markers;
      // markers.push({
      //   position: clickEvent.latLng,
      //   icon: this.state.currentIcon
      // });
      this.setState({
        markerOn: false
      });
    }
  }

  mapReady(mapProps, map) {
    window.map = map;
    this.props.updateCenter(window.map.getCenter());
    map.setZoom(this.props.zoom);
    map.setCenter(this.props.currentCenter);
  }

  handleSearchTap(event) {
    event.preventDefault();
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
      searchAnchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      searchIsOpen: false,
    });
  }

  selectPin(pin) {
    this.setState({
      markerOn: !this.state.markerOn,
      currentIcon: pin
    });
  }

  render() {
    if (!this.props.loaded) {
      return (
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status='loading'
          style={this.styles.refresh}
        />
      );
    }
    return (
      <div>
        <AutocompleteInput
          google={this.props.google}
          searchPlace={this.searchLocation.bind(this)}
        />
        <Map google={this.props.google} style={this.styles.mapFlexBox}
          onClick={this.handleClick.bind(this)}
          center={this.props.currentCenter}
          onReady={this.mapReady.bind(this)}
          onDragend={this.centerMoved.bind(this)}
        >
          {this.props.markers.map((marker, index, markers) => {
            return (
              <Marker
                key={index}
                position={marker.position}
                icon={marker.icon}
              />
            );
          })}
        </Map>
        <PinSelection
          onPinClick={this.selectPin.bind(this)}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: window.GOOGLE_API_KEY
})(MapContainer);
