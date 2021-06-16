odoo.define("widget_marker_map.marker",function(require){

    // Documentación Google Maps API
    // https://developers.google.com/maps/documentation/javascript/overview

    var AbstractField = require("web.AbstractField")
    var field_registry = require("web.field_registry")

    var FieldMarkerMap = AbstractField.extend({
        template:"widget_marker_map_tmpl",
        supportedFieldTypes:["char"],
        events:{
            "click .marker_map":"geolocalizame"
        },  
        init:function(parent, name, record, options){
            this._super(parent, name, record, options)
            var ubicacion = this.value
            if(ubicacion){
                if(ubicacion.split("|").length == 2){
                    this.zoom = 15;
                    this.lng = parseFloat(ubicacion.split("|")[0])
                    this.lat = parseFloat(ubicacion.split("|")[1])
                    return;
                }
            }
            this.zoom = 15;
            this.lat = -11.978485;
            this.lng = -77.0009887;
        },
        geolocalizame:function(ev){
            var self = this;
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(function(position){
                    self.lng = position.coords.longitude
                    self.lat = position.coords.latitude
                    self.zoom = 20
                    let ubicacion = String(self.lng)+"|"+String(self.lat)
                    self._setValue(ubicacion)
                })
            }
        },
        _renderReadonly:function(){
            var self = this
            
            var map = $(self.$el).find(".map")[0]
            this.map = new google.maps.Map(map,{zoom:self.zoom,center:{lat:self.lat,lng:self.lng}})
            self.marker = new google.maps.Marker({
                map:self.map,
                position:{lat:self.lat,lng:self.lng}
            })
        },
        _renderEdit:function(){
            var self = this
            var map = $(self.$el).find(".map")[0]
            this.map = new google.maps.Map(map,{zoom:self.zoom,center:{lat:self.lat,lng:self.lng}})

            self.marker = new google.maps.Marker({
                map:self.map,
                draggable:true,
                position:{lat:self.lat,lng:self.lng},
                animation: google.maps.Animation.DROP
            })

            self.map.addListener("dblclick",function(ev){
                self.lng = ev.latLng.lng()
                self.lat = ev.latLng.lat()
                self.marker.setPosition({lat:self.lng,lat:self.lat})
                let ubicacion = String(self.lng)+"|"+String(self.lat)
                self._setValue(ubicacion)
            })
            self.marker.addListener("dragend",function(ev){
                let position = self.marker.getPosition()
                self.lat = position.lat()
                self.lng = position.lng()
                let ubicacion = String(self.lng)+"|"+String(self.lat)
                self._setValue(ubicacion)
            })
        }
    })

    field_registry.add("field_marker_map",FieldMarkerMap)

})