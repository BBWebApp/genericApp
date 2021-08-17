import axios from "axios";

var base = require("base-64");

var url1 = "http://localhost:8011/proxy/workflow/4/task/1/upload";
var url2 = "http://localhost:8011/proxy/workflow/5/task/1/upload";
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;
var xmlImagesDownloaded = undefined;

export function requestUpload(actions) {
  switch (actions.type) {
    case "UPLOAD_IMAGE":
      var reportId = actions["reportId"];
      var item = actions["image"];
      var favouriteClicked = actions["favourite"];
      axios
        .get(favouriteClicked ? url1 : url2, {
          headers: {
            Authorization: Basic,
          },
        })
        .then((response) => {
          xmlImagesDownloaded = JSON.parse(response.data);
          if (xmlImagesDownloaded.length > 5) {
            xmlImagesDownloaded = xmlImagesDownloaded.slice(0, 5);
          }
          xmlImagesDownloaded = xmlImagesDownloaded.filter(
            (item) => Object.keys(item)[0] !== reportId
          );
          var newElement = {};
          newElement[reportId] = item;
          xmlImagesDownloaded = [newElement].concat(xmlImagesDownloaded);
          axios.post(favouriteClicked ? url1 : url2, xmlImagesDownloaded, {
            headers: {
              Authorization: Basic,
            },
          });
        });
      break;
    case "REMOVE_IMAGE":
      var position = actions["position"];
      axios
        .get(url1, {
          headers: {
            Authorization: Basic,
          },
        })
        .then((response) => {
          xmlImagesDownloaded = JSON.parse(response.data);
          xmlImagesDownloaded.splice(position, 1);
          axios.post(url1, xmlImagesDownloaded, {
            headers: {
              Authorization: Basic,
            },
          });
        });
      break;
    default:
      break;
  }
}
