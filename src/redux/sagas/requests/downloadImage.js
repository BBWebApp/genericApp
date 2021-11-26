import axios from "axios";
import * as myConstClass from "../../../global";

var base = require("base-64");

var dispatch_types_urls = {
  GET_DOWNLOADIMAGES: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/downloadImage`,
};

export function requestGetUser(action) {
  var favouriteClicked = action["favourites"];
  var dispatch_type = action["type"];

  switch (dispatch_type) {
    case "GET_DOWNLOADIMAGES":
      return axios.post(dispatch_types_urls["GET_DOWNLOADIMAGES"], {
        favouriteClicked: favouriteClicked,
      });
    default:
      break;
  }
}
