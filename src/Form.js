import React from "react";
const Form = props => (

      <form class ="form-horizontal" onSubmit = {props.getWeather}>
        
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Enter City name:</label>
          <div class="col-sm-5">          
            <input type="text" class="form-control" id="city" placeholder="Enter City name" name="city"/>
          </div>
        </div>
        <div class="form-group">
        <label class="control-label col-sm-2" for="pwd">Enter Country code:</label>
          <div class="col-sm-5">          
            <input type="text" class="form-control" id="country" placeholder="Enter Country name" name="country"/>
          </div>

        </div>
        <div class="form-group">        
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
);
export default Form;
