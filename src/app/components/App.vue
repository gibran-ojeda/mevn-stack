<template>
    <div>
        <nav class="navbar navbar-loght bg-light">
            <a class="navbar-brand" href="/">MEVN Stack</a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="enviarTarea">
                                <div class="form-group">
                                    <input v-model="task.title" class="form-control" type="text" placeholder="Tìtulo de la tarea">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description" class="form-control" placeholder="Descripción" cols="30" rows="10"></textarea>
                                </div>
                                <div class="form-group">
                                    <template v-if="edit === false">
                                        <button class="btn btn-secondary form-control">Enviar</button>
                                    </template>
                                    <template v-else>
                                        <button class="btn btn-primary form-control">Actualizar</button>
                                    </template>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td><button class="btn btn-primary" @click="actualizarTarea(task._id)">Actualizar</button></td>
                                <td><button class="btn btn-danger" @click="eliminarTarea(task._id)">Eliminar tarea</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
class Task{
    constructor(title,description){
        this.title= title
        this.description= description
    }
}

export default{
    data(){
        return {
            task: new Task(),
            tasks:[],
            edit: false,
            taskToEdit: ''
        }
    },
    created(){
        this.obtenerTareas();
    },
    methods:{
        enviarTarea(){
            if (this.edit === false) {
                fetch('/tasks',{
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }})
                .then(res => res.json())
                .then(data => {
                    this.obtenerTareas();
                })
            }else{
                fetch('/tasks/'+this.taskToEdit,{
                    method: 'PUT',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }})
                .then(res => res.json())
                .then(data => {
                    this.edit = false;
                    this.obtenerTareas();
                })
            }
            this.task = new Task();
        },
        obtenerTareas(){
            fetch('/tasks').then(res => res.json())
            .then(data => {
                this.tasks = data
            })
        },
        actualizarTarea(id){
            this.edit = true;
            fetch('/tasks/'+id).then(res => res.json())
            .then(data => {
                this.task = new Task (data.title,data.description)
                this.taskToEdit = data._id
            })
        },
        eliminarTarea(id){
            fetch('/tasks/'+id,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                this.obtenerTareas()
            })
        }
    }
}
</script>