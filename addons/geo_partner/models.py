from odoo import models,fields

class ResPartner(models.Model):
    _inherit = "res.partner"

    geo = fields.Char("Geolocalización")