var ResponsiveBootstrapToolkit=function($){var internal={detectionDivs:{bootstrap:{xs:$('<div class="device-xs visible-xs visible-xs-block"></div>'),sm:$('<div class="device-sm visible-sm visible-sm-block"></div>'),md:$('<div class="device-md visible-md visible-md-block"></div>'),lg:$('<div class="device-lg visible-lg visible-lg-block"></div>')},foundation:{small:$('<div class="device-xs show-for-small-only"></div>'),medium:$('<div class="device-sm show-for-medium-only"></div>'),large:$('<div class="device-md show-for-large-only"></div>'),xlarge:$('<div class="device-lg show-for-xlarge-only"></div>')}},applyDetectionDivs:function(){$(document).ready(function(){$.each(self.breakpoints,function(alias){self.breakpoints[alias].appendTo(".responsive-bootstrap-toolkit")})})},isAnExpression:function(str){return str.charAt(0)=="<"||str.charAt(0)==">"},splitExpression:function(str){var operator=str.charAt(0);var orEqual=str.charAt(1)=="="?true:false;var index=1+(orEqual?1:0);var breakpointName=str.slice(index);return{operator:operator,orEqual:orEqual,breakpointName:breakpointName}},isAnyActive:function(breakpoints){var found=false;$.each(breakpoints,function(index,alias){if(self.breakpoints[alias].is(":visible")){found=true;return false}});return found},isMatchingExpression:function(str){var expression=internal.splitExpression(str);var breakpointList=Object.keys(self.breakpoints);var pos=breakpointList.indexOf(expression.breakpointName);if(pos!==-1){var start=0;var end=0;if(expression.operator=="<"){start=0;end=expression.orEqual?++pos:pos}if(expression.operator==">"){start=expression.orEqual?pos:++pos;end=undefined}var acceptedBreakpoints=breakpointList.slice(start,end);return internal.isAnyActive(acceptedBreakpoints)}}};var self={interval:100,framework:null,breakpoints:null,is:function(str){if(internal.isAnExpression(str)){return internal.isMatchingExpression(str)}return self.breakpoints[str]&&self.breakpoints[str].is(":visible")},use:function(frameworkName,breakpoints){self.framework=frameworkName.toLowerCase();if(Object.keys(internal.detectionDivs).indexOf(self.framework)!==-1){self.breakpoints=internal.detectionDivs[self.framework]}else{self.breakpoints=breakpoints}internal.applyDetectionDivs()},current:function(){var name="unrecognized";$.each(self.breakpoints,function(alias){if(self.is(alias)){name=alias}});return name},changed:function(fn,ms){var timer;return function(){clearTimeout(timer);timer=setTimeout(function(){fn()},ms||self.interval)}},breakpointChanged:function(fn,ms){var resizeFn,timer,lastBreakpoint=self.current();if(resizeFn){$(window).off("resize orientationchange",resizeFn)}resizeFn=function(){clearTimeout(timer);timer=setTimeout(function(){var newBreakpoint=self.current();if(newBreakpoint!==lastBreakpoint){fn(newBreakpoint,lastBreakpoint);lastBreakpoint=newBreakpoint}},ms||self.interval)};$(window).on("resize orientationchange",resizeFn)}};$(document).ready(function(){$('<div class="responsive-bootstrap-toolkit"></div>').appendTo("body")});if(self.framework===null){self.use("bootstrap")}return self}(jQuery);if(typeof module!=="undefined"&&module.exports){module.exports=ResponsiveBootstrapToolkit}
var BootstrapModalAlerts=function($){this.ops={title:"Alert"};this.$modal=$('<div class="modal fade" id="bsModalAlert" tabindex="-1" role="dialog" aria-labelledby="bsModalAlertLabel" aria-hidden="true">'+'  <div class="modal-dialog" role="document">'+'    <div class="modal-content">'+'      <div class="modal-header">'+'        <h5 class="modal-title" id="bsModalAlertLabel"></h5>'+'        <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+'          <span aria-hidden="true">&times;</span>'+"        </button>"+"      </div>"+'      <div class="modal-body">'+"      </div>"+'      <div class="modal-footer">'+'        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-fn_value="0">Cancel</button>'+'        <button type="button" class="btn btn-primary alert-confirm" data-dismiss="modal" data-fn_value="1">OK</button>'+"     </div>"+"    </div>"+"  </div>"+"</div>");this.alert=function(message,ops,fn){return this.confirm(message,ops,fn,true)};this.confirm=function(message,ops,fn,okOnly){var _self=this,localOps=$.extend({},this.ops,ops),$localModal=this.$modal.clone();$(".modal-body",$localModal).html(message);$(".modal-title",$localModal).html(localOps.title);if(okOnly){$(".btn-secondary",$localModal).remove()}$localModal.appendTo("body");if("function"==typeof fn){$(".btn",$localModal).on("click",function(e){fn.call(this,e,$(this).attr("data-fn_value")/1,_self)})}$localModal.modal("show");return true};return this}(jQuery);
var GoogleMap=function($,viewport,alert,confirm){var bootstrap4Divs={xs:$('<div class="device-xs d-block hidden-sm-up"></div>'),sm:$('<div class="device-sm d-block hidden-xs-down hidden-md-up"></div>'),md:$('<div class="device-md d-block hidden-sm-down hidden-lg-up"></div>'),lg:$('<div class="device-lg d-block hidden-md-down hidden-xl-up"></div>'),xl:$('<div class="device-xl d-block hidden-lg-down"></div>')};viewport.use("bootstrap4",bootstrap4Divs);var map,newJSON={type:"FeatureCollection",features:[]},feature={type:"Feature",properties:{name:null},geometry:{}},colors=["#1866b8","#0a76e5","#31a9ff","#b2d6fa"],geoJSON,center={lat:51.482,lng:-.09},searchMarker=null,selectedFeature=null,public={initialised:false,init:function(){map=new google.maps.Map(document.getElementById("map"),{zoom:10,center:center,styles:[{featureType:"all",stylers:[{color:"#eceeef",visibility:"off"}]}],mapTypeId:"roadmap",zoomControl:false,clickableIcons:false,disableDefaultUI:true,draggable:false,gestureHandling:"none",keyboardShortcuts:false,scrollwheel:false});google.maps.Polygon.prototype.poly_getBounds=function(){var bounds=new google.maps.LatLngBounds;this.getPath().forEach(function(element,index){bounds.extend(element)});return bounds};map.data.loadGeoJson("/bundles/app/maps/GeoJson.json",{},function(features){map.data.setStyle({fillColor:colors[1],fillOpacity:1,strokeWeight:1,strokeColor:"#FFFFFF",strokeOpacity:1,draggable:false,clickable:false});$.each(features,function(index){var colIndex=index%colors.length;var initStrkIndex=colIndex===1?index+1:index+3;var strkIndex=initStrkIndex%colors.length;var featureStyle={fillColor:colors[colIndex],strokeColor:colors[strkIndex],strokeWeight:1,zIndex:1};map.data.overrideStyle(this,featureStyle);this.setProperty("originalColors",featureStyle)});public.initialised=true});$("#confirmPostcode").on("click",function(e){e.preventDefault();var postcode=$("#postcodeInput").val();var geocoder=new google.maps.Geocoder;geocoder.geocode({address:postcode,region:"GB",bounds:map.getBounds()},function(results,status){if(status==google.maps.GeocoderStatus.OK){var resultLatLng=new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());if(selectedFeature){map.data.overrideStyle(selectedFeature,selectedFeature.getProperty("originalColors"));selectedFeature=null}if(searchMarker){searchMarker.setMap(null)}map.data.forEach(function(feature){var geometry=feature.getGeometry(),latLngArray=geometry.getArray()[0].getArray();var tempPolygon=new google.maps.Polygon({paths:latLngArray});if(google.maps.geometry.poly.containsLocation(resultLatLng,tempPolygon)){selectedFeature=feature;map.data.overrideStyle(selectedFeature,{fillColor:"#15ce75",strokeColor:"#FFFFFF",strokeWeight:4,zIndex:2});return false}});$("#boroughCard").show().removeClass("card-outline-warning card-outline-success");if(!selectedFeature){$("#selectedBorough").html("Postcode Not Found Within London Boroughs");$("#boroughCard").addClass("card-outline-warning");$("#liveIn").hide()}else{searchMarker=new google.maps.Marker({position:resultLatLng,map:map,animation:google.maps.Animation.DROP});$("#selectedBorough").html(selectedFeature.getProperty("name"));$("#boroughCard").addClass("card-outline-success");$("#liveIn").show()}}else{alert("Sorry, there was an error looking up that postcode. Please check it and try again.")}})});$(function(){var $map=$("#map"),updateMap=function(breakpoint){switch(breakpoint){case"xl":$map.css({height:"500px",width:"630px"});google.maps.event.trigger(map,"resize");map.setZoom(10);break;default:$map.css({height:"280px",width:"312px"});google.maps.event.trigger(map,"resize");map.setZoom(9);break}map.setCenter(center)};viewport.breakpointChanged(updateMap);updateMap(viewport.current())})}};return public}(jQuery,ResponsiveBootstrapToolkit,BootstrapModalAlerts.alert,BootstrapModalAlerts.confirm);