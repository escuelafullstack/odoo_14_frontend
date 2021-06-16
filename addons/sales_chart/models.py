from odoo  import models,api

class SalesOrder(models.Model):
    _inherit = "sale.order"

    @api.model
    def group_by_state(self):
        self.env.cr.execute("""SELECT state,sum(amount_total) 
                                    FROM sale_order group by state""")
        res = self.env.cr.dictfetchall()
        return res