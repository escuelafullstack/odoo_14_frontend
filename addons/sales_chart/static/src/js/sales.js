odoo.define("sales_chart.chart",function(require){
    var AbstractAction = require("web.AbstractAction")
    var core = require("web.core")

    

    var states = {
        "sent":"Cotización Enviada",
        "draft":"Borrador",
        "sale":"Órdenes de Venta"
    }

    /*
        [
            {"state":"draft","sum":903},
            {"state":"sale","sum":155},
            {"state":"sent","sum":125},
        ]
    */
    var SalesChart = AbstractAction.extend({
        template:"tmpl_sales_chart",
        events:{
            "change .sale_state":"change_sale_state"
        },
        start:function(){
            var self = this;
            self.sale_chart = undefined;
            self._super()
            core.bus.on("DOM_updated",this,function(){
                self.fetch_group_by_state().then(function(lines){
                    self.lines = lines
                    self.renderChart(lines)
                })
                    
            })
        },
        fetch_group_by_state:function(){
            return this._rpc({
                model:"sale.order",
                method:"group_by_state",
                args:[],
                kwargs:{}
            })
        },
        renderChart:function(lines){
            var ctx = document.getElementById('myChart').getContext('2d');
            if(self.sale_chart){
                self.sale_chart.destroy();
            }
            self.sale_chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: _.map(lines,function(el){return states[el.state]}),
                    datasets: [{
                        label: 'Ventas por Estado',
                        data: _.map(lines,function(el){return el.sum}),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgb(255, 205, 86)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgb(255, 205, 86)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        change_sale_state:function(ev){
            console.log($(ev.currentTarget).data("name"))
            console.log($(ev.currentTarget).is(":checked"))

            var states_perm = _.filter($(".sale_state"),function(el){return $(el).is(":checked")})
            states_perm = _.map(states_perm,function(el){return $(el).data("name")})
            console.log(states_perm)
            var lines = _.clone(this.lines)

            lines = _.filter(lines,function(el){return states_perm.indexOf(el.state)>=0 })
            console.log(lines)
            this.renderChart(lines)
        }
    })

    core.action_registry.add("sales_chart",SalesChart)
})