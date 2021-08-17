import axios from "axios";
import * as myConstClass from "../../../global";
var dispatch_types_urls = {
  GET_SLICEDIMAGE: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/sliceImage`,
};

export function requestCropImage(action) {
  var dispatch_type = action["type"];

  switch (dispatch_type) {
    case "GET_SLICEDIMAGE":
      var image = action["image"];
      var reportElement = action["reportElement"];
      return axios.post(dispatch_types_urls["GET_SLICEDIMAGE"], {
        image: image,
        reportElement: reportElement,
      });
    default:
      break;
  }
}
