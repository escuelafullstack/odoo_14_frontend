from odoo import models,fields

class PosConfig(models.Model):
    _inherit = "pos.config"

    show_stock_by_location = fields.Boolean("Mostrar stock por ubicación")
    location_id = fields.Many2one("stock.location","Ubicación",domain=[("usage","=","internal")])