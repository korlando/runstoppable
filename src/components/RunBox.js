import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RunBox extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { run } = this.props;
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
        <Link to={`/runs/${run.id}`} className="flex0">
          
        </Link>
        <div className="flex1">
          <label>{run.location}</label>
          <div>{run.start.format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
      </div>
    );
  };
};