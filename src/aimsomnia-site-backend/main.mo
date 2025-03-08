import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Http "mo:base/Http";
import Text "mo:base/Text";

actor {
  public query func http_request(request : Http.Request) : async Http.Response {
    let path = request.url;
    let file = switch (path) {
      case "/" "index.html";
      case _ path;
    };
    
    let asset = switch (file) {
      case "index.html" include "index.html";
      case "global.css" include "global.css";
      case "build/bundle.js" include "build/bundle.js";
      case _ "";
    };
    
    return {
      status_code = if (asset != "") 200 else 404;
      headers = [("Content-Type", get_content_type(file))];
      body = Text.encodeUtf8(asset);
      streaming_strategy = null;
    };
  };

  func get_content_type(file : Text) : Text {
    if (Text.endsWith(file, #text ".html")) "text/html"
    else if (Text.endsWith(file, #text ".css")) "text/css"
    else if (Text.endsWith(file, #text ".js")) "application/javascript"
    else if (Text.endsWith(file, #text ".svg")) "image/svg+xml"
    else if (Text.endsWith(file, #text ".ico")) "image/x-icon"
    else "text/plain"
  };
};
