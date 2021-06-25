odoo.define("pos_stock_by_location.screens",function(require){
    const PosComponent = require("point_of_sale.PosComponent")
    const ProductItem = require("point_of_sale.ProductItem")
    const Registries = require("point_of_sale.Registries")

    const CustomProductPrice = ProductItem =>
        class extends ProductItem{
            constructor(){
                super(...arguments)
                console.log(this)
            }
            spaceClickProduct(event) {
                console.log(event)
                super.spaceClickProduct(event)
            }
            get stock_by_location(){
                // console.log(this)
                var product_id = this.props.product.id
                var quants = this.env.pos.stock_by_product[product_id]
                return quants
            }
        }

    Registries.Component.extend(ProductItem,CustomProductPrice)
    return CustomProductPrice
})