odoo.define("snippet_exchange.widget",function(require){
  
    var publicWidget = require("web.public.widget")

    publicWidget.registry.WidgetExchange = publicWidget.Widget.extend({
        selector:".s_exchange",
        disabledInEditableMode:false,
        events:{
            "change select[name='currency']":"change_currency",
            "change input[name='amount']":"change_amount"
        },
        start:function(){
            var self = this;
            this.currencies = {}
            this._fetch().then(function(list){
                // self.currencies = list
                var content_currency = self.$el.find("select[name='currency']")
                _.each(list,function(el){
                    self.currencies[el.code] = el
                    content_currency.append("<option value='"+el.code+"'>"+el.name+"</option>")
                })
            })
        },
        _fetch:function(){
            return new Promise(function(resolve,reject){
                var settings = { 
                    "url": "https://api.alegra.com/api/v1/currencies", 
                    "method": "GET", 
                    "timeout": 0, 
                    "headers": 
                        { "Authorization": "Basic *************" }, 
                    };
            
                $.ajax(settings).done(function (response) { 
                    resolve(response)
                });
            })
        },
        change_currency:function(ev){
            var currency_current = $(ev.currentTarget).val()
            var amount = this.$el.find("input[name='amount']").val()
            this.compute(currency_current,amount)
        },
        change_amount:function(ev){
            var amount = $(ev.currentTarget).val()
            var currency_current = this.$el.find("select[name='currency']").val()
            this.compute(currency_current,amount)
        },
        compute:function(currency,amount){
            var self = this;
            console.log(self.currencies)
            console.log(currency);
            console.log(amount);
            
            var exchangeRate = self.currencies[currency].exchangeRate
            this.$el.find("#result").text(exchangeRate*amount)
        }
    })
})