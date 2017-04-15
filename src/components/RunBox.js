import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RunBox extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { run } = this.props;

    // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    const coordinates = run.checkpoints.reduce((arr, c) => {
      return [...arr, {
        lat: c.lat,
        lng: c.lon
      }];
    }, []);
    const map = new google.maps.Map(this.map, {
      mapTypeId: 'terrain'
    });
    // http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers
    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach((coord) => {
      bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
    });

    map.fitBounds(bounds);

    const path = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    path.setMap(map);
  };

  render() {
    const { run } = this.props;
    return (
      <div className="run-box flexbox">
        <div className="preview-map text-center"
          ref={node => this.map = node}></div>
        <div className="flex1">
          <Link to={`/runs/${run.id}`} className="flex0">
            <label className="location">{run.location}</label>
          </Link>
          <div className="date">{run.start.format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
      </div>
    );
  };
};