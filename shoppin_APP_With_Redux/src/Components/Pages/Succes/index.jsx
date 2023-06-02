import React from 'react'
import { NavLink } from 'react-router-dom'
import MainLayOutes from '../../../layoute/MainLayOutes'

export default function Succes() {
  return (
      <MainLayOutes>
          <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <span class="icon-check_circle display-3 text-success"></span>
            <h2 class="display-3 text-black">Thank you!</h2>
            <p class="lead mb-5">You order was successfuly completed.</p>
            <p><NavLink to="/shop" class="btn btn-sm btn-primary">Back to shop</NavLink></p>
          </div>
        </div>
      </div>
    </div>
   </MainLayOutes>
  )
}
