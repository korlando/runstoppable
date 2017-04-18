import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';

class RunBoxInner extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { run, checkable } = this.props;

    // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    const coordinates = run.checkpoints.reduce((arr, c) => {
      return [...arr, {
        lat: c.lat,
        lng: c.lon
      }];
    }, []);
    // https://developers.google.com/maps/documentation/javascript/examples/control-disableUI
    const map = new google.maps.Map(this.map, {
      mapTypeId: 'terrain',
      disableDefaultUI: true,
      draggable: false, 
      zoomControl: false, 
      scrollwheel: false, 
      disableDoubleClickZoom: true,
      clickableIcons: false
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
      strokeWeight: 2,
      clickable: false
    });

    path.setMap(map);
  };

  render() {
    const { run, checkable } = this.props;

    return (
      <Link to={`/runs/${run.id}`} style={{textDecoration: "none"}}><span>
      <div className="run-box flexbox">
        <div className={`preview-map text-center${checkable ? ' small' : ''}`}
          ref={node => this.map = node}></div>
        <div className="flex1">
          <div className="flex0">
            <label className="location">{run.location}</label> </div>
          <div className="date">{run.start.format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
        
        {checkable &&
          <Checkbox/>
        }
      </div></span></Link>
    );
  };
};

export default (props) => {
  const { run, checkable } = props;
  
  if(checkable) {
    return <RunBoxInner {...props}/>;
  } else {
    return (
      <Link to={`/runs/${run.id}`}
        style={{textDecoration: 'none'}}>
        <RunBoxInner {...props}/>
      </Link>
    );
  }
};