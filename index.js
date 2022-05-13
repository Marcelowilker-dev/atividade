const inputDescription = document.getElementById('tarefa');
const btn = document.getElementById('btn');
const list = document.getElementById('list');
const listFinished = document.getElementById('listFinished');

let div;
let btnDelete;
let btnUpdate;
let btnFinish;
let li;

const Add = async () => {
    const myNewObject = new Parse.Object('ListaTarefas');
    myNewObject.set('descricao', inputDescription.value);
    myNewObject.set('concluido', false);
    try {
        const result = await myNewObject.save();
        location.reload();
    } catch (error) {
        alert('preencha os campos de Descrição!')
        console.error('Error while creating ListaTarefas: ', error);
    }
}

const ShowList = async () => {
    const ListaTarefas = Parse.Object.extend('ListaTarefas');
    const query = new Parse.Query(ListaTarefas);

    try {
        const results = await query.find();
        for (const object of results) {
            const id = object.id
            const descricao = object.get('descricao')
            const concluido = object.get('concluido')

            li = document.createElement('li');
            btnFinish = document.createElement('button')
            btnFinish.innerText = 'Concluído'
            li.innerHTML = `${descricao}`;
            btnDelete = document.createElement('button')
            btnUpdate = document.createElement('button')
            btnUpdate.innerText = 'editar'
            btnDelete.innerText = 'excluir'
            if(concluido){
                listFinished.appendChild(li);
            }else{
                list.appendChild(li);
                list.appendChild(btnFinish);
                list.appendChild(btnDelete);
                list.appendChild(btnUpdate);
            }

            btnDelete.onclick = async function Deletetarefa() {
                const query = new Parse.Query('ListaTarefas');
                try {

                    const object = await query.get(id);
                    try {
                        const response = await object.destroy();
                        alert('tarefa deletado com sucesso!')
                        location.reload();
                    } catch (error) {
                        console.error('Erro ao excluir ParseObject', error);
                    }
                } catch (error) {
                    console.error('Erro ao recuperar ParseObject', error);
                }
            }

            btnUpdate.onclick = async function Updatetarefa() {
                const query = new Parse.Query(ListaTarefas);
                try {
                    let newDescription = window.prompt('Digite a nova descrição!')

                    const object = await query.get(id);
                    object.set('descricao', newDescription);
                    try {
                        const response = await object.save();
                        alert('Descrição editada!')
                        location.reload();
                    } catch (error) {
                        console.error('Erro ao atualizar ListaTarefas)', error);
                    }
                } catch (error) {
                    console.error('Erro ao recuperar o objeto ListaTarefas', error);
                }
            }

            btnFinish.onclick = async function finish() {
                const query = new Parse.Query(ListaTarefas);
                try {
                    const object = await query.get(id);
                    object.set('concluido', true);
                    try {
                        if(concluido == false){
                            const response = await object.save();
                            location.reload();
                        }
                    } catch (error) {
                        console.error('Erro ao atualizar ListaTarefas',error);
                    }
                } catch (error) {
                    console.error('Erro ao recuperar o objeto ListaTarefas', error);
                }
            }

        }
    } catch (error) {
        console.error('Error while fetching ListaTarefas', error);
    }
}

btn.onclick = Add;
ShowList();