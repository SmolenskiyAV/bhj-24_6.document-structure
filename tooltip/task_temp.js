// ### Task 6.1 ###

const hasToolTip = document.querySelectorAll('.has-tooltip');

let activeTip = null; // активная (открытая) подсказка
let closeDelay; // задержка, контролирующая отмену дефолтной(браузерной) обработки кликов по ссылкам (чтобы работа одного обработчика кликов не накладывалась на работу другого)


// # для решения задачи принята концепция - DOM-элементы подсказок формируются после загрузки страницы в браузере! 

function addNewTip (element) { // функция добаление DOM-элемента сразу после текущего (element)

    if ((element.nextElementSibling === null) || //  если рядом с кликнутой ссылкой нет DOM-элемента 
        (element.nextElementSibling.classList.
        contains('tooltip') === false)) { //  или есть, но он не является элементом подсказки

        let tip = element.getAttribute('title');
        element.insertAdjacentHTML('afterEnd', `
        <div class="tooltip" style="left: 0; top: 0">${tip}
        </div>`); // добавление нового DOM-элемента, являющегося подсказкой
    };
};

function setTipCoord (element) {    // функция установки координат окна подсказки для текущей ссылки (element)

    let coords = element.getBoundingClientRect(); // координаты элемента относительно левого верхнего угла экрана (видимой части)
    let windowHeight = document.documentElement.clientHeight; // вычисляем высоту окна браузера
    let yDrift = 0;
    console.log('Y= ' + coords.top);    // КОНТРОЛЬНАЯ ТОЧКА
    console.log('WinHeght= ' + windowHeight); // КОНТРОЛЬНАЯ ТОЧКА
   if (coords.top < (windowHeight / 2)) yDrift = 20; // если ссылка в вверхней половине экрана - смещение подсказки вниз на 20px
   if (coords.top >= (windowHeight / 2)) yDrift = -30;  // если ссылка в нижней половине экрана - смещение подсказки вверх на 30px
   console.log('yDrift= ' + yDrift);    // КОНТРОЛЬНАЯ ТОЧКА
    element.nextElementSibling.style.left = `${coords.left}px`;
    element.nextElementSibling.style.top = `${coords.top + yDrift}px`;
    return {
        winHeight: windowHeight,
        x: coords.left,
        y: coords.top
    };
};

function showToolTip() {
    
    let element = this; // элемент, по которому произведён клик
    let tempValue; // врЕменная переменная
       
//===========================================================================================================================
    if (element.nextElementSibling === null) { // формирование врЕменной переменной, для успешного прохождения проверки if(), 
        tempValue = element;                   // когда запись "element.nextElementSibling.classList.contains('tooltip_active')" 
    }else {                                    // выдаёт ошибку при "element.nextElementSibling === nul"
        tempValue = element.nextElementSibling;
    };
//============================================================================================================================
    if ((tempValue.classList.contains('tooltip_active') === false) && (activeTip !== null)) { // если для кликнутого элемента подсказка не открыта, но она уже открыта на другой ссылке
        
        activeTip.classList.remove('tooltip_active'); // закрываем подсказку на другом элементе
        addNewTip (element);  // добавление нового элемента подсказки (если нужно)
        closeDelay = false;
        element.nextElementSibling.classList.add('tooltip_active'); // открываем новую подсказку для текущего элемента
        setTipCoord(element);
        //console.log(setTipCoord(element).y); // КОНТРОЛЬНАЯ ТОЧКА
        activeTip = element.nextElementSibling;
        setTimeout(() => closeDelay = true, 50); // закрыть текущую открытую подсказку можно будет не раньше, чем через 50 миллисекунд

    } else {    
                
                addNewTip (element); // добавление нового элемента подсказки (если нужно)
        
                if (activeTip !== element.nextElementSibling) { // если соседний элемент кликнутой ссылки не является активной подсказкой

                    element.nextElementSibling.classList.add('tooltip_active'); // открываем новую подсказку для текущего элемента
                    setTipCoord(element);
                    //console.log(setTipCoord(element).y);  // КОНТРОЛЬНАЯ ТОЧКА
                    activeTip = element.nextElementSibling;
                    setTimeout(() => closeDelay = true, 50); // закрыть текущую открытую подсказку можно будет не раньше, чем через 50 миллисекунд

                };
        
            };

    console.log('activeTip: ' + activeTip.textContent);  // КОНТРОЛЬНАЯ ТОЧКА
    console.log('=====================================')  

    return false // Запрещаем переход по ссылкам (дефолтная обработка кликов по ссылкам в браузере)
};

for (let i = 0; i < hasToolTip.length; i++) { // перебор коллекции элементов с подсказками в цикле

    hasToolTip[i].onclick = showToolTip;  //  обработка клика на элемент текста с подсказкой
}    

document.onclick = () => { // обработка клика на любом месте страницы, для закрытия активных(открытых) подсказок
    
    if ((closeDelay) && (activeTip !== null)) { 
            activeTip.classList.remove('tooltip_active');
            closeDelay = true;
    };
}
