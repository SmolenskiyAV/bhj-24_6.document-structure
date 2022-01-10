// ### Task 6.2 ###

const taskInput = document.getElementById('task__input');  // элемент "поле <input>"
const tasksList = document.getElementById('tasks__list');  // элемент "список задач"
const tasksForm = document.getElementById('tasks__form');  // элемент "форма"


function taskAdd(taskValue) {    // функция ДОБАВЛЕНИЯ НОВОЙ ЗАДАЧИ
    tasksList.insertAdjacentHTML('beforeend', `
        <div class="task">
            <div class="task__title"></div>
            <a href="#" class="task__remove">&times;</a>
        </div>`); // добавление нового DOM-элемента, являющегося новой задачей
        
        let taskTextItems = tasksList.querySelectorAll('.task__title'); // поиск коллекции текстовых элементов задач, включая только что добавленный
        taskTextItems[taskTextItems.length - 1].textContent = taskValue;  // заполнение нового текстового элемента задачи 
        
        tasksForm.setAttribute('onsubmit', 'return false'); // отключение браузерного действия по умолчанию - "отправка формы"
        
        for (let i = 0; i < taskTextItems.length; i++) {       // перебор элементов созданных(новых) задач     
     
            let deletRef = taskTextItems[i].nextElementSibling; // элемент-ссылка a.href внутри одиночной задачи из списка a.task__remove (крестик "удалить задачу")
            //console.log(deletRef);
            
            if (deletRef !== null) {
            deletRef.onclick = taskRemove;  // присвоение через цикл onclick-события элементам из списка задач, содержащим ссылку "удалить задачу"
            };
        };


};    

function taskRemove (event) { // функция удаления задачи
    elem = event.target;
    elem.parentElement.remove(); // удаление родителького элемента кликнутой ссылки - удаление выбранной задачи!
};

taskInput.onchange = () => {  //  обработка ввода сообщений в поле <input> 

    taskAdd(taskInput.value); // заполнение элемента нового сообщение данными, вводимыми через поле <input>
    taskInput.value = ""; // очистка поля <input> после ввода очередного сообщения

};




    