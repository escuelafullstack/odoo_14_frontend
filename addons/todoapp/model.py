from odoo import models,fields,api


class Tasks(models.Model):
    _name = "ta.task"
    _description = "Tareas"

    name = fields.Char("Descripción")
    sequence = fields.Char("Secuencia")
