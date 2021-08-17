import axios from "axios";
import * as myConstClass from "../../../global";

var base = require("base-64");

var url1 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var url2 = "http://localhost:8011/proxy/workflow/5/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

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
