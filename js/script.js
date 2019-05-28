"use strict"; //все очень строго!!!!!!!!!!!!!!!!!!
let flagZIndex = 10; //что бы выбранный элемент всегда уходил наверх
let zIndexMoving = 10000; //редактирование формы
let flagOnmouseDown = true;
let objElement = null; //объект с которым работаем при измененнии эл. форм
let activeObjStyle = '';
let counter = 0; //номер  информационной страницы

// шрифты
let fontFamily = ['Arial', 'candara', 'ma sans serif', 'Helvetica', 'Verdana', 'Gill Sans', 'Times New Roman',
    'Andale Mono', 'FreeMono', 'monospace', 'cursive', 'fantasy', ''];

/**
 * объект иконок для новых элементов формы
 * @type {{password: {hidePassword: string, iconsDecor: string}, text: string, email: string}}
 */
let iconsObject = {
    text: `<i class="fa fa-font" aria-hidden="true"></i>`,
    email: `<i class="fa fa-envelope" aria-hidden="true"></i>`,
    password: {
        iconsDecor: `<i class="fa fa-key" aria-hidden="true"></i>`,
        hidePassword: `<i onclick="hidePass(event)" class="fa fa-eye" aria-hidden="true"></i>`
    }
};


/**
 * объект иконок для поля настроек
 * @type {{}}
 */
let iconsObjectSettings = {
    text: {
        width: `<i class="fa fa-arrows-h" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        borderRadius: `<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        backgroundColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        borderBackground: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
    },
    password: {
        width: `<i class="fa fa-arrows-h" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        borderRadius: `<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        backgroundColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        borderBackground: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
    },
    email: {
        width: `<i class="fa fa-arrows-h" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        borderRadius: `<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        backgroundColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        borderBackground: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
    },
    submit: {
        textButton: `<i class="fa fa-font" aria-hidden="true"></i>`,
        textAlert: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        backgroundColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`,
        width: `<i class="fa fa-arrows-h" aria-hidden="true"></i>`,
    },
    radio: {
        textRadio: '<i class="fa fa-font" aria-hidden="true"></i>',
        textName: `<i class="fa fa-font" aria-hidden="true"></i>`
    },
    checkbox: {
        textRadio: '<i class="fa fa-font" aria-hidden="true"></i>',
        textName: `<i class="fa fa-font" aria-hidden="true"></i>`,
        active: `<i class="fa fa-check-square-o" aria-hidden="true"></i>`,
    },
    select: {
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        options: '<i class="fa fa-plus" aria-hidden="true"></i>',
        listOptions: `<i class="fa fa-list-ol" aria-hidden="true"></i>`
    },
    header: {
        textHeader: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`
    },
    'header-text': {
        textHeader: `<i class="fa fa-font" aria-hidden="true"></i>`,
        fontSize: `<i class="fa fa-text-width" aria-hidden="true"></i>`,
        fontColor: `<i class="fa fa-eyedropper" aria-hidden="true"></i>`,
        fontFamily: `<i class="fa fa-font" aria-hidden="true"></i>`
    }
};


/**
 * информационный массив
 * @type {string[]}
 */
let textInfo = [
    'Добро пожаловать в конструктор форм. Для начала работы необходимо пройти иснтуркцию либо пропустить её',
    'Для добавления нового элемента формы, необходимо зажать мышь над выбранным элементом и перенести её в поле по центру',
    'Что бы изменить элемент формы, необходимо выполнить двойной клик по появляющейся шапке над элементом, если это шакпа формы, то выполнить двойной клик по тексту (изменения применяются сразу).',
    'Для сохранения формы, необходимо нажать икноку сохранения в правом верхнем углу.',
    'Что бы просмотреть, изменить сохраненые формы, необходимо нажать кнопку "user forms" в верхнем леврм углу и псоле выбрать нужную форму. Учтите, кнопка будет не активна, пока Вы не сохраните хотя бы 1 форму',
    'Для удаления формы, необходимо нажать правой клавишей мыши на выбранное название формы ',
    'Для удаления элемента формы, необходимо перенести его за границу формы',
    'Для того, что бы реализовать какой-либо выбор необходимо добавить несколько radio кнопок и при редактировании доавить им одинаковое имя (text name)',
    'приятной работы и ознакомления',
];


/**
 * вывод модалки с информацией
 */
window.onload = () => {
    document.getElementById('modal').style.display = 'flex';
    renderInfoText(textInfo);
    formChecking();
};


/**
 * функция отрисовки информации по конструктору
 * @param textInfo
 */
let renderInfoText = (textInfo) => {
    let blockRender = document.getElementById('modalBodyText');
    blockRender.innerHTML = textInfo[0];
    let forwardsText = document.getElementById('forwardsText');
    let backwardText = document.getElementById('backwardText');
    document.getElementById('counter').innerHTML = counter + 1;
    forwardsText.onclick = () => {
        counter++;
        if (counter === textInfo.length - 1) {
            closedModalInfo();
        }
        document.getElementById('counter').innerHTML = counter + 1;
        blockRender.innerHTML = textInfo[counter];
    }
    backwardText.onclick = () => {
        if (counter === 0) {
            return;
        } else {
            counter--;
            blockRender.innerHTML = textInfo[counter];
            document.getElementById('counter').innerHTML = counter + 1;
        }
    };

};

/**
 * событие drag n drop на выбор нового поля
 * формы и на перемещение добавленных элементов формы
 */
document.onmousedown = (e) => {
    if (e.which == 1) {
        // добавление нового эл. формы
        if (e.target.parentNode.classList.contains('constructor__body-element')
            || e.target.parentNode.parentNode.classList.contains('constructor__body-element') && flagOnmouseDown) {
            addNewElFormDragAndDrop(e);
        }
        // перемещение элемента формы
        if (e.target.parentNode.classList.contains('new-el-form') && flagOnmouseDown) {
            let movengElement = e.target.parentNode;
            movingАormElement(e, movengElement);
        }
        //перемещение шапки модального окна
        if (e.target.classList.contains('modal-body__header') && flagOnmouseDown) {
            movingModal(e, e.target.parentNode.parentNode)
        }
        // перемещение таекста заголовка формы
        if (e.target.classList.contains('header-text') && flagOnmouseDown) {
            let element = e.target;
            if (e.target.localName === 'h1') {
                element = e.target.parentNode;
            }
            movingElHeadertext(e, element)
        }
        // перемещение блока натсроек
        if (e.target.classList.contains('moving-form__settings-header')) {
            movingElForm(e);
        }
        saveNewForm(e);
    }
};


/**
 * обработчик закрытия модального окна
 */
let closedModalInfo = document.getElementById('closedModal').onclick = () => {
    let modal = document.getElementById('modal');
    let modalBody = document.getElementById('modalBody');
    modalBody.style.animation = 'none';
    modalBody.style.animation = 'closedModal .4s ease-in-out forwards';
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementsByClassName('window-modal')[0].style.display = 'none';
        modalBody.style.animation = 'addModal .4s ease-in-out forwards';
    }, 400)
};


/**
 * функция сохранения новой пользовательской формы в localStorage
 * @param e
 */
let saveNewForm = (e) => {
    let iconsSaveForm = e.target.parentNode.parentNode;
    let newForm = document.getElementById('constructorZone');
    let nameForm = document.getElementsByClassName('save-name-form')[0];
    let newUserFormName = nameForm.innerHTML;
    if (iconsSaveForm.classList.contains('save-form')) {
        document.getElementsByClassName('constructor__body-settings')[0].style.marginRight = `-30%`
        localStorage.setItem(newUserFormName, newForm.innerHTML);
        formChecking();
        newForm.innerHTML = '';
        newForm.innerHTML = `<div class="header-form" id="headerForm">
                    <div class="text header-form__settings header-text">
                        <h1 class="save-name-form header-text " ondblclick="addBlockSettingsStyle(event)">Новая форма</h1>
                    </div>
                    <div id="saveForm" class="save-form"><span><i class="fa fa-floppy-o" aria-hidden="true"></i></span></div>
                </div>`
        addUserForms();
    }
    ;

};


/**
 * функция проверки наличия сохраненных пользователем форм ждя активации возмодности просмотра списка
 */
function formChecking() {
    if (localStorage.length > 0) {
        document.getElementsByClassName('user-forms')[0].style.pointerEvents = 'auto';
    }
}

/**
 * функция отрисовки пользовательских сохраненных форм в localStorage
 */
function addUserForms() {
    let blockListFromUser = document.getElementsByClassName('block-list__user-form')[0];
    blockListFromUser.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        blockListFromUser.innerHTML += `<div class="${localStorage.key(i)}" oncontextmenu="deleteFormUser(event); return false" onclick="toShowUserForm(event)"><span>${localStorage.key(i)}</span></div>`
    }
}

/**
 * функция отображения выбранной  формы
 * @param e
 */
let toShowUserForm = (e) => {
    if (e.which == 1) {
        let activeBlock = e.target;
        let zoneForm = document.getElementById('constructorZone');
        if (e.target.classList.length < 1) {
            activeBlock = e.target.parentNode;
        }
        for (let i = 0; i < localStorage.length; i++) {
            if (activeBlock.classList.value === localStorage.key(i)) {
                zoneForm.innerHTML = localStorage.getItem(localStorage.key(i));
            }
        }
    }
};

/**
 * функция удаления сохраненной формы пользователя
 * @param e
 */
let deleteFormUser = (e) => {
    let activeBlock = e.target;
    if (e.target.classList.length < 1) {
        activeBlock = e.target.parentNode;
    }
    for (let i = 0; i < localStorage.length; i++) {
        if (activeBlock.classList.value === localStorage.key(i)) {
            localStorage.removeItem(localStorage.key(i))
        }
    }
    document.getElementById('constructorZone').innerHTML = `<div class="header-form" id="headerForm">
                    <div class="text header-form__settings header-text">
                        <h1 class="save-name-form header-text " ondblclick="addBlockSettingsStyle(event)">Новая форма</h1>
                    </div>
                    <div id="saveForm" class="save-form"><span><i class="fa fa-floppy-o" aria-hidden="true"></i></span></div>
                </div>`
    addUserForms();
};


/**
 * Функция отображения и скрытия пароля
 * @param e
 */
let hidePass = (e) => {
    let passEye = e.target.parentNode.parentNode.children[1]
    if (passEye.type === 'password') {
        passEye.type = 'text';
    } else {
        passEye.type = 'password';
    }
};


/**
 * функция перемещения модального окна
 * @param e
 * @param movengElement
 */
let movingModal = (e, movengElement) => {
    if (e.which === 1) {
        let x = '';
        let y = '';
        document.onmousemove = (e) => {
            movingModalСoordinates(e);
        };

        document.onmouseup = (e) => {
            document.onmousemove = null;
        };

        let movingModalСoordinates = (e) => {
            x = e.pageX - movengElement.children[0].children[1].clientWidth / 2 + 'px';
            y = e.pageY - movengElement.children[0].children[1].clientHeight / 2 + 'px';
            movengElement.style.left = x;
            movengElement.style.top = y;
        };
    }
};


/**
 * перемещение элемента формы
 * @param element - элемент с которым работаем
 */
let movingАormElement = (e, element) => {
    // начальные координаты
    if (e.which == 1) {
        element.style.zIndex = flagZIndex;
        flagZIndex += 1;
        let constructorBodyEl = document.getElementById('constructorBodyEl');
        let constructorZone = document.getElementById('constructorZone');
        let constructorHeader = document.getElementById('constructorHeader');
        let headerForm = document.getElementById('headerForm');
        if (!e.target.classList.contains('switches-header')) {
            const position = {
                left: element.offsetLeft,
                top: element.offsetTop
            };
            document.onmousemove = (e) => {
                moveAt(e)
            };
            element.onmouseup = () => {
                if (element.style.left < '0px'
                    || element.style.top < '0px'
                    || element.offsetLeft + element.clientWidth > constructorZone.clientWidth
                    || element.offsetTop + element.clientHeight > constructorZone.clientHeight
                ) {
                    deleteNewform(e)
                }
                document.onmousemove = null;
            };
            let moveAt = (e) => {
                element.style.left = e.pageX - constructorBodyEl.clientWidth - element.clientWidth / 2 + 'px';
                element.style.top = e.pageY - constructorHeader.clientHeight - element.clientHeight + element.children[0].clientHeight / 2 + 'px';
                if (element.style.left < '0px'
                    || element.offsetLeft + element.clientWidth > constructorZone.clientWidth
                    || element.style.top < '0px'
                    || e.pageY - constructorHeader.clientHeight + element.clientHeight / 2 > constructorZone.clientHeight
                ) {
                    element.style.opacity = '0.4'
                } else {
                    element.style.opacity = '1'
                }
            }
        } else {
            document.onmousemove = (e) => {
                moveAt(e);
            };

            element.onmouseup = (e) => {
                if (element.style.left < '0px'
                    || element.style.top < '0px'
                    || element.offsetLeft + element.clientWidth > constructorZone.clientWidth
                    || element.offsetTop + element.clientHeight > constructorZone.clientHeight
                ) {
                    deleteNewform(e)
                }
                document.onmousemove = null;
            };

            let moveAt = (e) => {
                element.style.left = e.pageX - constructorBodyEl.clientWidth - element.clientWidth * 1.5 + 'px';
                element.style.top = e.pageY - constructorHeader.clientHeight - element.clientHeight + 'px';
                if (element.style.left < '0px'
                    || element.offsetLeft + element.clientWidth > constructorZone.clientWidth
                    || element.style.top < '0px'
                    || e.pageY - constructorHeader.clientHeight + element.clientHeight / 2 > constructorZone.clientHeight
                ) {
                    element.style.opacity = '0.4'
                } else {
                    element.style.opacity = '1'
                }
            }
        }

    }
};


/**
 * функция перемещения блока настроек элементов формы
 * @param e
 */
let movingElForm = (e) => {
    let block = e.target.parentNode;
    let header = document.getElementsByClassName('moving-form__settings-header')[0];
    document.onmousemove = (e) => {
        moveAt(e);
    };

    document.onmouseup = () => {
        document.onmousemove = null;
    };

    let moveAt = (e) => {
        block.style.left = e.pageX - header.offsetWidth / 2 + 'px';
        block.style.top = e.pageY - header.offsetHeight / 2 + 'px';
    };
};


/**
 * перемещение шапки формы
 * @param e
 * @param element
 */
let movingElHeadertext = (e, element) => {
    let blockLeft = document.getElementById('constructorBodyEl');
    let blockZone = document.getElementById('constructor');
    let headerForm = document.getElementById('headerForm');
    let left;
    let top;
    element.style.zIndex = flagZIndex;
    flagZIndex += 1;
    let standartPosition = {
        left: element.offsetLeft,
        top: element.offsetTop,
    };

    document.onmousemove = (e) => {
        moveAt(e);
    };

    element.onmouseup = (e) => {
        if (left < 0 || left + element.offsetWidth > headerForm.offsetWidth
            || top < 0 || top + element.offsetHeight > headerForm.offsetHeight) {
            element.style.left = standartPosition.left + 'px';
            element.style.top = standartPosition.top + 'px';
            element.style.opacity = '1'

        }
        document.onmousemove = null;
    };


    let moveAt = (e) => {
        left = e.pageX - blockLeft.offsetWidth - element.offsetWidth / 2;
        top = e.pageY - blockZone.offsetTop - element.offsetHeight;
        element.style.left = left + 'px';
        element.style.top = top + 'px';
        if (left < 0 || left + element.offsetWidth > headerForm.offsetWidth
            || top < 0 || top + element.offsetHeight > headerForm.offsetHeight) {
            element.style.opacity = '.4'
        } else {
            element.style.opacity = '1'
        }
    }


};


/**
 * функция добавление новых элементов формы в форму
 * @param e
 */
let addNewElFormDragAndDrop = (e) => {
    let button = document.getElementsByClassName('body-but');
    for (let i = 0; i < button.length; i++) {
        if (button[i] === e.target || e.target.parentNode === button[i]) {
            if (e.which == 1) {

                let widthButt = button[i].clientWidth;
                let heightButt = button[i].clientHeight;
                let constructorZone = document.getElementById('constructorZone');
                let blockHeader = document.getElementById('constructorHeader'); //блок шапка
                let blockConstructorBody = document.getElementById('constructorBody'); //блок куда вставляются элементы
                // тип будущего элемента
                let typeNewElForm = button[i].classList[0];
                // полежение блока на который переносим элементы формы
                let positionForm = {
                    left: constructorZone.offsetLeft,
                    top: constructorZone.offsetTop,
                    width: constructorZone.offsetWidth,
                    height: constructorZone.offsetHeight
                };
                //стили новой формы
                let styleNewElForm = {};
                let addAvatarSize = (e) => {
                    avatar.style.left = e.pageX - avatar.clientWidth / 2 + 'px';
                    avatar.style.top = e.pageY - avatar.clientHeight / 2 + 'px';
                    styleNewElForm.left = e.pageX - constructorBodyEl.clientWidth - avatar.clientWidth / 2 + 'px';
                    styleNewElForm.top = e.pageY - blockHeader.clientHeight - blockConstructorBody.offsetTop + 'px';
                };
                // объект для переноса
                let newElForm = {};
                newElForm.avatar = `<div id="avatar" class="${button[i].classList[0]}"><span>${typeNewElForm}</span></div>`;
                // добавление аватара
                e.target.innerHTML += newElForm.avatar;
                // нашли аватара для рабоыт с ним
                let avatar = document.getElementById('avatar');
                avatar.style.width = widthButt + 'px';
                avatar.style.height = heightButt + 'px';
                avatar.style.position = 'absolute';
                addAvatarSize(event);

                document.onmousemove = (e) => {
                    addAvatarSize(e);
                };
                document.onmouseup = () => {
                    let buttLeft = avatar.offsetLeft;
                    let buttTop = avatar.offsetTop;
                    if (buttLeft > positionForm.left && buttTop > positionForm.top
                        && buttLeft + avatar.offsetWidth < (positionForm.left + positionForm.width)
                        && buttTop + avatar.offsetHeight < (positionForm.top + positionForm.height)) {
                        addNewElForm(constructorZone, typeNewElForm, styleNewElForm);
                    }
                    e.target.removeChild(avatar);
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    }
};


/**
 * функция добавления в форму новых элементов
 * @param whereInsert - куда вставляем
 * @param thatInsert - что вставляем
 * @param thatInsert - стили нового элемента
 */
let addNewElForm = (whereInsert, thatInsert, styleNewForm) => {
    let icons = '';
    let input = '';
    let iconsPass = '';
    let newElForm = '';
    if (thatInsert === 'select') {
        newElForm = `<div class="${thatInsert} new-el-form" style="position: absolute; top:${styleNewForm.top}; left:${styleNewForm.left}" >
        <div class="new-el-form__header ${thatInsert}" ondblclick="addBlockSettingsStyle(event)" ><span></span>
        </div><div class="new-el-form__body"><select ><option value="Выбор">Выбор</option></div></div>`
    } else if (thatInsert === 'header') {
        newElForm = `<div class="${thatInsert} new-el-form" style="position: absolute; top:${styleNewForm.top}; left:${styleNewForm.left}" >
        <div class="new-el-form__header header" ondblclick="addBlockSettingsStyle(event)">
        </div><div class="new-el-form__body">
        <span class="type-header">Заголовок</span>
        </div></div>`
    } else if (thatInsert === 'radio' || thatInsert === 'checkbox') {
        newElForm = `<div class="${thatInsert} new-el-form" style="position: absolute; top: ${styleNewForm.top}; left: ${styleNewForm.left};">
        <div class="new-el-form__header switches-header ${thatInsert}" ondblclick="addBlockSettingsStyle(event)"></div>
        <div class="new-el-form__body" switches-body>
            <input type="${thatInsert}">
            <span></span>
        </div>
        </div>`;
    } else {
        switch (thatInsert) {
            case 'header':
                icons = iconsObject.text;
                input = `<input class="type-${thatInsert}" type="${thatInsert}" placeholder="${thatInsert}">`;
                break;
            case 'text':
                icons = iconsObject.text;
                input = `<input class="type-${thatInsert}" type="${thatInsert}" placeholder="${thatInsert}">`;
                break;
            case 'password':
                icons = iconsObject.password.iconsDecor;
                iconsPass = iconsObject.password.hidePassword;
                input = `<input class="type-${thatInsert}" type="${thatInsert}" placeholder="${thatInsert}">`;
                break;
            case 'email':
                icons = iconsObject.email;
                input = `<input class="type-${thatInsert}" type="${thatInsert}" placeholder="${thatInsert}">`;
                break;
            case 'submit':
                input = `<input class="type-${thatInsert}" type="${thatInsert}" name="${thatInsert}" onclick="alert(this.name)" placeholder="${thatInsert}">`;
                break;
        }
        newElForm = `<div class="${thatInsert} new-el-form" style="position: absolute; top:${styleNewForm.top}; left:${styleNewForm.left}" >
        <div class="new-el-form__header ${thatInsert}" ondblclick="addBlockSettingsStyle(event)">
        </div><div class="new-el-form__body">
        <div class="new-el-form__body-icons">${icons}</div>
        ${input}
        <div class="new-el-form__body-icons-pass">${iconsPass}</div>
        </div></div>`
    }
    whereInsert.innerHTML += newElForm;
};


/**
 * функция удаления элемента формы
 * @param e - элемент который удаляем
 */
let deleteNewform = (e) => {
    let elDelete = e.target.parentNode; //элемент который удаляем Drag And Drop
    if (elDelete.classList.contains('new-el-form__body')) {
        elDelete.parentNode.parentNode.removeChild(elDelete.parentNode);
    } else {
        elDelete.parentNode.removeChild(elDelete);
    }

};


/**
 * функция вызова модального окна по элементу формы
 * @param e
 */
let settingsElForm = (e) => {
    if (!e.target.classList.contains('el-header') && !e.target.classList.contains('h')) {
        let elSettingsIcons = e.target.parentNode.parentNode.parentNode; //элемент который меняем при наличии иконок
        let elSettings = e.target.parentNode; //элемент который меняем при наличии иконок
        let type = '';
        if (!elSettings.classList[0].search(/new-el-form/)) {
            type = elSettings.parentNode.classList[0];
        } else {
            type = elSettings.classList[0];
        }
        let coordinates = {
            top: e.pageY,
            left: e.pageX
        };
        addModal(type, coordinates);
    }

};


/**
 * функция добавления в модальное окно полей, по редактированию элемента формы
 * @param type - какой элемент формы будем менять
 */
let addModal = (type, coordinates) => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.top = coordinates.top - modal.clientHeight / 2 + 'px';
    modal.style.left = coordinates.left - modal.clientWidth / 2 + 'px';
    switch (type) {
        case 'submit':
            document.getElementById('modalHeader').innerHTML = `меняем button`;
            break;
        case 'select':
            document.getElementById('modalHeader').innerHTML = `меняем список`;
            break;
        default:
            document.getElementById('modalHeader').innerHTML = `меняем ${type}`;
            break;
    }
};

/**
 * функция отрисовки полей редактирования элемента формы
 * @param e - элемент с которым работаем (выбранный)
 */
let activeElForm = {}; //выбранный элемент
let addBlockSettingsStyle = (e) => {
    if (!e.target.classList.contains('header-text')) {
        activeElForm.block = e.target.parentNode.children[1]; //автивный элемент формы
    } else {
        activeElForm.block = e.target;
    }
    if (e.target.parentNode.classList.contains('text') && !e.target.parentNode.classList.contains('header-text')
        || e.target.parentNode.classList.contains('email')
        || e.target.parentNode.classList.contains('password') || e.target.parentNode.classList.contains('submit')
    ) {
        activeElForm.input = activeElForm.block.children[1];
    }
    let type = e.target.classList[e.target.classList.length - 1];
    let block = document.getElementsByClassName('constructor__body-settings')[0];
    let blockHeader = document.getElementsByClassName('settings__zone__header')[0];
    let blockBody = document.getElementsByClassName('settings__zone__body')[0];
    let blockRender = '';
    let typeInput = {};
    block.style.marginRight = '0';
    blockHeader.innerHTML = `<div><span>меняем ${type}</span></div>`;
    for (let typeKey in iconsObjectSettings) {
        if (typeKey === type) {
            for (let elForm in  iconsObjectSettings[typeKey]) {
                if (elForm === 'textRadio' || elForm === 'textName') {
                    typeInput.type = 'text';
                    typeInput.render = `<input type="${typeInput.type}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'options' || elForm === 'textHeader') {
                    typeInput.type = 'text';
                    typeInput.render = `<input type="${typeInput.type}" placeholder="${elForm}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'listOptions') {
                    let optionList = ``;
                    for (let i = 0; i < activeElForm.block.children[0].children.length; i++) {
                        optionList += `<li class="${activeElForm.block.children[0].children[i].innerHTML}">
                        <span>${activeElForm.block.children[0].children[i].innerHTML}</span>
                        <span ><i onclick="deleteOptionSelect (event)" class="${activeElForm.block.children[0].children[i].innerHTML} fa fa-trash" aria-hidden="true"></i></span></li>`;
                    }
                    typeInput.render = `<ul id="optionList">${optionList}</ul>`
                } else if (elForm === 'borderRadius') {
                    typeInput.type = 'range';
                    typeInput.render = `<input type="${typeInput.type}" value="1" max="20" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'borderBackground') {
                    typeInput.type = 'color';
                    typeInput.render = `<input type="${typeInput.type}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'active') {
                    typeInput.type = 'checkbox';
                    typeInput.render = `<input type="${typeInput.type}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'width') {
                    typeInput.type = 'range';
                    typeInput.size = 300;
                    typeInput.render = `<input type="${typeInput.type}" value="1" max="${typeInput.size}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'fontSize') {
                    typeInput.type = 'range';
                    typeInput.size = 36;
                    typeInput.render = `<input type="${typeInput.type}" value="1" max="${typeInput.size}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'height') {
                    typeInput.type = 'range';
                    typeInput.size = 50;
                    typeInput.render = `<input type="${typeInput.type}" value="1" max="${typeInput.size}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'textButton' || elForm === 'textAlert') {
                    typeInput.type = 'text';
                    typeInput.render = `<input type="${typeInput.type}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'fontColor') {
                    typeInput.type = 'color';
                    typeInput.render = `<input type="${typeInput.type}" value="1" max="${typeInput.size}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                } else if (elForm === 'fontFamily') {
                    typeInput.render = `<select  name="${elForm}" oninput="changeStyle(this.value,this.name)" 
                    id="selectFontFamily"><option value="">Выбрать</option></select>`;
                } else if (elForm === 'backgroundColor') {
                    typeInput.type = 'color';
                    typeInput.render = `<input type="${typeInput.type}" value="#000000" max="${typeInput.size}" name="${elForm}" 
                    oninput="changeStyle(this.value, this.name)">`
                }
                if (elForm === 'options') {
                    blockRender += `<div><div><span>${elForm}</span>
                </div><div> ${typeInput.render} </div><span class="list-options" onclick="addOptionSelect(event)">${iconsObjectSettings[typeKey][elForm]}</span></div>`;
                } else {
                    blockRender += `<div><div><span>${iconsObjectSettings[typeKey][elForm]}</span><span>${elForm}</span>
                </div><div> ${typeInput.render} </div><span id="${elForm}"></span></div>`;
                }
            }
        }
    }
    blockBody.innerHTML = blockRender;
    //если есть список шрифтов
    if (document.getElementById('selectFontFamily')) {
        addListFontFamily(document.getElementById('selectFontFamily'), fontFamily);
    }
};

/**
 * функция отрисовки списка шрифтов
 * @param el
 * @param list
 */
let addListFontFamily = (el, list) => {
    list.forEach(elList => {
        el.innerHTML += `<option value="${elList}">${elList}</option>`
    })
};

/**
 * функция добавления полей select
 * @param e
 */
let addOptionSelect = (e) => {
    let newOption = e.target.parentNode.parentNode.children[1].children[0].value;
    let optionList = '';
    if (newOption !== '') {
        optionList = document.getElementById('optionList');
        activeElForm.block.children[0].innerHTML += `<option value="${newOption}">${newOption}</option>`;
        e.target.parentNode.parentNode.children[1].children[0].value = '';
        optionList.innerHTML += `<li><span>${newOption}</span>
        <span onclick="deleteOptionSelect (event)"><i class="${newOption} fa fa-trash " aria-hidden="true"></i></span></li>`
    }
    ;
};

/**
 * функция удаления элмента списка
 * @param e -
 */
let blockUi = ''; //блок куда вставляем новые элементы списка
let deleteLi = ''; // новый элемент списка
let deleteOptionSelect = (e) => {
    blockUi = e.target.parentNode.parentNode.parentNode;
    deleteLi = e.target.parentNode.parentNode;
    for (let i = 0; i < activeElForm.block.children[0].children.length; i++) {
        if (activeElForm.block.children[0].children[i].value === e.target.classList[0]) {
            activeElForm.block.children[0].removeChild(activeElForm.block.children[0].children[i])
        }
    }
    blockUi.removeChild(deleteLi);

};


/**
 * функция отображения размера и изменения стилей блока с которым рабоатем
 * @param style - изменяемый параметр
 * @param name - объект с которым работаем
 */
let changeStyle = (style, name) => {
    if (name !== 'fontColor' && name !== 'fontFamily' && name !== 'backgroundColor' && name !== 'textAlert'
        && name !== 'textButton' && name !== 'textRadio' && name !== 'textName' && name !== 'active'
        && name !== 'borderBackground' && name !== 'positionText' && name !== 'options' && name !== 'textHeader') {
        document.getElementById(name).innerHTML = style + 'px';
    }
    switch (name) {
        case 'textHeader':
            if (!activeElForm.block.classList.contains('header-text')) {
                activeElForm.block.children[0].innerHTML = style;
            } else {
                activeElForm.block.innerHTML = style;
            }
            break;
        case 'borderRadius':
            activeElForm.input.style.borderRadius = style + 'px';
            break;
        case 'borderBackground':
            activeElForm.input.style.borderColor = style;
            activeElForm.input.style.borderWidth = '1px';
            activeElForm.input.style.borderStyle = 'solid';
            break;
        case 'textRadio':
            activeElForm.block.children[1].innerHTML = style;
            break;
        case 'textName':
            activeElForm.block.children[0].name = style;
            break;
        case 'active':
            activeElForm.block.children[0].checked = !activeElForm.block.children[0].checked
            break;
        case 'textAlert':
            activeElForm.input.name = style;
            break;
        case 'textButton':
            activeElForm.input.value = style;
            break;
        case 'fontSize':
            if (!activeElForm.block.parentNode.classList.contains('header')
                && !activeElForm.block.classList.contains('header-text')
            ) {
                activeElForm.input.style.fontSize = style + 'px';
            }
            activeElForm.block.style.fontSize = style + 'px';
            break;
        case 'width':
            activeElForm.block.style.width = style + 'px';
            activeElForm.input.style.width = style + 'px';
            break;
        case 'fontColor':
            if (!activeElForm.block.classList.contains('header-text')
                && !activeElForm.block.parentNode.classList.contains('header')
            ) {
                activeElForm.block.children[0].style.color = style;
                activeElForm.input.style.color = style;
            }
            activeElForm.block.style.color = style;
            break;
        case 'fontFamily':
            if (!activeElForm.block.classList.contains('header-text')
                && !activeElForm.block.parentNode.classList.contains('header')) {
                activeElForm.input.style.fontFamily = style;
            }
            activeElForm.block.style.fontFamily = style;
            break;
        case 'backgroundColor':
            activeElForm.input.style.background = style;
            break;
    }
};

/**
 * функция закрытия блока настроек
 */
let closeBlockSettingsStyle = () => {
    let block = document.getElementsByClassName('constructor__body-settings')[0];
    block.style.marginRight = '-30%'
};



