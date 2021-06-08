odoo.define('todoapp.todo_widget',function(require){
    var AbstractAction = require("web.AbstractAction")
    var core = require("web.core")

    /*
        create
        write
        unlink
        search_read
    */

    var TodoAction = AbstractAction.extend({
        template:"todo_template",
        events:{
            "click .btn_add_task":"add_task"
        },
        start:function(){
            this._super()
            this.fetchTasks()
        },
        renderTemplate:function(){

        },
        fetchTasks:function(){
            var list_tasks = $(this.$el).find(".list_tasks")
            this._rpc({
                model:"ta.task",
                method:"search_read",
                args:[],
                kwargs:{}
            }).then(function(tasks){
                _.each(tasks,function(task){
                    list_tasks.append("<li>"+task.name +"</li>")        
                })
            })
        },
        add_task:function(ev){
            var self = this;
            var new_task = $(this.$el).find("input[name='task']").val()
            if(new_task != ""){
                this._rpc({
                    model:"ta.task",
                    method:"create",
                    args:[{"name":new_task}],
                    kwargs:{}
                }).then(function(res){
                    if(res){
                        var list_tasks = $(self.$el).find(".list_tasks")
                        list_tasks.append("<li>"+new_task +"</li>")
                        console.log(new_task)
                    }
                })
                
            }else{
                alert("Esta intentando agregar una tarea vacía")
            }
        }
    }) 
    console.log(TodoAction)
    

    core.action_registry.add("todo_widget",TodoAction)
    return TodoAction
})