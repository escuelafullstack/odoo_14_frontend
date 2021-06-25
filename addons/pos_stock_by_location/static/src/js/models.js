odoo.define('pos_stock_by_location.models',function(require){
    var models = require("point_of_sale.models");
    var PosModel = models.PosModel;
    _.find(PosModel.prototype.models,function(el){return el.model == "product.product"}).fields.push("qty_available")

    PosModel.prototype.models.push({
        model:"stock.quant",
        fields:["id","product_id","available_quantity","location_id","location_id"],
        domain:function(self){
            if(self.config.location_id != undefined){
                return [["location_id","=",self.config.location_id[0]]]
            }else{
                return [["location_id","=",false]]
            }
        },
        loaded: function(self,quants){
            self.quants = quants
            self.stock_by_product = {}
            _.each(quants,function(el){
                if(self.stock_by_product[el.product_id[0]] == undefined){
                    self.stock_by_product[el.product_id[0]] = [el]
                }else{
                    self.stock_by_product[el.product_id[0]].push(el)
                }
            })
        }
    })
})