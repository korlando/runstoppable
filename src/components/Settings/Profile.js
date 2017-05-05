import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { editProfile, toggleModal } from '../../util'
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default withRouter(
  @connect(mapStateToProps)
  class ProfileSettings extends Component {
      constructor(props) {
        super(props);
        this.state = Object.assign(props.user, {
          name: props.user.name,
          photo: props.user.photo,
          shoes: props.user.shoes,
          heightFt: props.user.heightFt,
          heightIn: props.user.heightIn,
          weight: props.user.weight,
          saved: false,
          visible: false
        });

        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleSaveConfirm = this.handleSaveConfirm.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
      }

      handleEditProfile(event) {
        let changes = {};
        Object.keys(this.state).forEach( (key) => 
          {if (this.state[key] != this.props.user[key]) {
            changes[key] = this.state[key];
          }}
        )
        editProfile(changes);
      }

      handleSaveConfirm(event) {
        this.setState( {saved: true} );
        this.setState( {visible: true} );
        setTimeout(() => {
          this.setState( {visible: false} );
        }, 1000);
        setTimeout(() => {
          this.setState( {saved: false} );
        }, 1000);
      }

      handleDrop(file) {
        if(!file || !file[0]) {
          return;
        } 
        const reader = new FileReader();
        const image = file[0];

        reader.onloadend = () => {
          this.setState({
            photo: reader.result
          });
          handleEditProfile();
        }
        reader.readAsDataURL(image);
      };

    render() {
      let profileChangesMade = true;
      Object.keys(this.state).forEach( (key) => 
        {if (this.state[key] != this.props.user[key]) {
          profileChangesMade = false;
          }
        })

      const avatarStyle = {
        background: 'url(' + this.state.photo + ')',
        backgroundSize: 'cover'
      };

      return (
        <div>
          
          <div className="flexbox" style={{padding: '20px 0 0 20px', flexWrap:'wrap'}}>
            <div className="flex0" style={{padding: '0 50px 0 0'}}>
              
              <Dropzone
                style={{}}
                accept="image/*"
                onDrop={this.handleDrop}>
                <div id="box" style={avatarStyle}>
                  <div id="overlay" className="flexbox align-items-center justify-content-center"
                  onClick={console.log("change")}>
                    <span id="overlay-text" 
                    style={{fontSize: '20px',
                    color:'rgba(255,255,255,.85)'}}>
                    Change photo<br/>
                    <i className="material-icons md-48">add_a_photo</i>
                    </span>
                  </div>
                </div>
              </Dropzone>

            </div>
            <div className="col-sm-5" style={{padding: '0 20px 0 0'}}>
              <div className="input-group">
                <span className="input-group-addon">Name</span>
                <input type="text" className="form-control" 
                value={this.state.name}
                onChange={e => {this.setState( {name: e.target.value} )} }></input>
              </div>
              <br></br>
              <div className="input-group">
                <span className="input-group-addon">Height</span>
                <input type="number" className="form-control" 
                value= {this.state.heightFt}
                onChange={e => {this.setState( {heightFt: e.target.value} )} }></input>
                <span className="input-group-addon">ft</span>
                <input type="number" className="form-control" 
                value= {this.state.heightIn}
                onChange={e => { this.setState( {heightIn: e.target.value} )} }></input>
                <span className="input-group-addon">in</span>
              </div>
              <br></br>
              <div className="input-group">
                <span className="input-group-addon">Weight</span>
                <input type="number" className="form-control"
                value= {this.state.weight}
                onChange={e => {this.setState( {weight: e.target.value} )} }></input>
                <span className="input-group-addon">lb</span>
              </div>
              <br></br>

              <div className="flexbox footer align-items-center" style={{justifyContent: 'flex-end'}}>
                {this.state.saved &&
                  <p className={`text-success${this.state.visible ? ' fade-in' : ' fade-out'}`} 
                  style={{margin: '0 20px 0 0'}}>Saved!</p>
                }
                <button className="btn btn-success"
                disabled={profileChangesMade}
                onClick={() => {this.handleEditProfile(); this.handleSaveConfirm();}}>Save</button>
              </div>

            </div>
          </div>

          <div className="flexbox footer">
            <h2 style={{marginRight: '20px'}}>Shoes</h2>
            <button className="btn btn-default">Add Shoe</button>
          </div>

        </div>
      );
    };
  }
) 