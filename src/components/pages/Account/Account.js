import React from 'react'
import {connect} from "react-redux";

import Styles from "./Account.module.css";
import * as action from '../../Store/actions/index';

const Account = (props) => {
  return(
    <div>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(action.logout())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account)