// --- FIREBASE CONFIGURATION ---
// (Esta parte YA ESTÁ en el HTML, NO la repitas aquí si la dejaste en el HTML)
// const firebaseConfig = { ... };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const LAST_SELECTED_STUDENT_ID_KEY = 'poleDanceApp_lastSelectedStudentId_v2_login';
const LAST_ACTIVE_VIEW_KEY = 'poleDanceApp_lastActiveView_v2_login';
const CURRENT_LOGGED_IN_USER_KEY = 'poleDanceApp_loggedInUser_v2_login';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const MIN_HOURS_BEFORE_CLASS_MODIFICATION = 4;

let students = [];
let packageTypes = [];
let selectedStudentId = null;
let currentActiveView = 'welcomeView';
let calendarCurrentDate = new Date();
let calendarSelectedDateStr = getTodayDateString(); // Initialize after function definition
let currentStudentListFilter = 'activo';
let adminStudentClassesFilter = 'programadas';
let portalStudentClassesFilter = 'programadas';
let loggedInUserType = null;
let loggedInStudentId = null;

// --- DOM ELEMENTS ---
const classDateInput = document.getElementById('classDateInput');
const classTimeInput = document.getElementById('classTimeInput');
const classRepeatWeeksInput = document.getElementById('classRepeatWeeksInput');
const scheduleClassBtn = document.getElementById('scheduleClassBtn');
const scheduleClassError = document.getElementById('scheduleClassError');
const portalClassDateInput = document.getElementById('portalClassDateInput');
const portalClassTimeInput = document.getElementById('portalClassTimeInput');
const portalClassRepeatWeeksInput = document.getElementById('portalClassRepeatWeeksInput');
const portalScheduleClassBtn = document.getElementById('portalScheduleClassBtn');
const portalScheduleClassError = document.getElementById('portalScheduleClassError');
const editStudentModal = document.getElementById('editStudentModal');
const editingStudentId = document.getElementById('editingStudentId');
const modalEditStudentNameInput = document.getElementById('modalEditStudentNameInput');
const modalEditStudentEmailInput = document.getElementById('modalEditStudentEmailInput');
const editStudentModalError = document.getElementById('editStudentModalError');
const modalSaveEditStudentBtn = document.getElementById('modalSaveEditStudentBtn');
const modalCancelEditStudentBtn = document.getElementById('modalCancelEditStudentBtn');
const extendPackageExpiryModal = document.getElementById('extendPackageExpiryModal');
const extendingPackageIdForStudent = document.getElementById('extendingPackageIdForStudent');
const extendingPackageStudentId = document.getElementById('extendingPackageStudentId');
const extendModalPackageName = document.getElementById('extendModalPackageName');
const extendModalCurrentExpiry = document.getElementById('extendModalCurrentExpiry');
const extendDaysInput = document.getElementById('extendDaysInput');
const extendModalNewExpiryPreview = document.getElementById('extendModalNewExpiryPreview');
const extendPackageExpiryError = document.getElementById('extendPackageExpiryError');
const confirmExtendPackageExpiryBtn = document.getElementById('confirmExtendPackageExpiryBtn');
const cancelExtendPackageExpiryBtn = document.getElementById('cancelExtendPackageExpiryBtn');
const loginView = document.getElementById('loginView');
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const appContainer = document.getElementById('appContainer');
const logoutButtonContainer = document.getElementById('logoutButtonContainer');
const appNavigationTabs = document.getElementById('appNavigationTabs');
const navAlumnosTab = document.getElementById('navAlumnosTab');
const navPackageTypesTab = document.getElementById('navPackageTypesTab');
const navCalendarTab = document.getElementById('navCalendarTab');
const navStudentPortalTab = document.getElementById('navStudentPortalTab');
const navAlumnos = document.getElementById('navAlumnos');
const navPackageTypes = document.getElementById('navPackageTypes');
const navCalendar = document.getElementById('navCalendar');
const navStudentPortal = document.getElementById('navStudentPortal');
const welcomeView = document.getElementById('welcomeView');
const welcomeMainMessage = document.getElementById('welcomeMainMessage');
const alumnosView = document.getElementById('alumnosView');
const packageTypesView = document.getElementById('packageTypesView');
const calendarView = document.getElementById('calendarView');
const studentPortalView = document.getElementById('studentPortalView');
const allContentSections = document.querySelectorAll('.content-section');
const openAddStudentModalBtn = document.getElementById('openAddStudentModalBtn');
const addStudentModal = document.getElementById('addStudentModal');
const modalStudentNameInput = document.getElementById('modalStudentNameInput');
const modalStudentEmailInput = document.getElementById('modalStudentEmailInput');
const modalAddStudentBtn = document.getElementById('modalAddStudentBtn');
const modalCancelAddStudentBtn = document.getElementById('modalCancelAddStudentBtn');
const addStudentModalError = document.getElementById('addStudentModalError');
const studentSearchInput = document.getElementById('studentSearchInput');
const studentListFilterButtons = document.querySelectorAll('#studentListFilterGroup .filter-btn');
const studentDetailStatusButtons = document.querySelectorAll('#studentDetailStatusGroup .filter-btn');
const studentsList = document.getElementById('studentsList');
const studentDetailView = document.getElementById('studentDetailView');
const noStudentSelectedViewInAlumnosView = document.getElementById('noStudentSelectedViewInAlumnosView');
const selectedStudentName = document.getElementById('selectedStudentName');
const selectedStudentEmail = document.getElementById('selectedStudentEmail');
const selectedStudentUsername = document.getElementById('selectedStudentUsername');
const editStudentBtnInDetail = document.getElementById('editStudentBtnInDetail');
const deleteStudentFromDetailBtn = document.getElementById('deleteStudentFromDetailBtn');
const currentPackageInfo = document.getElementById('currentPackageInfo');
const assignNewPackageBtn = document.getElementById('assignNewPackageBtn');
const scheduleClassSection = document.getElementById('scheduleClassSection');
const scheduledClassesList = document.getElementById('scheduledClassesList');
const packageHistoryList = document.getElementById('packageHistoryList');
const openCreatePackageTypeModalBtn = document.getElementById('openCreatePackageTypeModalBtn');
const packageTypesManagementList = document.getElementById('packageTypesManagementList');
const packageTypeModal = document.getElementById('packageTypeModal');
const packageTypeModalTitle = document.getElementById('packageTypeModalTitle');
const editingPackageTypeId = document.getElementById('editingPackageTypeId');
const packageTypeNameInput = document.getElementById('packageTypeNameInput');
const packageTypeClassesInput = document.getElementById('packageTypeClassesInput');
const packageTypeDurationInput = document.getElementById('packageTypeDurationInput');
const packageTypeFormError = document.getElementById('packageTypeFormError');
const savePackageTypeBtn = document.getElementById('savePackageTypeBtn');
const cancelPackageTypeBtn = document.getElementById('cancelPackageTypeBtn');
const assignPackageModal = document.getElementById('assignPackageModal');
const packageTypeSelect = document.getElementById('packageTypeSelect');
const confirmAssignPackageBtn = document.getElementById('confirmAssignPackageBtn');
const cancelAssignPackageBtn = document.getElementById('cancelAssignPackageBtn');
const messageModal = document.getElementById('messageModal');
const messageModalTitle = document.getElementById('messageModalTitle');
const messageModalText = document.getElementById('messageModalText');
const messageModalOkBtn = document.getElementById('messageModalOkBtn');
const editClassModal = document.getElementById('editClassModal');
const editingClassIdInput = document.getElementById('editingClassId');
const editingClassPackageId = document.getElementById('editingClassPackageId');
const editClassDateInput = document.getElementById('editClassDateInput');
const editClassTimeInput = document.getElementById('editClassTimeInput');
const editClassError = document.getElementById('editClassError');
const saveEditClassBtn = document.getElementById('saveEditClassBtn');
const cancelEditClassBtn = document.getElementById('cancelEditClassBtn');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationModalTitle = document.getElementById('confirmationModalTitle');
const confirmationModalText = document.getElementById('confirmationModalText');
const confirmationModalConfirmBtn = document.getElementById('confirmationModalConfirmBtn');
const confirmationModalCancelBtn = document.getElementById('confirmationModalCancelBtn');
let currentOnConfirmCallback = null;
const calendarMonthYearDisplay = document.getElementById('calendarMonthYearDisplay');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const calendarGrid = document.getElementById('calendarGrid');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const dailyClassesListContainer = document.getElementById('dailyClassesListContainer');
const studentPortalMessageContainer = document.getElementById('studentPortalMessageContainer');
const studentPortalContent = document.getElementById('studentPortalContent');
const portalStudentName = document.getElementById('portalStudentName');
const portalCurrentPackageInfo = document.getElementById('portalCurrentPackageInfo');
const portalScheduleClassSection = document.getElementById('portalScheduleClassSection');
const portalScheduledClassesList = document.getElementById('portalScheduledClassesList');
const portalEditClassModal = document.getElementById('portalEditClassModal');
const portalEditingClassId = document.getElementById('portalEditingClassId');
const portalEditingClassPackageId = document.getElementById('portalEditingClassPackageId');
const portalEditClassDateInput = document.getElementById('portalEditClassDateInput');
const portalEditClassTimeInput = document.getElementById('portalEditClassTimeInput');
const portalEditClassError = document.getElementById('portalEditClassError');
const portalSaveEditClassBtn = document.getElementById('portalSaveEditClassBtn');
const portalCancelEditClassBtn = document.getElementById('portalCancelEditClassBtn');
const adminStudentClassesFilterButtons = document.querySelectorAll('#adminStudentClassesFilterGroup .filter-btn');
const portalStudentClassesFilterButtons = document.querySelectorAll('#portalStudentClassesFilterGroup .filter-btn');


// --- LOGIN/LOGOUT & SESSION ---
async function handleLogin(event) {
    event.preventDefault();
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;
    loginError.textContent = '';
    loginSubmitBtn.disabled = true;
    loginSubmitBtn.textContent = 'Ingresando...';

    if (messageModal.style.display === 'flex') {
        messageModal.style.display = 'none';
    }

    try {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            loggedInUserType = 'admin';
            loggedInStudentId = null;
            localStorage.setItem(CURRENT_LOGGED_IN_USER_KEY, JSON.stringify({ type: 'admin' }));

            if (messageModal.style.display === 'flex') {
                messageModal.style.display = 'none';
            }
            await initializeAppUI();
        } else {
            const studentsRef = db.collection('students');
            const snapshot = await studentsRef
                .where('username', '==', username)
                .where('password', '==', password)
                .limit(1)
                .get();

            if (!snapshot.empty) {
                const studentDoc = snapshot.docs[0];
                const studentData = { id: studentDoc.id, ...studentDoc.data() };
                loggedInUserType = 'student';
                loggedInStudentId = studentData.id;
                selectedStudentId = studentData.id;
                localStorage.setItem(CURRENT_LOGGED_IN_USER_KEY, JSON.stringify({ type: 'student', id: studentData.id }));
                const existingStudentIndex = students.findIndex(s => s.id === studentData.id);
                if (existingStudentIndex === -1) {
                    students.push(studentData);
                } else {
                    students[existingStudentIndex] = studentData;
                }

                if (messageModal.style.display === 'flex') {
                    messageModal.style.display = 'none';
                }
                await initializeAppUI();
            } else {
                loginError.textContent = 'Usuario o contraseña incorrectos.';
                showMessage('Error de Ingreso', 'Usuario o contraseña incorrectos. Verifique sus datos y asegúrese de que los índices de Firestore estén configurados.');
            }
        }
    } catch (error) {
        console.error("Login error: ", error);
        loginError.textContent = 'Error al intentar iniciar sesión. Intenta de nuevo.';
        showMessage('Error de Conexión', 'No se pudo conectar a la base de datos para el inicio de sesión: ' + error.message);
    } finally {
        loginSubmitBtn.disabled = false;
        loginSubmitBtn.textContent = 'Ingresar';
    }
}

function handleLogout() {
    showConfirmation('Cerrar Sesión', '¿Estás seguro de que quieres cerrar sesión?', () => {
        loggedInUserType = null;
        loggedInStudentId = null;
        selectedStudentId = null;

        localStorage.removeItem(CURRENT_LOGGED_IN_USER_KEY);
        localStorage.removeItem(LAST_ACTIVE_VIEW_KEY);
        localStorage.removeItem(LAST_SELECTED_STUDENT_ID_KEY);

        appContainer.style.display = 'none';
        loginView.style.display = 'flex';
        loginUsernameInput.value = '';
        loginPasswordInput.value = '';
        loginError.textContent = '';

        if (logoutButtonContainer.firstChild) {
            logoutButtonContainer.removeChild(logoutButtonContainer.firstChild);
        }
        [navAlumnosTab, navPackageTypesTab, navCalendarTab, navStudentPortalTab].forEach(tab => tab.classList.add('hidden-tab'));
    });
}

async function initializeAppUI() {
    loginView.style.display = 'none';
    appContainer.style.display = 'flex';
    if (logoutButtonContainer.children.length === 0) {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.textContent = 'Cerrar Sesión';
        logoutBtn.className = 'btn-secondary py-2 px-4 rounded-md font-semibold transition duration-150 text-sm';
        logoutBtn.addEventListener('click', handleLogout);
        logoutButtonContainer.appendChild(logoutBtn);
    }
    configureNavigation();
    let initialView;

    if (loggedInUserType === 'student') {
        initialView = 'studentPortalView';
        welcomeMainMessage.textContent = 'Accede a "Mi Portal" para gestionar tus clases.';
    } else if (loggedInUserType === 'admin') {
        calendarCurrentDate = new Date();
        calendarSelectedDateStr = getTodayDateString();

        initialView = localStorage.getItem(LAST_ACTIVE_VIEW_KEY) || 'calendarView';
        const lastAdminSelectedStudent = localStorage.getItem(LAST_SELECTED_STUDENT_ID_KEY);

        if (lastAdminSelectedStudent && students.find(s => s.id === lastAdminSelectedStudent)) {
            selectedStudentId = lastAdminSelectedStudent;
        } else {
            selectedStudentId = null;
        }
        welcomeMainMessage.textContent = 'Selecciona una opción de las pestañas superiores para administrar.';
    }
    setActiveView(initialView);
}

function configureNavigation() {
    [navAlumnosTab, navPackageTypesTab, navCalendarTab, navStudentPortalTab].forEach(tabListItem => {
        tabListItem.classList.add('hidden-tab');
    });

    if (loggedInUserType === 'admin') {
        navAlumnosTab.classList.remove('hidden-tab');
        navPackageTypesTab.classList.remove('hidden-tab');
        navCalendarTab.classList.remove('hidden-tab');
    } else if (loggedInUserType === 'student') {
        navStudentPortalTab.classList.remove('hidden-tab');
    }
}

function setActiveView(viewId) {
    if (loggedInUserType === 'student' && viewId !== 'studentPortalView') {
        viewId = 'studentPortalView';
    } else if (loggedInUserType === 'admin' && viewId === 'studentPortalView') {
        viewId = 'calendarView';
    }

    currentActiveView = viewId;
    if (loggedInUserType === 'admin') {
        localStorage.setItem(LAST_ACTIVE_VIEW_KEY, viewId);
    }

    allContentSections.forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));

    const activeSection = document.getElementById(viewId);
    if (activeSection) activeSection.classList.add('active');

    let activeTabButtonDiv;
    switch(viewId) {
        case 'alumnosView': activeTabButtonDiv = navAlumnos; break;
        case 'packageTypesView': activeTabButtonDiv = navPackageTypes; break;
        case 'calendarView': activeTabButtonDiv = navCalendar; break;
        case 'studentPortalView': activeTabButtonDiv = navStudentPortal; break;
        default: activeTabButtonDiv = null;
    }

    if(activeTabButtonDiv && activeTabButtonDiv.parentElement && !activeTabButtonDiv.parentElement.classList.contains('hidden-tab')) {
        activeTabButtonDiv.classList.add('active');
    } else if (viewId === 'welcomeView' && document.getElementById('welcomeView')) {
        document.getElementById('welcomeView').classList.add('active');
    }


    if (viewId === 'alumnosView' && loggedInUserType === 'admin') {
        studentSearchInput.value = '';
        updateStudentListFilterButtonsVisual();
        updateAdminStudentClassesFilterVisual();
        renderStudentsList();
        if (selectedStudentId && students.find(s => s.id === selectedStudentId)) {
            renderStudentDetails(students.find(s => s.id === selectedStudentId));
        } else {
            studentDetailView.classList.add('hidden');
            noStudentSelectedViewInAlumnosView.classList.remove('hidden');
        }
    } else if (viewId === 'packageTypesView' && loggedInUserType === 'admin') {
        renderPackageTypesManagementList();
    } else if (viewId === 'calendarView' && loggedInUserType === 'admin') {
        renderFullCalendarView();
    } else if (viewId === 'studentPortalView' && loggedInUserType === 'student') {
        updatePortalStudentClassesFilterVisual();
        renderStudentPortalView();
    }
}

// --- DATA LOADING ---
async function loadDataFromFirestore() {
    try {
        const studentsSnapshot = await db.collection('students').get();
        students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        students.forEach(student => {
            if (student.status === undefined) student.status = 'activo';
            if (!student.packages) student.packages = [];
            student.packages.forEach(pkg => {
                if (!pkg.scheduledClasses) pkg.scheduledClasses = [];
                if (pkg.assignmentDate === undefined) pkg.assignmentDate = pkg.purchaseDate || getTodayDateString();
                if (pkg.purchaseDate) delete pkg.purchaseDate;
                if (pkg.activationDate === undefined) pkg.activationDate = null;
                if (pkg.expiryDate === undefined) pkg.expiryDate = null;
                if (pkg.status === undefined || !['pending_first_class', 'active', 'completed', 'expired'].includes(pkg.status)) {
                    pkg.status = 'pending_first_class';
                }
                updatePackageStatusAndDates(student, pkg.studentPackageId, false);
            });
            if (!student.username) {
                student.username = generateUniqueUsername(student.name);
            }
            if (!student.password) student.password = student.username;
        });

        const packageTypesSnapshot = await db.collection('packageTypes').get();
        packageTypes = packageTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    } catch (e) {
        console.error("Error al cargar datos de Firestore:", e);
        students = [];
        packageTypes = [];
        showMessage("Error de Carga", "No se pudieron cargar los datos de la aplicación. Revisa tu conexión o contacta al soporte: " + e.message);
    }
}

// --- RENDER FUNCTIONS (GLOBAL SCOPE) ---
async function renderPackageTypesManagementList() {
    if (loggedInUserType !== 'admin') return;
    packageTypesManagementList.innerHTML = '';
    const sortedPackageTypes = [...packageTypes].sort((a, b) => (a.totalClasses || 0) - (b.totalClasses || 0));

    if (sortedPackageTypes.length === 0) {
        packageTypesManagementList.innerHTML = '<li class="p-3 bg-gray-50 rounded-md text-center text-gray-500">No hay paquetes definidos.</li>';
        return;
    }
    sortedPackageTypes.forEach(pt => {
        const li = document.createElement('li');
        li.className = 'p-3 bg-gray-100 rounded-md flex justify-between items-center';
        li.innerHTML = `<div><span class="font-medium text-blue-700">${pt.name}</span><p class="text-sm text-gray-500">${pt.totalClasses} Clases, ${pt.durationDays} Días</p></div><div class="space-x-2"><button data-package-type-id="${pt.id}" class="edit-package-type-btn btn-secondary list-item-action-btn">Editar</button><button data-package-type-id="${pt.id}" class="delete-package-type-btn btn-danger list-item-action-btn">Eliminar</button></div>`;
        packageTypesManagementList.appendChild(li);
    });
    packageTypesManagementList.querySelectorAll('.edit-package-type-btn').forEach(b => b.addEventListener('click', e => openPackageTypeModal(e.target.dataset.packageTypeId)));
    packageTypesManagementList.querySelectorAll('.delete-package-type-btn').forEach(b => b.addEventListener('click', e => deletePackageType(e.target.dataset.packageTypeId)));
}

function renderStudentsList() {
    if (loggedInUserType !== 'admin') return;
    const searchTerm = studentSearchInput.value.toLowerCase().trim();
    let studentsToDisplay = students.filter(student => student.name.toLowerCase().includes(searchTerm));
    if (currentStudentListFilter !== 'todos') {
        studentsToDisplay = studentsToDisplay.filter(student => (student.status || 'activo') === currentStudentListFilter);
    }
    const statusOrder = ['activo', 'suspendido', 'inactivo'];
    studentsToDisplay.sort((a, b) => {
        const statusA = a.status || 'activo';
        const statusB = b.status || 'activo';
        const statusAIndex = statusOrder.indexOf(statusA);
        const statusBIndex = statusOrder.indexOf(statusB);
        if (statusAIndex !== statusBIndex) { return statusAIndex - statusBIndex; }
        return a.name.localeCompare(b.name);
    });
    studentsList.innerHTML = '';
    if (studentsToDisplay.length === 0) {
        let message = "No hay alumnos que coincidan con los filtros.";
        if (students.length === 0) message = "No hay alumnos registrados.";
        else if (studentSearchInput.value && currentStudentListFilter === 'todos') message = `No se encontraron alumnos para "${studentSearchInput.value}".`;
        else if (studentSearchInput.value && currentStudentListFilter !== 'todos') message = `No se encontraron alumnos "${currentStudentListFilter}" para "${studentSearchInput.value}".`;
        else if (currentStudentListFilter !== 'todos') message = `No hay alumnos con estado "${currentStudentListFilter}".`;
        studentsList.innerHTML = `<li class="p-3 bg-gray-50 rounded-md text-center text-gray-500">${message}</li>`;
        return;
    }
    studentsToDisplay.forEach(s => {
        const li = document.createElement('li');
        li.className = `p-3 rounded-md cursor-pointer hover:bg-blue-100 flex justify-between items-center ${s.id === selectedStudentId ? 'bg-blue-200 ring-2 ring-blue-600' : 'bg-gray-50'}`;
        li.dataset.studentId = s.id;
        const nameSpan = document.createElement('span');
        nameSpan.textContent = s.name;
        nameSpan.className = 'flex-grow';
        const statusSpan = document.createElement('span');
        statusSpan.className = getStatusColorClasses(s.status || 'activo', 'list');
        statusSpan.textContent = (s.status || 'activo').charAt(0).toUpperCase() + (s.status || 'activo').slice(1);
        li.appendChild(nameSpan);
        li.appendChild(statusSpan);
        li.addEventListener('click', () => selectStudent(s.id));
        studentsList.appendChild(li);
    });
}

function renderFullCalendarView() {
    if (loggedInUserType !== 'admin') return;
    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth();
    calendarMonthYearDisplay.textContent = `${calendarCurrentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
    renderCalendarGrid(year, month);
    renderDailyClassesForDate(calendarSelectedDateStr);
}

function renderCalendarGrid(year, month) {
    calendarGrid.innerHTML = '';
    const todayStr = getTodayDateString();
    const allClasses = getAllScheduledClasses();
    const daysWithClasses = new Set(allClasses.map(cls => cls.date));
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    let startingDay = firstDayOfMonth.getDay();
    if (startingDay === 0) startingDay = 6;
    else startingDay -=1;

    const dayHeaders = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
    dayHeaders.forEach(header => {
        const headerEl = document.createElement('div');
        headerEl.className = 'calendar-header-day';
        headerEl.textContent = header;
        calendarGrid.appendChild(headerEl);
    });

    for (let i = 0; i < startingDay; i++) {
        const emptyEl = document.createElement('div');
        emptyEl.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyEl);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        const currentDate = new Date(year, month, day);
        const currentDateStr = dateToYYYYMMDD(new Date(Date.UTC(year, month, day)));

        const dayNumberSpan = document.createElement('span');
        dayNumberSpan.className = 'day-number';
        dayNumberSpan.textContent = day;
        dayEl.appendChild(dayNumberSpan);

        if (currentDateStr === todayStr) dayEl.classList.add('today');
        if (currentDateStr === calendarSelectedDateStr) dayEl.classList.add('selected-day');
        if (daysWithClasses.has(currentDateStr)) dayEl.classList.add('has-classes');

        dayEl.dataset.date = currentDateStr;
        dayEl.addEventListener('click', (e) => {
            document.querySelectorAll('.calendar-day.selected-day').forEach(d => d.classList.remove('selected-day'));
            e.currentTarget.classList.add('selected-day');
            calendarSelectedDateStr = e.currentTarget.dataset.date;
            renderDailyClassesForDate(calendarSelectedDateStr);
        });
        calendarGrid.appendChild(dayEl);
    }
}

function renderDailyClassesForDate(dateStr) {
    selectedDateDisplay.textContent = formatDate(dateStr);
    const allClasses = getAllScheduledClasses();
    const classesForDay = allClasses.filter(cls => cls.date === dateStr);
    dailyClassesListContainer.innerHTML = '';

    if (classesForDay.length === 0) {
        dailyClassesListContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No hay clases programadas para esta fecha.</p>';
        return;
    }

    const classesByTime = {};
    classesForDay.forEach(cls => {
        const timeKey = cls.time || 'Sin hora';
        if (!classesByTime[timeKey]) classesByTime[timeKey] = [];
        classesByTime[timeKey].push(cls);
    });

    const sortedTimes = Object.keys(classesByTime).sort((a, b) => {
        if (a === 'Sin hora') return 1;
        if (b === 'Sin hora') return -1;
        return a.localeCompare(b);
    });

    sortedTimes.forEach(time => {
        const timeBlock = document.createElement('div');
        timeBlock.className = 'mb-3 p-3 bg-white rounded shadow-sm';

        const timeHeader = document.createElement('h4');
        timeHeader.className = 'font-semibold text-blue-700 mb-1';
        timeHeader.textContent = time === 'Sin hora' ? 'Horario no especificado' : formatTime(time);
        timeBlock.appendChild(timeHeader);

        const studentListUl = document.createElement('ul');
        studentListUl.className = 'space-y-2';

        classesByTime[time].forEach(cls => {
            const studentLi = document.createElement('li');
            studentLi.className = 'text-gray-700 flex justify-between items-center daily-class-item';

            const studentNameSpan = document.createElement('span');
            studentNameSpan.textContent = cls.studentName;
            studentLi.appendChild(studentNameSpan);

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'space-x-1 daily-class-item-actions';

            const classDateTimeStr = `${cls.date}T${cls.time || "00:00:00"}`;
            const classDateTime = new Date(classDateTimeStr);
            const nowForComparison = new Date();

            const classDateOnly = new Date(classDateTime.getFullYear(), classDateTime.getMonth(), classDateTime.getDate());
            const nowDateOnly = new Date(nowForComparison.getFullYear(), nowForComparison.getMonth(), nowForComparison.getDate());

            const isPastOrTodayAfterTime = () => {
                if (classDateOnly < nowDateOnly) return true;
                if (classDateOnly > nowDateOnly) return false;
                if (!cls.time) return true;
                const classHourMinute = cls.time.split(':');
                const nowHour = nowForComparison.getHours();
                const nowMinute = nowForComparison.getMinutes();
                if (parseInt(classHourMinute[0]) < nowHour) return true;
                if (parseInt(classHourMinute[0]) === nowHour && parseInt(classHourMinute[1]) <= nowMinute) return true;
                return false;
            };
            const attendanceActionable = isPastOrTodayAfterTime();

            const isCancelled = ['cancelada_admin', 'cancelada_alumno'].includes(cls.status);

            if (isCancelled) {
                actionsDiv.innerHTML = getStatusBadgeHTML(cls.status, true);
            } else if (cls.status === 'programada') {
                const studentForClass = students.find(s => s.id === cls.studentId);
                if (studentForClass && studentForClass.status === 'activo') {
                    const attendedBtn = document.createElement('button');
                    attendedBtn.className = 'btn-success list-item-action-btn text-xs';
                    attendedBtn.textContent = 'Asistió';
                    attendedBtn.disabled = !attendanceActionable;
                    if(!attendanceActionable) attendedBtn.title = "Asistencia solo para clases de hoy (hora transcurrida) o pasadas.";
                    attendedBtn.addEventListener('click', () => {
                        if (attendedBtn.disabled) return;
                        showConfirmation(
                            'Confirmar Asistencia',
                            `¿Confirmar que ${cls.studentName} asistió a la clase de ${formatTime(cls.time)} el ${formatDate(cls.date)}?`,
                            () => markClassStatusFromCalendar(cls.studentId, cls.packageId, cls.classId, 'realizada')
                        );
                    });
                    actionsDiv.appendChild(attendedBtn);

                    const notAttendedBtn = document.createElement('button');
                    notAttendedBtn.className = 'btn-danger list-item-action-btn text-xs';
                    notAttendedBtn.textContent = 'No Asistió';
                    notAttendedBtn.disabled = !attendanceActionable;
                     if(!attendanceActionable) notAttendedBtn.title = "Inasistencia solo para clases de hoy (hora transcurrida) o pasadas.";
                    notAttendedBtn.addEventListener('click', () => {
                        if (notAttendedBtn.disabled) return;
                        showConfirmation(
                            'Confirmar Inasistencia',
                            `¿Confirmar que ${cls.studentName} NO asistió a la clase de ${formatTime(cls.time)} el ${formatDate(cls.date)}?`,
                            () => markClassStatusFromCalendar(cls.studentId, cls.packageId, cls.classId, 'no_asistio')
                        );
                    });
                    actionsDiv.appendChild(notAttendedBtn);

                    const cancelButton = document.createElement('button');
                    cancelButton.className = 'btn-secondary list-item-action-btn text-xs';
                    cancelButton.textContent = 'Cancelar';
                    cancelButton.addEventListener('click', () => {
                        showConfirmation(
                            'Confirmar Cancelación',
                            `¿Estás seguro de que quieres cancelar la clase de ${cls.studentName} a las ${formatTime(cls.time)} el ${formatDate(cls.date)}? Esta acción cambiará el estado a "Cancelada (Admin)".`,
                            () => { handleCalendarCancelClass(cls.studentId, cls.packageId, cls.classId); }
                        );
                    });
                    actionsDiv.appendChild(cancelButton);
                } else {
                    actionsDiv.innerHTML = `<span class="text-xs text-gray-500 italic">Alumno no activo</span>`;
                }
            } else {
                actionsDiv.innerHTML = getStatusBadgeHTML(cls.status, true);
            }

            studentLi.appendChild(actionsDiv);
            studentListUl.appendChild(studentLi);
        });
        timeBlock.appendChild(studentListUl);
        dailyClassesListContainer.appendChild(timeBlock);
    });
}

function renderScheduledClassesForStudent(stud) {
    scheduledClassesList.innerHTML = '';
    let allClassesFromPackages = [];
    if (stud && stud.packages) {
        stud.packages.forEach(pkg => {
            if(pkg.scheduledClasses) {
                pkg.scheduledClasses.forEach(c => {
                    allClassesFromPackages.push({ ...c, studentPackageId: pkg.studentPackageId, packageNameSnapshot: pkg.packageNameSnapshot });
                });
            }
        });
    }

    const todayStr = getTodayDateString();
    let filteredClasses = [];

    if (adminStudentClassesFilter === 'programadas') {
        filteredClasses = allClassesFromPackages.filter(c => c.status === 'programada' && c.date >= todayStr);
    } else {
        filteredClasses = allClassesFromPackages.filter(c => c.status !== 'programada' || (c.status === 'programada' && c.date < todayStr));
    }

    filteredClasses.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
        const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
        return adminStudentClassesFilter === 'programadas' ? dateA - dateB : dateB - dateA;
    });


    if (filteredClasses.length === 0) {
        let message = adminStudentClassesFilter === 'programadas' ? 'No hay clases programadas para el futuro.' : 'No hay historial de clases.';
        scheduledClassesList.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-gray-500">${message}</td></tr>`;
        return;
    }

    filteredClasses.forEach(c => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        let actionsHTML = '';

        const isNonEditableStatus = ['cancelada_admin', 'cancelada_alumno', 'realizada', 'no_asistio'].includes(c.status);

        if (isNonEditableStatus || (adminStudentClassesFilter === 'historial' && c.status !== 'programada') ) {
            actionsHTML = '---';
        } else if (c.status === 'programada') {
            if (stud.status === 'activo' && loggedInUserType === 'admin') {
                 actionsHTML = `<button data-class-id="${c.classId}" data-package-id="${c.studentPackageId}" class="edit-class-btn text-yellow-600 hover:text-yellow-800 text-sm mr-2 list-item-action-btn">Editar</button>`;
            } else if (stud.status !== 'activo' && loggedInUserType === 'admin') {
                actionsHTML = `<span class="text-xs text-gray-500 italic">Alumno no activo</span>`;
            } else { actionsHTML = '---'; }
        } else {
             actionsHTML = '---';
        }

        tr.innerHTML = `
            <td>${formatDateTime(c.date, c.time)}</td>
            <td>${c.packageNameSnapshot || 'N/A'}</td>
            <td>${getStatusBadgeHTML(c.status, true)}</td>
            <td>${actionsHTML}</td>
        `;
        scheduledClassesList.appendChild(tr);
    });
    scheduledClassesList.querySelectorAll('.edit-class-btn').forEach(b => b.addEventListener('click', e => openEditClassModal(e.target.dataset.classId, e.target.dataset.packageId)));
}

function renderPackageHistory(pkgs, studentIdForExtension) {
    packageHistoryList.innerHTML = '';
    if (!pkgs || pkgs.length === 0) {
        packageHistoryList.innerHTML = '<li class="p-3 bg-gray-50 text-center text-gray-500">No hay historial de paquetes.</li>';
        return;
    }
    [...pkgs].sort((a, b) => new Date(b.assignmentDate) - new Date(a.assignmentDate)).forEach(p => {
        const pName = p.packageNameSnapshot || "Paquete Desconocido";
        const li = document.createElement('li');
        li.className = `p-4 rounded-md ${p.status === 'active' ? 'bg-blue-50 border-blue-200' : (p.status === 'pending_first_class' ? 'bg-yellow-50 border-yellow-200' : (p.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200'))}`;

        let statusDisplay = `Estado: <span class="font-semibold">${getPackageStatusText(p.status)}</span>`;
        if (p.activationDate) {
            statusDisplay += ` (Activado: ${formatDate(p.activationDate)})`;
        }
        if (p.expiryDate) {
            statusDisplay += ` (Expira: ${formatDate(p.expiryDate)})`;
        }
        const consumedClassesCount = p.scheduledClasses ? p.scheduledClasses.filter(c => c.status === 'realizada' || c.status === 'no_asistio').length : 0;

        let extendButtonHTML = '';
        if (loggedInUserType === 'admin' && p.status !== 'completed' && p.activationDate && p.expiryDate) {
            extendButtonHTML = `<button data-package-id="${p.studentPackageId}" data-student-id="${studentIdForExtension}" class="extend-package-expiry-btn btn-warning-soft list-item-action-btn text-xs mt-2">Extender Vigencia</button>`;
        }

        li.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-700">${pName}</span>
                <span class="text-sm ${p.status === 'active' ? 'text-green-600' : (p.status === 'pending_first_class' ? 'text-yellow-600' : (p.status === 'completed' ? 'text-emerald-600' : 'text-gray-500'))}">${getPackageStatusText(p.status)}</span>
            </div>
            <p class="text-sm">Asignado: ${formatDate(p.assignmentDate)}</p>
            <p class="text-sm">Clases consumidas: ${consumedClassesCount}/${p.totalClasses}</p>
            <p class="text-sm">Clases restantes para agendar: ${p.classesRemaining}</p>
            <p class="text-sm">${statusDisplay}</p>
            ${extendButtonHTML}`;
        packageHistoryList.appendChild(li);
    });

    packageHistoryList.querySelectorAll('.extend-package-expiry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packageId = e.target.dataset.packageId;
            const studentId = e.target.dataset.studentId;
            openExtendPackageExpiryModal(studentId, packageId);
        });
    });
}

function renderStudentPortalView() {
    if (loggedInUserType !== 'student' || !loggedInStudentId) {
        studentPortalContent.classList.add('hidden');
        studentPortalMessageContainer.innerHTML = '<h2 class="text-2xl font-semibold text-red-700 mb-4">Acceso Denegado</h2><p class="text-xl text-gray-500">Debes iniciar sesión como estudiante para ver esta página.</p>';
        studentPortalMessageContainer.classList.remove('hidden');
        return;
    }
    const student = students.find(s => s.id === loggedInStudentId);
    if (!student) {
        studentPortalContent.classList.add('hidden');
        studentPortalMessageContainer.innerHTML = '<h2 class="text-2xl font-semibold text-red-700 mb-4">Error de Cuenta</h2><p class="text-xl text-gray-500">No se encontró tu información. Contacta al soporte.</p>';
        studentPortalMessageContainer.classList.remove('hidden');
        return;
    }

    studentPortalMessageContainer.classList.add('hidden');
    studentPortalContent.classList.remove('hidden');

    portalStudentName.textContent = student.name;

    const usablePackages = getActiveAndValidPackages(student);
    const totalClassesRemToSchedule = getTotalRemainingClassesInActiveValidPackages(student);

    if (student.packages && student.packages.length > 0) {
        let packageInfoHTML = `<p class="text-lg font-medium">Tus Paquetes (${student.packages.length})</p>`;
        packageInfoHTML += `<p>Clases Disponibles para Agendar (en paquetes usables): <span class="font-semibold">${totalClassesRemToSchedule}</span></p>`;

         const sortedPackagesForDisplay = [...student.packages].sort((a,b) => {
            const aIsUsable = usablePackages.includes(a);
            const bIsUsable = usablePackages.includes(b);
            if (aIsUsable && !bIsUsable) return -1;
            if (!aIsUsable && bIsUsable) return 1;
            return new Date(b.assignmentDate) - new Date(a.assignmentDate);
        });

        sortedPackagesForDisplay.forEach(pkg => {
            let statusText = '';
            const consumedClassesCount = pkg.scheduledClasses.filter(c => c.status === 'realizada' || c.status === 'no_asistio').length;

             if (pkg.status === 'pending_first_class') {
                statusText = 'Pendiente de activación (primera clase).';
            } else if (pkg.status === 'active') {
                statusText = `Activo desde ${formatDate(pkg.activationDate || 'N/A')}, Válido hasta: ${formatDate(pkg.expiryDate || 'N/A')}`;
                 if (pkg.expiryDate && getTodayDateString() > pkg.expiryDate) statusText += ` <span class="text-red-600 font-semibold">(Expirado)</span>`;
            } else {
                 statusText = `Estado: ${getPackageStatusText(pkg.status)}`;
                 if (pkg.activationDate) statusText += ` (Activado: ${formatDate(pkg.activationDate)})`;
                 if (pkg.expiryDate) statusText += ` (Expiró: ${formatDate(pkg.expiryDate)})`;
            }

            packageInfoHTML += `
                <div class="mt-2 pt-2 border-t border-blue-300">
                    <p class="font-medium text-blue-700">${pkg.packageNameSnapshot}</p>
                    <p>Clases consumidas: ${consumedClassesCount} / ${pkg.totalClasses}</p>
                    <p>Clases restantes para agendar: <span class="font-semibold">${pkg.classesRemaining}</span></p>
                    <p>${statusText}</p>
                </div>`;
        });
        portalCurrentPackageInfo.innerHTML = packageInfoHTML;
    } else {
        portalCurrentPackageInfo.innerHTML = '<p class="text-gray-600">No tienes paquetes asignados.</p>';
    }

    const canSchedule = student.status === 'activo' && totalClassesRemToSchedule > 0;
    portalScheduleClassSection.classList.toggle('hidden', !canSchedule);
    portalScheduleClassError.textContent = '';
    if (!canSchedule) {
        if (student.status !== 'activo') {
            portalScheduleClassError.textContent = 'Tu cuenta no está activa para agendar clases.';
        } else if (totalClassesRemToSchedule <= 0) {
            portalScheduleClassError.textContent = 'No tienes clases disponibles para agendar en tus paquetes.';
        }
    }
    renderPortalScheduledClassesForStudent(student);
}

function renderPortalScheduledClassesForStudent(student) {
    portalScheduledClassesList.innerHTML = '';
    let allClassesFromPackages = [];
    if (student && student.packages) {
        student.packages.forEach(pkg => {
            if(pkg.scheduledClasses) {
                pkg.scheduledClasses.forEach(c => {
                    allClassesFromPackages.push({ ...c, studentPackageId: pkg.studentPackageId, packageNameSnapshot: pkg.packageNameSnapshot });
                });
            }
        });
    }

    const todayStr = getTodayDateString();
    let filteredClasses = [];

    if (portalStudentClassesFilter === 'programadas') {
        filteredClasses = allClassesFromPackages.filter(c => c.status === 'programada' && c.date >= todayStr);
    } else {
        filteredClasses = allClassesFromPackages.filter(c => c.status !== 'programada' || (c.status === 'programada' && c.date < todayStr));
    }

    filteredClasses.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
        const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
        return portalStudentClassesFilter === 'programadas' ? dateA - dateB : dateB - dateA;
    });


    if (filteredClasses.length === 0) {
        let message = portalStudentClassesFilter === 'programadas' ? 'No tienes clases programadas para el futuro.' : 'No tienes historial de clases.';
        portalScheduledClassesList.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-gray-500">${message}</td></tr>`;
        return;
    }

    filteredClasses.forEach(c => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        let actionButtonsHTML = '';

        const relevantPackage = student.packages.find(p => p.studentPackageId === c.studentPackageId);

        if (portalStudentClassesFilter === 'programadas' && c.status === 'programada') {
            const packageIsEffectivelyActive = relevantPackage &&
                                            relevantPackage.status !== 'expired' &&
                                            (!relevantPackage.expiryDate || relevantPackage.expiryDate >= todayStr);

            if (student.status === 'activo' && packageIsEffectivelyActive) {
                const classDateTime = new Date(`${c.date}T${c.time || '00:00'}`);
                const now = new Date();
                const timeDifferenceMs = classDateTime.getTime() - now.getTime();
                const minTimeMs = MIN_HOURS_BEFORE_CLASS_MODIFICATION * 60 * 60 * 1000;
                const canModifyDueToTime = timeDifferenceMs >= minTimeMs;

                const editButtonDisabled = canModifyDueToTime ? '' : `disabled title="No se puede editar menos de ${MIN_HOURS_BEFORE_CLASS_MODIFICATION}h antes"`;
                const cancelButtonDisabled = canModifyDueToTime ? '' : `disabled title="No se puede cancelar menos de ${MIN_HOURS_BEFORE_CLASS_MODIFICATION}h antes"`;

                actionButtonsHTML = `
                    <button data-class-id="${c.classId}" data-package-id="${c.studentPackageId}" class="edit-portal-class-btn btn-secondary list-item-action-btn text-xs mr-1" ${editButtonDisabled}>Editar</button>
                    <button data-class-id="${c.classId}" data-package-id="${c.studentPackageId}" class="cancel-portal-class-btn btn-danger list-item-action-btn text-xs" ${cancelButtonDisabled}>Cancelar</button>`;
                if (!canModifyDueToTime) {
                    actionButtonsHTML += `<p class="text-xs text-gray-500 italic mt-1">Modificación no permitida (menos de ${MIN_HOURS_BEFORE_CLASS_MODIFICATION}h).</p>`;
                }
            } else {
                let reason = "(Paquete/estado no permite acción)";
                if (student.status !== 'activo') reason = "(Alumno no activo)";
                else if (!packageIsEffectivelyActive && relevantPackage && relevantPackage.status === 'expired') reason = "(Paquete expirado)";
                else if (!packageIsEffectivelyActive && relevantPackage && relevantPackage.expiryDate && relevantPackage.expiryDate < todayStr) reason = "(Paquete expirado)";

                actionButtonsHTML = `--- <em class="text-xs text-gray-400">${reason}</em>`;
            }
        } else {
            actionButtonsHTML = '---';
        }

        tr.innerHTML = `
            <td>${formatDateTime(c.date, c.time)}</td>
            <td>${c.packageNameSnapshot || 'N/A'}</td>
            <td>${getStatusBadgeHTML(c.status, false)}</td>
            <td>${actionButtonsHTML}</td>
        `;
        portalScheduledClassesList.appendChild(tr);
    });

    portalScheduledClassesList.querySelectorAll('.cancel-portal-class-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const classId = e.target.dataset.classId;
            const packageId = e.target.dataset.packageId;
            showConfirmation('Confirmar Cancelación', '¿Estás seguro de que quieres cancelar esta clase? Se marcará como cancelada por ti.', () => {
                handlePortalCancelClass(classId, packageId);
            });
        });
    });
    portalScheduledClassesList.querySelectorAll('.edit-portal-class-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const classId = e.target.dataset.classId;
            const packageId = e.target.dataset.packageId;
            openPortalEditClassModal(classId, packageId);
        });
    });
}

function renderStudentDetails(stud) {
    if (!stud || loggedInUserType !== 'admin') {
        studentDetailView.classList.add('hidden');
        noStudentSelectedViewInAlumnosView.classList.remove('hidden');
        return;
    }
    studentDetailView.classList.remove('hidden');
    noStudentSelectedViewInAlumnosView.classList.add('hidden');

    updateStudentDetailStatusButtonsVisual(stud.status || 'activo');
    selectedStudentName.textContent = stud.name;
    selectedStudentEmail.textContent = stud.email || 'N/E';
    selectedStudentUsername.textContent = stud.username || 'No asignado';


    const usablePackages = getActiveAndValidPackages(stud);
    const totalClassesRemToSchedule = getTotalRemainingClassesInActiveValidPackages(stud);

    if (stud.packages && stud.packages.length > 0) {
        let packageInfoHTML = `<p class="text-lg font-medium">Paquetes Asignados (${stud.packages.length})</p>`;
        packageInfoHTML += `<p>Clases Disponibles para Agendar (en paquetes usables): <span class="font-semibold">${totalClassesRemToSchedule}</span></p>`;

        const sortedPackagesForDisplay = [...stud.packages].sort((a,b) => {
            const aIsUsable = usablePackages.includes(a);
            const bIsUsable = usablePackages.includes(b);
            if (aIsUsable && !bIsUsable) return -1;
            if (!aIsUsable && bIsUsable) return 1;
            return new Date(b.assignmentDate) - new Date(a.assignmentDate);
        });

        sortedPackagesForDisplay.forEach(pkg => {
            let statTxt = '';
            const consumedClassesCount = pkg.scheduledClasses.filter(c => c.status === 'realizada' || c.status === 'no_asistio').length;

            if (pkg.status === 'pending_first_class') {
                statTxt = 'Pendiente de activación (primera clase).';
            } else if (pkg.status === 'active') {
                statTxt = `Activo desde ${formatDate(pkg.activationDate || 'N/A')}, Válido hasta: ${formatDate(pkg.expiryDate || 'N/A')}`;
                 if (pkg.expiryDate && getTodayDateString() > pkg.expiryDate) {
                     statTxt += ` <span class="text-red-600 font-semibold">(Expirado)</span>`;
                 }
            } else {
                statTxt = `Estado: ${getPackageStatusText(pkg.status)}`;
                if (pkg.activationDate) statTxt += ` (Activado: ${formatDate(pkg.activationDate)})`;
                if (pkg.expiryDate) statTxt += ` (Expiró: ${formatDate(pkg.expiryDate)})`;
            }

            packageInfoHTML += `
                <div class="mt-2 pt-2 border-t border-blue-300">
                    <p class="font-medium text-blue-700">${pkg.packageNameSnapshot}</p>
                    <p>Clases consumidas: ${consumedClassesCount} / ${pkg.totalClasses}</p>
                    <p>Clases restantes para agendar: <span class="font-semibold">${pkg.classesRemaining}</span></p>
                    <p>${statTxt}</p>
                </div>`;
        });
        currentPackageInfo.innerHTML = packageInfoHTML;
        assignNewPackageBtn.textContent = "Asignar Otro Paquete";
    } else {
        currentPackageInfo.innerHTML = '<p class="text-gray-600">No hay paquetes asignados.</p>';
        assignNewPackageBtn.textContent = "Asignar Paquete";
    }

    if (stud.status === 'activo' && totalClassesRemToSchedule > 0) {
        scheduleClassSection.classList.remove('hidden');
    } else {
        scheduleClassSection.classList.add('hidden');
    }
    renderScheduledClassesForStudent(stud);
    renderPackageHistory(stud.packages, stud.id);
}
// --- END MOVED RENDER FUNCTIONS ---


// --- INIT APP ---
async function initApp() {
    await loadDataFromFirestore();

    const loggedInUserDataString = localStorage.getItem(CURRENT_LOGGED_IN_USER_KEY);
    if (loggedInUserDataString) {
        try {
            const userData = JSON.parse(loggedInUserDataString);
            if (userData.type === 'admin') {
                loggedInUserType = 'admin';
            } else if (userData.type === 'student' && userData.id) {
                const studentExists = students.find(s => s.id === userData.id);
                if (studentExists) {
                    loggedInUserType = 'student';
                    loggedInStudentId = userData.id;
                    selectedStudentId = userData.id;
                } else {
                    localStorage.removeItem(CURRENT_LOGGED_IN_USER_KEY);
                }
            }
        } catch (e) {
            console.error("Error al parsear datos de usuario logueado:", e);
            localStorage.removeItem(CURRENT_LOGGED_IN_USER_KEY);
        }
    }

    if (loggedInUserType) {
        await initializeAppUI();
    } else {
        appContainer.style.display = 'none';
        loginView.style.display = 'flex';
        [navAlumnosTab, navPackageTypesTab, navCalendarTab, navStudentPortalTab].forEach(tab => tab.classList.add('hidden-tab'));
    }

    const headerElement = document.querySelector('header');
    const tabNavContainerElement = document.querySelector('.tab-navigation-container');
    if (headerElement && tabNavContainerElement) {
         const headerHeight = headerElement.offsetHeight;
         tabNavContainerElement.style.top = `${headerHeight}px`;
    }

    loginForm.addEventListener('submit', handleLogin);
    populatePackageTypeSelect();
    // calendarSelectedDateStr = getTodayDateString(); // Already initialized globally
    if (loggedInUserType === 'admin') {
        // currentStudentListFilter = 'activo'; // Already initialized globally
        updateStudentListFilterButtonsVisual();
    }


    adminStudentClassesFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (loggedInUserType !== 'admin' || !selectedStudentId) return;
            adminStudentClassesFilter = e.target.dataset.filter;
            updateAdminStudentClassesFilterVisual();
            const stud = students.find(s => s.id === selectedStudentId);
            if (stud) renderScheduledClassesForStudent(stud);
        });
    });

    portalStudentClassesFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (loggedInUserType !== 'student' || !loggedInStudentId) return;
            portalStudentClassesFilter = e.target.dataset.filter;
            updatePortalStudentClassesFilterVisual();
            const student = students.find(s => s.id === loggedInStudentId);
            if (student) renderPortalScheduledClassesForStudent(student);
        });
    });

     editStudentBtnInDetail.addEventListener('click', () => {
        if (selectedStudentId && loggedInUserType === 'admin') {
            const studentToEdit = students.find(s => s.id === selectedStudentId);
            if (studentToEdit) {
                openEditStudentModal(studentToEdit);
            } else {
                showMessage('Error', 'No se pudo encontrar el alumno seleccionado para editar.');
            }
        }
    });

    modalSaveEditStudentBtn.addEventListener('click', async () => {
        const studentId = editingStudentId.value;
        const newName = modalEditStudentNameInput.value.trim();
        const newEmail = modalEditStudentEmailInput.value.trim();
        editStudentModalError.textContent = '';

        if (!newName) {
            editStudentModalError.textContent = 'El nombre del alumno es obligatorio.';
            return;
        }

        const studentIdx = students.findIndex(s => s.id === studentId);
        if (studentIdx > -1) {
            const student = students[studentIdx];
            const oldName = student.name;
            const updates = { name: newName, email: newEmail };
            try {
                await db.collection('students').doc(studentId).update(updates);
                student.name = newName;
                student.email = newEmail;

                renderStudentsList();
                if (selectedStudentId === studentId) {
                    renderStudentDetails(student);
                }
                if (oldName !== newName && currentActiveView === 'calendarView') {
                    renderFullCalendarView();
                }
                 if (oldName !== newName && currentActiveView === 'studentPortalView' && loggedInStudentId === studentId) {
                     renderStudentPortalView();
                }
                showMessage('Éxito', `Información de "${newName}" actualizada.`);
                editStudentModal.style.display = 'none';
            } catch (error) {
                console.error("Error updating student info:", error);
                editStudentModalError.textContent = 'Error al guardar los cambios.';
                showMessage('Error', 'No se pudo actualizar la información del alumno.');
            }
        } else {
            editStudentModalError.textContent = 'Error: Alumno no encontrado localmente.';
        }
    });


    modalCancelEditStudentBtn.addEventListener('click', () => {
        editStudentModal.style.display = 'none';
    });


    openCreatePackageTypeModalBtn.addEventListener('click', () => {if (loggedInUserType === 'admin') openPackageTypeModal()});
    savePackageTypeBtn.addEventListener('click', async () => {
        if (loggedInUserType !== 'admin') return;
        const id = editingPackageTypeId.value;
        const name = packageTypeNameInput.value.trim();
        const tc = parseInt(packageTypeClassesInput.value);
        const dd = parseInt(packageTypeDurationInput.value);
        packageTypeFormError.textContent = '';
        if (!name) { packageTypeFormError.textContent = 'Nombre obligatorio.'; return; }
        if (isNaN(tc) || tc <= 0) { packageTypeFormError.textContent = 'Clases: num positivo.'; return; }
        if (isNaN(dd) || dd <= 0) { packageTypeFormError.textContent = 'Duración: num positivo.'; return; }

        const packageTypeData = { name, totalClasses: tc, durationDays: dd };
        try {
            if (id) {
                await db.collection('packageTypes').doc(id).update(packageTypeData);
                const idx = packageTypes.findIndex(p => p.id === id);
                if (idx !== -1) packageTypes[idx] = { id, ...packageTypeData };
                showMessage('Éxito', `Paquete "${name}" actualizado.`);
            } else {
                const docRef = await db.collection('packageTypes').add(packageTypeData);
                packageTypes.push({ id: docRef.id, ...packageTypeData });
                showMessage('Éxito', `Paquete "${name}" creado.`);
            }
            packageTypeModal.style.display = 'none';
            renderPackageTypesManagementList();
            populatePackageTypeSelect();
            if (selectedStudentId && currentActiveView === 'alumnosView') {
                const stud = students.find(s => s.id === selectedStudentId);
                if(stud)renderStudentDetails(stud);
            }
            if (currentActiveView === 'calendarView') renderFullCalendarView();
        } catch (error) {
            console.error("Error saving package type:", error);
            packageTypeFormError.textContent = 'Error al guardar el paquete.';
            showMessage('Error', 'No se pudo guardar el tipo de paquete.');
        }
    });
    cancelPackageTypeBtn.addEventListener('click', () => packageTypeModal.style.display = 'none');

    confirmAssignPackageBtn.addEventListener('click', async () => {
        const stud=students.find(s=>s.id===selectedStudentId);if(!stud || loggedInUserType !== 'admin')return;
        const selectedPackageTypeId=packageTypeSelect.value;if(!selectedPackageTypeId){showMessage('Error','Selecciona tipo.');return;}
        const pType=packageTypes.find(pt=>pt.id===selectedPackageTypeId);if(!pType){showMessage('Error','Tipo no existe.');return;}
        const today=getTodayDateString();

        const newPackage = {
            studentPackageId:generateId(),
            packageTypeId:selectedPackageTypeId,
            packageNameSnapshot:pType.name,
            totalClasses:pType.totalClasses,
            durationDays:pType.durationDays,
            classesRemaining:pType.totalClasses,
            assignmentDate:today,
            activationDate: null,
            expiryDate: null,
            status: 'pending_first_class',
            scheduledClasses:[]
        };
        stud.packages.push(newPackage);

        try {
            await db.collection('students').doc(stud.id).update({ packages: stud.packages });
            assignPackageModal.style.display='none';renderStudentDetails(stud);showMessage('Éxito',`"${pType.name}" asignado a ${stud.name}.`); if (currentActiveView === 'calendarView') renderFullCalendarView();
        } catch (error) {
            console.error("Error assigning package:", error);
            stud.packages.pop();
            showMessage('Error', 'No se pudo asignar el paquete.');
        }
    });

    studentDetailStatusButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!selectedStudentId || loggedInUserType !== 'admin') return;
            const newStatus = e.target.dataset.statusValue;
            const student = students.find(s => s.id === selectedStudentId);
            if (student && student.status !== newStatus) {
                const currentStatusText = (student.status || 'activo').charAt(0).toUpperCase() + (student.status || 'activo').slice(1);
                const newStatusText = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
                showConfirmation(
                    `Confirmar Cambio de Estado`,
                    `¿Estás seguro de que quieres cambiar el estado de ${student.name} de "${currentStatusText}" a "${newStatusText}"?`,
                    async () => {
                        try {
                            await db.collection('students').doc(student.id).update({ status: newStatus });
                            student.status = newStatus;
                            updateStudentDetailStatusButtonsVisual(newStatus);
                            renderStudentsList();
                            showMessage('Estado Actualizado', `El estado de ${student.name} es ahora ${newStatusText}.`);
                            renderStudentDetails(student);
                            if (currentActiveView === 'calendarView') { renderFullCalendarView(); }

                        } catch (error) {
                            console.error("Error updating student status:", error);
                            showMessage('Error', 'No se pudo actualizar el estado del alumno.');
                        }
                    }
                );
            } else if (student && student.status === newStatus) {
                 showMessage('Información', `El alumno ${student.name} ya tiene el estado "${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}".`);
            }
        });
    });

    deleteStudentFromDetailBtn.addEventListener('click', () => {
        if (selectedStudentId && loggedInUserType === 'admin') {
            deleteStudent(selectedStudentId);
        }
    });

    scheduleClassBtn.addEventListener('click', async ()=>{
        const stud=students.find(s=>s.id===selectedStudentId);if(!stud || loggedInUserType !== 'admin')return;
        if (stud.status !== 'activo') { showMessage('Aviso', `El alumno ${stud.name} no está activo.`); scheduleClassError.textContent = `Alumno ${stud.status}.`; return; }
        const dStr=classDateInput.value,tStr=classTimeInput.value;
        await scheduleClassGeneric(stud, dStr, tStr, classRepeatWeeksInput, 'scheduleClassError', classDateInput, classTimeInput, true);
    });

    portalScheduleClassBtn.addEventListener('click', async () => {
        if (loggedInUserType !== 'student' || !loggedInStudentId) return;
        const student = students.find(s => s.id === loggedInStudentId);
        if (!student) { showMessage('Error', 'Error de cuenta.'); return; }
        if (student.status !== 'activo') { portalScheduleClassError.textContent = 'Tu cuenta no está activa.'; showMessage('Aviso', 'Tu cuenta no está activa.'); return; }

        const dateStr = portalClassDateInput.value;
        const timeStr = portalClassTimeInput.value;
        await scheduleClassGeneric(student, dateStr, timeStr, portalClassRepeatWeeksInput, 'portalScheduleClassError', portalClassDateInput, portalClassTimeInput, false);
    });

    saveEditClassBtn.addEventListener('click', async ()=>{
        const stud=students.find(s=>s.id===selectedStudentId);if(!stud || loggedInUserType !== 'admin'){showMessage('Error','Alumno no seleccionado.');editClassModal.style.display='none';return;}
        const pId=editingClassPackageId.value,cId=editingClassIdInput.value;
        const nDate=editClassDateInput.value,nTime=editClassTimeInput.value;
        const pkg=stud.packages.find(p=>p.studentPackageId===pId);if(!pkg){showMessage('Error','Paquete no hallado.');editClassModal.style.display='none';return;}
        const classToUpdate=pkg.scheduledClasses.find(c=>c.classId===cId);if(!classToUpdate){showMessage('Error','Clase no hallada.');editClassModal.style.display='none';return;}
        editClassError.textContent='';if(!nDate){editClassError.textContent='Selecciona fecha.';return;}if(!nTime){editClassError.textContent='Selecciona hora.';return;}

        const today=getTodayDateString();

        let packageExpiryDate = pkg.expiryDate;
        if(pkg.status === 'pending_first_class' || (pkg.status === 'active' && !pkg.activationDate) ) {
            const otherClasses = pkg.scheduledClasses.filter(cl => cl.classId !== cId && (cl.status === 'programada' || cl.status === 'realizada' || cl.status === 'no_asistio'));
            let potentialActivationDate = nDate;
            if (otherClasses.length > 0) {
                const earliestOtherDate = getEarliestScheduledClassDate(otherClasses);
                if (earliestOtherDate && new Date(earliestOtherDate) < new Date(nDate)) {
                    potentialActivationDate = earliestOtherDate;
                }
            }
            packageExpiryDate = calculateExpiryDate(potentialActivationDate, pkg.durationDays);
        }

        if (packageExpiryDate && nDate > packageExpiryDate) {
             editClassError.textContent=`La nueva fecha (${formatDate(nDate)}) excede la expiración (${formatDate(packageExpiryDate)}) del paquete ${pkg.packageNameSnapshot}.`;return;
        }


        const oldDate = classToUpdate.date;
        const oldTime = classToUpdate.time;
        classToUpdate.date=nDate;classToUpdate.time=nTime;
        updatePackageStatusAndDates(stud, pId, false);

        try {
            await db.collection('students').doc(stud.id).update({ packages: stud.packages });
            renderStudentDetails(stud);editClassModal.style.display='none';
            let successMessage = `Clase actualizada a ${formatDateTime(nDate,nTime)}.`;
            if (loggedInUserType === 'admin' && nDate < today) {
                successMessage += " (Nota: La clase fue actualizada a una fecha pasada.)";
            }
            showMessage('Éxito', successMessage);
            if (currentActiveView === 'calendarView' || oldDate !==nDate || oldTime !== nTime) renderFullCalendarView();
        } catch (error) {
            console.error("Error saving edited class:", error);
            classToUpdate.date = oldDate;
            classToUpdate.time = oldTime;
            updatePackageStatusAndDates(stud,pId, false);
            editClassError.textContent = "Error al guardar cambios en la clase.";
            showMessage('Error', 'No se pudieron guardar los cambios de la clase.');
        }
    });

    confirmExtendPackageExpiryBtn.addEventListener('click', async () => {
        const studentId = extendingPackageStudentId.value;
        const packageId = extendingPackageIdForStudent.value;
        const daysToAdd = parseInt(extendDaysInput.value);

        extendPackageExpiryError.textContent = '';
        if (isNaN(daysToAdd) || daysToAdd <= 0) {
            extendPackageExpiryError.textContent = 'Por favor, ingrese un número válido de días para extender.';
            return;
        }

        const student = students.find(s => s.id === studentId);
        if (!student) { showMessage('Error', 'Alumno no encontrado.'); extendPackageExpiryModal.style.display = 'none'; return; }
        const pkg = student.packages.find(p => p.studentPackageId === packageId);
        if (!pkg) { showMessage('Error', 'Paquete no encontrado.'); extendPackageExpiryModal.style.display = 'none'; return; }
        if (!pkg.expiryDate) {
            showMessage('Error', 'El paquete no tiene una fecha de expiración actual para extender.'); extendPackageExpiryModal.style.display = 'none'; return;
        }

        const currentExpiryDateObj = new Date(pkg.expiryDate + 'T00:00:00Z');
        currentExpiryDateObj.setUTCDate(currentExpiryDateObj.getUTCDate() + daysToAdd);
        const oldExpiry = pkg.expiryDate;
        pkg.expiryDate = dateToYYYYMMDD(currentExpiryDateObj);

        updatePackageStatusAndDates(student, packageId, false);

        try {
            await db.collection('students').doc(student.id).update({ packages: student.packages });
            renderStudentDetails(student);
            extendPackageExpiryModal.style.display = 'none';
            showMessage('Éxito', `La vigencia del paquete "${pkg.packageNameSnapshot}" ha sido extendida a ${formatDate(pkg.expiryDate)}.`);
             if (currentActiveView === 'calendarView') renderFullCalendarView();
        } catch(error) {
            console.error("Error extending package expiry:", error);
            pkg.expiryDate = oldExpiry;
            updatePackageStatusAndDates(student, packageId, false);
            extendPackageExpiryError.textContent = "Error al guardar la extensión.";
            showMessage('Error', 'No se pudo extender la vigencia del paquete.');
        }
    });

    portalSaveEditClassBtn.addEventListener('click', async () => {
        if (loggedInUserType !== 'student' || !loggedInStudentId) return;
        const student = students.find(s => s.id === loggedInStudentId);
        if (!student) { showMessage('Error', 'Error de cuenta.'); portalEditClassModal.style.display = 'none'; return; }

        const classId = portalEditingClassId.value;
        const packageId = portalEditingClassPackageId.value;
        const newDate = portalEditClassDateInput.value;
        const newTime = portalEditClassTimeInput.value;

        portalEditClassError.textContent = '';
        if (!newDate) { portalEditClassError.textContent = 'Por favor, selecciona una nueva fecha.'; return; }
        if (!newTime) { portalEditClassError.textContent = 'Por favor, selecciona una nueva hora.'; return; }

        const pkg = student.packages.find(p => p.studentPackageId === packageId);
        if (!pkg) { showMessage('Error', 'Paquete no encontrado.'); portalEditClassModal.style.display = 'none'; return; }
        const classToUpdate = pkg.scheduledClasses.find(c => c.classId === classId);
        if (!classToUpdate) { showMessage('Error', 'Clase no encontrada.'); portalEditClassModal.style.display = 'none'; return; }

        const originalClassDateTime = new Date(`${classToUpdate.date}T${classToUpdate.time || '00:00'}`);
        const now = new Date();
        if ((originalClassDateTime.getTime() - now.getTime()) < (MIN_HOURS_BEFORE_CLASS_MODIFICATION * 60 * 60 * 1000)) {
            portalEditClassError.textContent = `No se puede modificar, muy cerca de la hora original.`;
            showMessage('No permitido', `La clase original está muy próxima (${MIN_HOURS_BEFORE_CLASS_MODIFICATION}h) para ser modificada.`);
            return;
        }

        const today = getTodayDateString();
        if (newDate < today) {
            portalEditClassError.textContent = 'La nueva fecha no puede ser en el pasado.';
            return;
        }

        let packageExpiryDate = pkg.expiryDate;
        if(pkg.status === 'pending_first_class' || (pkg.status === 'active' && !pkg.activationDate)) {
            const otherActivatableClasses = pkg.scheduledClasses.filter(cl => cl.classId !== classId && (cl.status === 'programada' || cl.status === 'realizada' || cl.status === 'no_asistio'));
            let potentialActivationBase = newDate;
            if(otherActivatableClasses.length > 0){
                const earliestExisting = getEarliestScheduledClassDate(otherActivatableClasses);
                if(earliestExisting && new Date(earliestExisting) < new Date(newDate)){
                     potentialActivationBase = earliestExisting;
                }
            }
            packageExpiryDate = calculateExpiryDate(potentialActivationBase, pkg.durationDays);
        }

        if (packageExpiryDate && newDate > packageExpiryDate) {
             portalEditClassError.textContent = `La nueva fecha no puede exceder la fecha de expiración de tu paquete (${formatDate(packageExpiryDate)}).`;
             return;
        }

        const oldDate = classToUpdate.date;
        const oldTime = classToUpdate.time;
        classToUpdate.date = newDate; classToUpdate.time = newTime;
        updatePackageStatusAndDates(student, packageId, false);

        try {
            await db.collection('students').doc(student.id).update({ packages: student.packages });
            renderStudentPortalView();
            portalEditClassModal.style.display = 'none';
            showMessage('Éxito', `Tu clase ha sido actualizada para ${formatDateTime(newDate, newTime)}.`);
        } catch (error) {
            console.error("Error saving portal edited class:", error);
            classToUpdate.date = oldDate;
            classToUpdate.time = oldTime;
            updatePackageStatusAndDates(student, packageId, false);
            portalEditClassError.textContent = "Error al guardar los cambios.";
            showMessage('Error', 'No se pudieron guardar los cambios de tu clase.');
        }
    });

    openAddStudentModalBtn.addEventListener('click', () => {
        if (loggedInUserType !== 'admin') return;
        modalStudentNameInput.value = '';
        modalStudentEmailInput.value = '';
        addStudentModalError.textContent = '';
        addStudentModal.style.display = 'flex';
        modalStudentNameInput.focus();
    });
    modalCancelAddStudentBtn.addEventListener('click', () => { addStudentModal.style.display = 'none'; });
    studentSearchInput.addEventListener('input', () => { if (loggedInUserType === 'admin') renderStudentsList(); });

    extendDaysInput.addEventListener('input', () => {
        const studentId = extendingPackageStudentId.value;
        const packageId = extendingPackageIdForStudent.value;
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        const pkg = student.packages.find(p => p.studentPackageId === packageId);
        if (!pkg || !pkg.expiryDate) { extendModalNewExpiryPreview.textContent = 'N/A'; return; }

        const daysToAdd = parseInt(extendDaysInput.value);
        if (isNaN(daysToAdd) || daysToAdd <= 0) {
            extendModalNewExpiryPreview.textContent = formatDate(pkg.expiryDate);
            return;
        }

        const currentExpiryObj = new Date(pkg.expiryDate + 'T00:00:00Z');
        currentExpiryObj.setUTCDate(currentExpiryObj.getUTCDate() + daysToAdd);
        extendModalNewExpiryPreview.textContent = formatDate(dateToYYYYMMDD(currentExpiryObj));
    });
    cancelExtendPackageExpiryBtn.addEventListener('click', () => {
        extendPackageExpiryModal.style.display = 'none';
    });

    navAlumnos.addEventListener('click', () => setActiveView('alumnosView'));
    navPackageTypes.addEventListener('click', () => setActiveView('packageTypesView'));
    navCalendar.addEventListener('click', () => setActiveView('calendarView'));
    navStudentPortal.addEventListener('click', () => setActiveView('studentPortalView'));
    portalCancelEditClassBtn.addEventListener('click', () => { portalEditClassModal.style.display = 'none'; });
    cancelAssignPackageBtn.addEventListener('click',()=>assignPackageModal.style.display='none');
    cancelEditClassBtn.addEventListener('click',()=>editClassModal.style.display='none');
    messageModalOkBtn.addEventListener('click',() => messageModal.style.display='none');
    confirmationModalCancelBtn.addEventListener('click', () => { confirmationModal.style.display = 'none'; currentOnConfirmCallback = null; });
    confirmationModalConfirmBtn.addEventListener('click', () => { if (typeof currentOnConfirmCallback === 'function') currentOnConfirmCallback(); confirmationModal.style.display = 'none'; currentOnConfirmCallback = null; });
    prevMonthBtn.addEventListener('click', () => { if (loggedInUserType !== 'admin') return; calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1); renderFullCalendarView(); });
    nextMonthBtn.addEventListener('click', () => { if (loggedInUserType !== 'admin') return; calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1); renderFullCalendarView(); });
}


// --- HELPER & UTILITY FUNCTIONS (Most should already be global) ---
function generateUniqueUsername(name) { const baseUsername = name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, ''); let username; let attempts = 0; do { const randomSuffix = Math.floor(1000 + Math.random() * 9000); username = `${baseUsername}_${randomSuffix}`; attempts++; } while (students.some(s => s.username === username) && attempts < 100); if (students.some(s => s.username === username)) { return `${baseUsername}_${Date.now().toString().slice(-6)}`; } return username; }
modalAddStudentBtn.addEventListener('click', async () => {
    const name = modalStudentNameInput.value.trim();
    const email = modalStudentEmailInput.value.trim();
    addStudentModalError.textContent = '';
    if (name) {
        const username = generateUniqueUsername(name);
        const password = username;
        const newStudentData = { name, email, username, password, status: 'activo', packages: [] };
        try {
            const docRef = await db.collection('students').add(newStudentData);
            students.push({ id: docRef.id, ...newStudentData });
            if (currentStudentListFilter === 'todos' || currentStudentListFilter === 'activo') {
                renderStudentsList();
            }
            showMessage('Éxito', `Alumno "${name}" agregado. Usuario: ${username}`);
            addStudentModal.style.display = 'none';
            if (currentActiveView === 'calendarView' && loggedInUserType === 'admin') renderFullCalendarView();
        } catch (error) {
            console.error("Error adding student: ", error);
            addStudentModalError.textContent = 'Error al guardar el alumno.';
            showMessage('Error', 'No se pudo agregar el alumno a la base de datos.');
        }
    } else {
        addStudentModalError.textContent = 'El nombre del alumno es obligatorio.';
    }
});

function getEarliestScheduledClassDate(scheduledClasses) {
    if (!scheduledClasses || scheduledClasses.length === 0) return null;
    const activatableClasses = scheduledClasses.filter(c =>
        c.status === 'programada' || c.status === 'realizada' || c.status === 'no_asistio'
    );
    if (activatableClasses.length === 0) return null;

    return activatableClasses.reduce((earliest, current) => {
        return new Date(current.date) < new Date(earliest.date) ? current : earliest;
    }).date;
}

function updatePackageStatusAndDates(studentOrId, packageId, saveToFirestore = true) {
    const student = typeof studentOrId === 'string' ? students.find(s => s.id === studentOrId) : studentOrId;
    if (!student) return;
    const pkg = student.packages.find(p => p.studentPackageId === packageId);
    if (!pkg) return;

    const today = getTodayDateString();

    const bookedSlots = pkg.scheduledClasses.filter(c =>
        c.status !== 'cancelada_admin' && c.status !== 'cancelada_alumno'
    ).length;
    pkg.classesRemaining = pkg.totalClasses - bookedSlots;


    const earliestClassDateUsedOrScheduled = getEarliestScheduledClassDate(pkg.scheduledClasses);

    if (!earliestClassDateUsedOrScheduled) {
        pkg.activationDate = null;
        pkg.expiryDate = null;
        pkg.status = 'pending_first_class';
    } else {
        if (!pkg.activationDate || new Date(earliestClassDateUsedOrScheduled) < new Date(pkg.activationDate)) {
            pkg.activationDate = earliestClassDateUsedOrScheduled;
        }
        if (pkg.activationDate) {
             pkg.expiryDate = calculateExpiryDate(pkg.activationDate, pkg.durationDays);
        } else {
            pkg.expiryDate = null;
        }

        if (pkg.status === 'pending_first_class') {
            pkg.status = 'active';
        }
    }

    if (pkg.status !== 'pending_first_class') {
        if (bookedSlots >= pkg.totalClasses && pkg.status !== 'expired') {
            pkg.status = 'completed';
        } else if (pkg.expiryDate && today > pkg.expiryDate) {
            if (pkg.status !== 'completed') {
               pkg.status = 'expired';
            }
        }
    }


    if (saveToFirestore && student.id) {
         db.collection('students').doc(student.id).update({ packages: student.packages })
            .catch(err => {
                console.error("Error updating package status in Firestore:", err);
                showMessage("Error de Guardado", "No se pudo actualizar el estado del paquete en la base de datos.");
            });
    }
}

function getActiveAndValidPackages(student) {
    if (!student || !student.packages) return [];
    const today = getTodayDateString();
    return student.packages.filter(p =>
        (p.status === 'active' && p.expiryDate && today <= p.expiryDate) ||
        p.status === 'pending_first_class'
    ).sort((a,b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        if (a.status === 'pending_first_class' && b.status !== 'pending_first_class') return -1;
        if (a.status !== 'pending_first_class' && b.status === 'pending_first_class') return 1;
        if (a.status === 'active' && b.status === 'active') {
            return (a.expiryDate && b.expiryDate) ? (new Date(a.expiryDate) - new Date(b.expiryDate)) : 0;
        }
        return new Date(a.assignmentDate) - new Date(b.assignmentDate);
    });
}

function getTotalRemainingClassesInActiveValidPackages(student) {
    const usablePackages = getActiveAndValidPackages(student);
    return usablePackages.reduce((sum, pkg) => sum + pkg.classesRemaining, 0);
}

function getPackageForClassConsumption(student, classDateToSchedule) {
    if (!student || !student.packages) return null;

    const suitablePackages = student.packages.filter(p => {
        if (p.classesRemaining <= 0) return false;
        if (p.status === 'completed' || p.status === 'expired') return false;

        if (p.status === 'active') {
            return p.activationDate && p.expiryDate &&
                   classDateToSchedule >= p.activationDate &&
                   classDateToSchedule <= p.expiryDate;
        }

        if (p.status === 'pending_first_class') {
            const tempActivationDate = classDateToSchedule;
            const tempExpiryDate = calculateExpiryDate(tempActivationDate, p.durationDays);
            return classDateToSchedule <= tempExpiryDate;
        }
        return false;
    });

    suitablePackages.sort((a, b) => {
        if (a.status === 'active' && b.status === 'pending_first_class') return -1;
        if (a.status === 'pending_first_class' && b.status === 'active') return 1;

        if (a.status === 'active' && b.status === 'active') {
            if (a.expiryDate && b.expiryDate && a.expiryDate !== b.expiryDate) return new Date(a.expiryDate) - new Date(b.expiryDate);
            if (a.activationDate && b.activationDate && a.activationDate !== b.activationDate) return new Date(a.activationDate) - new Date(b.activationDate); // Corregido aquí
            return new Date(a.assignmentDate) - new Date(b.assignmentDate);
        }

         if (a.status === 'pending_first_class' && b.status === 'pending_first_class') {
            return new Date(a.assignmentDate) - new Date(b.assignmentDate);
        }
        return 0;
    });
    return suitablePackages.length > 0 ? suitablePackages[0] : null;
}

function selectStudent(idSel) {
    if (loggedInUserType !== 'admin') return;
    selectedStudentId = idSel;
    localStorage.setItem(LAST_SELECTED_STUDENT_ID_KEY, idSel);
    const stud = students.find(s => s.id === selectedStudentId);
    renderStudentsList();
    if (stud) {
        renderStudentDetails(stud);
    }
}

function openEditStudentModal(studentToEdit) {
    if (!studentToEdit || loggedInUserType !== 'admin') return;
    editingStudentId.value = studentToEdit.id;
    modalEditStudentNameInput.value = studentToEdit.name;
    modalEditStudentEmailInput.value = studentToEdit.email || '';
    editStudentModalError.textContent = '';
    editStudentModal.style.display = 'flex';
    modalEditStudentNameInput.focus();
}

async function scheduleClassGeneric(student, initialDateStr, timeStr, repeatWeeksInput, errorElementId, dateInputElement, timeInputElement, isAdminView) {
    const errorEl = document.getElementById(errorElementId);
    errorEl.textContent = '';

    if (!initialDateStr) { errorEl.textContent = 'Selecciona fecha inicial.'; return false; }
    if (!timeStr) { errorEl.textContent = 'Selecciona hora.'; return false; }

    let numRepeats = parseInt(repeatWeeksInput.value, 10);
    if (isNaN(numRepeats) || numRepeats < 1) {
        numRepeats = 1;
    }

    let successfulSchedules = 0;
    let failedSchedules = 0;
    let failReasons = [];
    let firstScheduledPackageName = null;
    let anyClassInPast = false;
    let studentModified = false;

    const initialDateObj = new Date(initialDateStr + "T00:00:00Z");

    for (let i = 0; i < numRepeats; i++) {
        const currentClassDateObj = new Date(initialDateObj);
        currentClassDateObj.setUTCDate(initialDateObj.getUTCDate() + (i * 7));
        const currentClassDateStr = dateToYYYYMMDD(currentClassDateObj);

        if (!isAdminView && currentClassDateStr < getTodayDateString()) {
            failReasons.push(`Fecha ${formatDate(currentClassDateStr)} es pasada.`);
            failedSchedules++;
            if (numRepeats === 1) {
                errorEl.textContent = failReasons.join(' ');
                showMessage('Error', errorEl.textContent);
                return false;
            }
            continue;
        }
        if (isAdminView && currentClassDateStr < getTodayDateString()) {
            anyClassInPast = true;
        }

        const packageToConsume = getPackageForClassConsumption(student, currentClassDateStr);

        if (!packageToConsume) {
            failReasons.push(`No hay paquete para ${formatDate(currentClassDateStr)}.`);
            failedSchedules++;
            if (numRepeats === 1) {
                errorEl.textContent = `No hay un paquete adecuado para la clase del ${formatDate(currentClassDateStr)} (sin clases disponibles, fecha inválida, o no activo/pendiente).`;
                showMessage('Error', errorEl.textContent);
                return false;
            }
            continue;
        }

        let packageExpiryDateForThisClass = packageToConsume.expiryDate;
        if (packageToConsume.status === 'pending_first_class') {
            const otherScheduledOrTakenDates = packageToConsume.scheduledClasses
                .filter(c => c.status === 'programada' || c.status === 'realizada' || c.status === 'no_asistio')
                .map(c => c.date);

            let potentialActivationBase = currentClassDateStr;
            if(otherScheduledOrTakenDates.length > 0){
                const earliestExisting = otherScheduledOrTakenDates.sort()[0];
                if(new Date(earliestExisting) < new Date(currentClassDateStr)){
                    potentialActivationBase = earliestExisting;
                }
            }
            packageExpiryDateForThisClass = calculateExpiryDate(potentialActivationBase, packageToConsume.durationDays);
        }

        if (packageExpiryDateForThisClass && currentClassDateStr > packageExpiryDateForThisClass) {
            failReasons.push(`Clase ${formatDate(currentClassDateStr)} excede expiración del paquete (${formatDate(packageExpiryDateForThisClass)}).`);
            failedSchedules++;
             if (numRepeats === 1) {
                errorEl.textContent = `La fecha de la clase (${formatDate(currentClassDateStr)}) excede la fecha de expiración del paquete ${packageToConsume.packageNameSnapshot} (${formatDate(packageExpiryDateForThisClass)}).`;
                showMessage('Error', errorEl.textContent);
                return false;
            }
            continue;
        }


        packageToConsume.scheduledClasses.push({ classId: generateId(), date: currentClassDateStr, time: timeStr, status: 'programada' });
        updatePackageStatusAndDates(student, packageToConsume.studentPackageId, false);
        studentModified = true;

        if(successfulSchedules === 0) firstScheduledPackageName = packageToConsume.packageNameSnapshot;
        successfulSchedules++;
    }

    if (studentModified) {
        try {
            await db.collection('students').doc(student.id).update({ packages: student.packages });
        } catch (error) {
            console.error("Error scheduling class in Firestore:", error);
            errorEl.textContent = "Error al guardar las clases. Intente de nuevo.";
            showMessage("Error de Guardado", "No se pudieron guardar las clases programadas.");
            return false;
        }
    }

    if (successfulSchedules > 0) {
         if (dateInputElement) dateInputElement.value = '';
         if (timeInputElement) timeInputElement.value = '';
         if (repeatWeeksInput) repeatWeeksInput.value = '';

        let successMsg = `Se agendaron exitosamente ${successfulSchedules} clase(s)`;
        if (firstScheduledPackageName) successMsg += ` del paquete ${firstScheduledPackageName}`;
        if (numRepeats > 1 && successfulSchedules > 1) successMsg += ` (semanalmente).`; else successMsg += `.`;

        if (isAdminView && anyClassInPast) {
            successMsg += " (Nota: Alguna(s) clase(s) fueron agendadas en fecha pasada.)";
        }

        if (failedSchedules > 0) {
            successMsg += ` No se pudieron agendar ${failedSchedules} clase(s) adicionales. Razones: ${failReasons.slice(0,2).join('; ')}${failReasons.length > 2 ? '...' : ''}.`;
        }
        showMessage('Agendamiento Completado', successMsg);
    } else if (failedSchedules > 0 && numRepeats > 0) {
        const mainError = failReasons[0] || "No se pudieron agendar las clases.";
        errorEl.textContent = mainError;
        showMessage('Error de Agendamiento', `No se pudo agendar ninguna clase. ${mainError}`);
        return false;
    } else if (numRepeats === 0 && successfulSchedules === 0) {
         errorEl.textContent = "No se especificaron clases para agendar o no se pudo agendar ninguna.";
         return false;
    }


    if (isAdminView) {
        renderStudentDetails(student);
        if (currentActiveView === 'calendarView') renderFullCalendarView();
    } else {
        renderStudentPortalView();
    }
    return true;
}

async function deletePackageType(idDel) {
    if (loggedInUserType !== 'admin') return;
    const pt = packageTypes.find(p => p.id === idDel);
    if (!pt) { showMessage('Error', 'Paquete no encontrado.'); return; }

    const isUsed = students.some(s => s.packages.some(p => p.packageTypeId === idDel));
    if (isUsed) {
        showMessage('Error', `El paquete "${pt.name}" está en uso por al menos un alumno y no puede ser eliminado. Considere desactivarlo o renombrarlo.`);
        return;
    }

    showConfirmation('Confirmar Eliminación', `¿Eliminar paquete "${pt.name}"? Esta acción no se puede deshacer.`, async () => {
        try {
            await db.collection('packageTypes').doc(idDel).delete();
            packageTypes = packageTypes.filter(p => p.id !== idDel);
            renderPackageTypesManagementList();
            populatePackageTypeSelect();
            if (selectedStudentId && currentActiveView === 'alumnosView') {
                const stud = students.find(s=>s.id===selectedStudentId); if(stud)renderStudentDetails(stud);
            }
            showMessage('Éxito', `Paquete "${pt.name}" eliminado.`);
            if (currentActiveView === 'calendarView') renderFullCalendarView();
        } catch (error) {
            console.error("Error deleting package type:", error);
            showMessage('Error', `No se pudo eliminar el paquete "${pt.name}".`);
        }
    });
}

async function deleteStudent(idDel) {
    const stud = students.find(s => s.id === idDel);
    if (!stud) { showMessage('Error', 'Alumno no hallado.'); return; }
    showConfirmation('Confirmar Eliminación', `¿Estás seguro de que quieres eliminar a "${stud.name}" y todo su historial de clases y paquetes? Esta acción no se puede deshacer.`, async () => {
        try {
            await db.collection('students').doc(idDel).delete();
            students = students.filter(s => s.id !== idDel);
            renderStudentsList();
            if (selectedStudentId === idDel) {
                selectedStudentId = null;
                localStorage.removeItem(LAST_SELECTED_STUDENT_ID_KEY);
                studentDetailView.classList.add('hidden');
                noStudentSelectedViewInAlumnosView.classList.remove('hidden');
            }
            showMessage('Éxito', `Alumno "${stud.name}" eliminado.`);
            if (currentActiveView === 'calendarView') renderFullCalendarView();
        } catch (error) {
            console.error("Error deleting student: ", error);
            showMessage('Error', `No se pudo eliminar el alumno "${stud.name}".`);
        }
    });
}

async function markClassStatusFromCalendar(studentId, packageId, classId, newStatus) {
    if (loggedInUserType !== 'admin') return;
    const student = students.find(s => s.id === studentId);
    if (!student) { showMessage('Error', 'Alumno no encontrado.'); return; }

    if (student.status !== 'activo' && (newStatus === 'realizada' || newStatus === 'no_asistio')) {
         showMessage('Aviso', `El alumno ${student.name} no está activo. No se puede marcar asistencia.`); return;
    }

    const pkg = student.packages.find(p => p.studentPackageId === packageId);
    if (!pkg) { showMessage('Error', 'Paquete del alumno no encontrado.'); return; }
    const classToUpdate = pkg.scheduledClasses.find(c => c.classId === classId);
    if (!classToUpdate) { showMessage('Error', 'Clase no encontrada en el paquete.'); return; }

    if (['cancelada_admin', 'cancelada_alumno'].includes(classToUpdate.status)) {
        showMessage('Info', 'Esta clase ya ha sido cancelada y no se puede modificar su asistencia.'); return;
    }
    const oldStatus = classToUpdate.status;
    if (oldStatus === newStatus) {
        showMessage('Info', `La clase ya está marcada como ${newStatus.replace('_', ' ')}.`); return;
    }

    classToUpdate.status = newStatus;
    updatePackageStatusAndDates(student, packageId, false);

    try {
        await db.collection('students').doc(student.id).update({ packages: student.packages });
        renderFullCalendarView();
        if (currentActiveView === 'alumnosView' && selectedStudentId === studentId) {
            renderStudentDetails(student);
        }
        showMessage('Asistencia Actualizada', `Clase de ${student.name} (${formatTime(classToUpdate.time)}) marcada como ${newStatus.replace('_', ' ')} del paquete ${pkg.packageNameSnapshot}.`);
    } catch (error) {
        console.error("Error updating class status:", error);
        classToUpdate.status = oldStatus;
        updatePackageStatusAndDates(student, packageId, false);
        showMessage('Error', 'No se pudo actualizar el estado de la clase.');
    }
}

async function handleCalendarCancelClass(studentId, packageId, classId) {
    if (loggedInUserType !== 'admin') return;
    const student = students.find(s => s.id === studentId);
    if (!student) { showMessage('Error', 'Alumno no encontrado.'); return; }
    const pkg = student.packages.find(p => p.studentPackageId === packageId);
    if (!pkg) { showMessage('Error', 'Paquete del alumno no encontrado.'); return; }
    const classToCancel = pkg.scheduledClasses.find(c => c.classId === classId);
    if (!classToCancel) { showMessage('Error', 'Clase no encontrada en el paquete.'); return; }

    if (classToCancel.status !== 'programada') {
        showMessage('Info', 'Solo se pueden cancelar clases con estado "Programada".'); return;
    }

    const oldStatus = classToCancel.status;
    classToCancel.status = 'cancelada_admin';
    updatePackageStatusAndDates(student, packageId, false);

    try {
        await db.collection('students').doc(student.id).update({ packages: student.packages });
        renderFullCalendarView();
        if (currentActiveView === 'alumnosView' && selectedStudentId === studentId) {
            renderStudentDetails(student);
        }
        showMessage('Clase Cancelada', `La clase de ${student.name} (${formatTime(classToCancel.time)}) ha sido marcada como Cancelada (Admin).`);
    } catch (error) {
        console.error("Error cancelling class:", error);
        classToCancel.status = oldStatus;
        updatePackageStatusAndDates(student, packageId, false);
        showMessage('Error', 'No se pudo cancelar la clase.');
    }
}

async function handlePortalCancelClass(classId, packageId) {
    if (loggedInUserType !== 'student' || !loggedInStudentId) return;
    const student = students.find(s => s.id === loggedInStudentId);
    if (!student) { showMessage('Error', 'Error de cuenta.'); return; }

    const pkg = student.packages.find(p => p.studentPackageId === packageId);
    if (!pkg) { showMessage('Error', 'Paquete no encontrado.'); return; }
    const classIdx = pkg.scheduledClasses.findIndex(c => c.classId === classId);
    if (classIdx === -1) { showMessage('Error', 'Clase no encontrada.'); return; }
    const classToCancel = pkg.scheduledClasses[classIdx];

    const classDateTime = new Date(`${classToCancel.date}T${classToCancel.time}`);
    const now = new Date();
    const timeDifferenceMs = classDateTime.getTime() - now.getTime();
    const minTimeMs = MIN_HOURS_BEFORE_CLASS_MODIFICATION * 60 * 60 * 1000;

    if (timeDifferenceMs < minTimeMs && classToCancel.status === 'programada') {
         showMessage('No permitido', `No puedes cancelar la clase. Debes hacerlo al menos ${MIN_HOURS_BEFORE_CLASS_MODIFICATION} horas antes.`);
         renderStudentPortalView();
         return;
    }

    if (classToCancel.status !== 'programada') {
        showMessage('Info', 'Solo puedes cancelar clases "Programada".'); return;
    }

    const oldStatus = classToCancel.status;
    classToCancel.status = 'cancelada_alumno';
    updatePackageStatusAndDates(student, packageId, false);

    try {
        await db.collection('students').doc(student.id).update({ packages: student.packages });
        renderStudentPortalView();
        showMessage('Clase Cancelada', 'Tu clase ha sido marcada como cancelada. Se ha ajustado el paquete si corresponde.');
    } catch(error) {
        console.error("Error cancelling portal class:", error);
        classToCancel.status = oldStatus;
        updatePackageStatusAndDates(student, packageId, false);
        showMessage('Error', 'No se pudo cancelar tu clase.');
    }
}

function formatDate(dStr) { if (!dStr) return 'N/A'; const dateParts = dStr.split('-'); if (dateParts.length !== 3) return dStr; try { const year = parseInt(dateParts[0]); const month = parseInt(dateParts[1]) - 1; const day = parseInt(dateParts[2]); const dateObj = new Date(Date.UTC(year, month, day)); return dateObj.toLocaleDateString('es-ES',{day:'2-digit',month:'2-digit',year:'numeric', timeZone: 'UTC'}); } catch (e) { return dStr; } }
function formatTime(tStr) { if (!tStr) return ''; try { const [hours, minutes] = tStr.split(':'); const date = new Date(); date.setUTCHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0); return date.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit',hour12:true, timeZone: 'UTC'}); } catch(e) { return tStr; }}
function formatDateTime(dStr, tStr) { if (!dStr) return 'N/A'; const dateParts = dStr.split('-'); if (dateParts.length !== 3) return dStr + (tStr ? ' ' + formatTime(tStr) : ''); try { const year = parseInt(dateParts[0], 10); const month = parseInt(dateParts[1], 10) - 1; const day = parseInt(dateParts[2], 10); const dateObj = new Date(Date.UTC(year, month, day)); let dayOfWeek = dateObj.toLocaleDateString('es-ES', { weekday: 'short', timeZone: 'UTC' }); dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).replace('.', ''); const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }); let fullFormattedDateTime = `${dayOfWeek}, ${formattedDate}`; if (tStr) { fullFormattedDateTime += ` ${formatTime(tStr)}`; } return fullFormattedDateTime; } catch(e) { return dStr + (tStr ? ' ' + tStr : '');}}
function generateId() { return '_' + Math.random().toString(36).substr(2, 9); }
function calculateExpiryDate(startDateStr, durationDays) { if (!startDateStr || !durationDays) return null; const [year, month, day] = startDateStr.split('-').map(Number); const startDate = new Date(Date.UTC(year, month - 1, day)); startDate.setUTCDate(startDate.getUTCDate() + (parseInt(durationDays) - 1)); return dateToYYYYMMDD(startDate); }
function getTodayDateString() { const t=new Date(); return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())).toISOString().split('T')[0]; }
function dateToYYYYMMDD(date) { const year = date.getUTCFullYear(); const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); const day = date.getUTCDate().toString().padStart(2, '0'); return `${year}-${month}-${day}`; }
function showMessage(tit,txt) { messageModalTitle.textContent=tit; messageModalText.textContent=txt; messageModal.style.display='flex';}
function showConfirmation(title, text, onConfirm) { confirmationModalTitle.textContent = title; confirmationModalText.textContent = text; currentOnConfirmCallback = onConfirm; confirmationModal.style.display = 'flex'; }
function getStatusColorClasses(status, type = 'details') { let baseClasses = type === 'list' ? 'status-badge-list ' : 'px-2 py-0.5 text-xs font-semibold rounded-full '; if (status === 'activo') return baseClasses + 'bg-green-100 text-green-700'; if (status === 'suspendido') return baseClasses + 'bg-yellow-100 text-yellow-700'; return baseClasses + 'bg-red-100 text-red-700';  }
function getPackageStatusText(pkgStatus) { switch(pkgStatus) { case 'pending_first_class': return 'Pendiente Activación'; case 'active': return 'Activo'; case 'completed': return 'Completado'; case 'expired': return 'Expirado'; default: return (pkgStatus || 'Desconocido').replace(/_/g,' '); } }
function getStatusBadgeHTML(status, isAdminView = false) { let badgeText = '', badgeClasses = 'px-2 py-1 text-xs font-semibold rounded-full '; switch(status) { case 'programada': badgeText = 'Programada'; badgeClasses += 'bg-blue-100 text-blue-700'; break; case 'realizada': badgeText = 'Realizada'; badgeClasses += 'bg-green-100 text-green-700'; break; case 'no_asistio': badgeText = 'No Asistió'; badgeClasses += 'bg-red-100 text-red-700'; break; case 'cancelada_alumno': badgeText = isAdminView ? 'Cancelada (Alumno)' : 'Cancelada por ti'; badgeClasses += 'bg-yellow-100 text-yellow-700'; break; case 'cancelada_admin': badgeText = isAdminView ? 'Cancelada (Admin)' : 'Cancelada por Admin'; badgeClasses += 'bg-orange-100 text-orange-700'; break; default: badgeText = status ? (status.charAt(0).toUpperCase() + status.slice(1)).replace(/_/g, ' ') : 'Desconocido'; badgeClasses += 'bg-gray-100 text-gray-700'; break; } return `<span class="${badgeClasses}">${badgeText}</span>`; }
function getAllScheduledClasses() { const allClasses = []; students.forEach(student => { if(student.packages) {student.packages.forEach(pkg => { if(pkg.scheduledClasses){ pkg.scheduledClasses.forEach(cls => { allClasses.push({ date: cls.date, time: cls.time, studentName: student.name, studentId: student.id, packageId: pkg.studentPackageId, classId: cls.classId, status: cls.status }); }); }}); }}); return allClasses.sort((a,b) => {  const dateComparison = new Date(a.date + 'T' + (a.time || '00:00')) - new Date(b.date + 'T' + (b.time || '00:00')); return dateComparison !== 0 ? dateComparison : 0; }); }
function populatePackageTypeSelect() { packageTypeSelect.innerHTML = ''; const sortedPackageTypes = [...packageTypes].sort((a, b) => (a.totalClasses || 0) - (b.totalClasses || 0)); if (sortedPackageTypes.length === 0) { packageTypeSelect.innerHTML = '<option value="">No hay tipos de paquete definidos.</option>'; confirmAssignPackageBtn.disabled = true; return; } confirmAssignPackageBtn.disabled = false; sortedPackageTypes.forEach(pt => { const opt = document.createElement('option'); opt.value = pt.id; opt.textContent = `${pt.name} (${pt.totalClasses} Clases, ${pt.durationDays} Días)`; packageTypeSelect.appendChild(opt); }); }
function updateStudentListFilterButtonsVisual() { studentListFilterButtons.forEach(button => { if (button.dataset.filter === currentStudentListFilter) { button.classList.add('active'); } else { button.classList.remove('active'); } }); }
studentListFilterButtons.forEach(button => { button.addEventListener('click', (e) => { if (loggedInUserType !== 'admin') return; currentStudentListFilter = e.target.dataset.filter; updateStudentListFilterButtonsVisual(); renderStudentsList(); }); });
function updateStudentDetailStatusButtonsVisual(currentStatus) { studentDetailStatusButtons.forEach(button => { button.classList.remove('active-status', 'status-activo', 'status-suspendido', 'status-inactivo', 'btn-secondary'); button.classList.add('filter-btn'); if (button.dataset.statusValue === currentStatus) { button.classList.add('active-status', `status-${currentStatus}`); } }); }
function updateAdminStudentClassesFilterVisual() { adminStudentClassesFilterButtons.forEach(button => { if (button.dataset.filter === adminStudentClassesFilter) { button.classList.add('active'); } else { button.classList.remove('active'); } }); }
function updatePortalStudentClassesFilterVisual() { portalStudentClassesFilterButtons.forEach(button => { if (button.dataset.filter === portalStudentClassesFilter) { button.classList.add('active'); } else { button.classList.remove('active'); } }); }
function openPackageTypeModal(idEdit = null) { if (loggedInUserType !== 'admin') return; packageTypeFormError.textContent = ''; editingPackageTypeId.value = ''; packageTypeNameInput.value = ''; packageTypeClassesInput.value = ''; packageTypeDurationInput.value = ''; if (idEdit) { const pt = packageTypes.find(p => p.id === idEdit); if (pt) { packageTypeModalTitle.textContent = 'Editar Paquete'; editingPackageTypeId.value = pt.id; packageTypeNameInput.value = pt.name; packageTypeClassesInput.value = pt.totalClasses; packageTypeDurationInput.value = pt.durationDays; } else { showMessage('Error', 'Paquete no encontrado.'); return; } } else { packageTypeModalTitle.textContent = 'Crear Nuevo Paquete'; } packageTypeModal.style.display = 'flex'; }
function openEditClassModal(cId,pId){ const stud=students.find(s=>s.id===selectedStudentId);if(!stud || loggedInUserType !== 'admin')return; const pkg=stud.packages.find(p=>p.studentPackageId===pId);if(!pkg){showMessage('Error','Paquete no hallado.');return;} const cls=pkg.scheduledClasses.find(c=>c.classId===cId);if(!cls){showMessage('Error','Clase no hallada.');return;} if (['cancelada_admin', 'cancelada_alumno', 'realizada', 'no_asistio'].includes(cls.status)) { showMessage('Info', `No se puede editar una clase con estado "${cls.status.replace(/_/g,' ')}".`); return; } if (stud.status !== 'activo') { showMessage('Aviso', `El alumno ${stud.name} no está activo. No se pueden editar clases.`); return; } editingClassIdInput.value=cId;editingClassPackageId.value=pId;editClassDateInput.value=cls.date;editClassTimeInput.value=cls.time;editClassError.textContent='';editClassModal.style.display='flex'; }
function openPortalEditClassModal(classId, packageId) { if (loggedInUserType !== 'student' || !loggedInStudentId) return; const student = students.find(s => s.id === loggedInStudentId); if(!student || !student.packages) { showMessage('Error', 'Error de cuenta o paquetes no encontrados.'); return;} const pkg = student.packages.find(p => p.studentPackageId === packageId); if (!pkg || !pkg.scheduledClasses) { showMessage('Error', 'Paquete o clases no encontradas.'); return; } const classToEdit = pkg.scheduledClasses.find(c => c.classId === classId); if (!classToEdit) { showMessage('Error', 'Clase no encontrada.'); return; } if (['cancelada_admin', 'cancelada_alumno', 'realizada', 'no_asistio'].includes(classToEdit.status)) { showMessage('Info', `No se puede editar una clase con estado "${classToEdit.status.replace(/_/g,' ')}".`); return; } const classDateTime = new Date(`${classToEdit.date}T${classToEdit.time || '00:00'}`); const now = new Date(); const timeDifferenceMs = classDateTime.getTime() - now.getTime(); const minTimeMs = MIN_HOURS_BEFORE_CLASS_MODIFICATION * 60 * 60 * 1000; if (timeDifferenceMs < minTimeMs) { showMessage('No permitido', `No puedes editar la clase. Debes hacerlo al menos ${MIN_HOURS_BEFORE_CLASS_MODIFICATION} horas antes.`); renderStudentPortalView(); return; } portalEditingClassId.value = classId; portalEditingClassPackageId.value = packageId; portalEditClassDateInput.value = classToEdit.date; portalEditClassTimeInput.value = classToEdit.time; portalEditClassError.textContent = ''; portalEditClassModal.style.display = 'flex'; }
assignNewPackageBtn.addEventListener('click',()=>{ if(!selectedStudentId || loggedInUserType !== 'admin'){showMessage('Error','Selecciona alumno.');return;} const stud = students.find(s => s.id === selectedStudentId); if (stud && stud.status !== 'activo') { showMessage('Aviso', `El alumno ${stud.name} no está activo y no se le pueden asignar nuevos paquetes.`); return; } populatePackageTypeSelect(); if(packageTypes.length===0){showMessage('Info','Crea tipos de paquete.');return;} assignPackageModal.style.display='flex'; });
function openExtendPackageExpiryModal(studentId, packageId) { const student = students.find(s => s.id === studentId); if (!student) { showMessage('Error', 'Alumno no encontrado.'); return; } const pkg = student.packages.find(p => p.studentPackageId === packageId); if (!pkg) { showMessage('Error', 'Paquete no encontrado.'); return; } if (pkg.status === 'completed') { showMessage('Info', 'No se puede extender la vigencia de un paquete completado.'); return; } if (pkg.status === 'pending_first_class' || !pkg.activationDate) { showMessage('Info', 'El paquete debe estar activado (tener al menos una clase agendada o consumida) para extender su vigencia.'); return; } extendingPackageStudentId.value = studentId; extendingPackageIdForStudent.value = packageId; extendModalPackageName.textContent = pkg.packageNameSnapshot; extendModalCurrentExpiry.textContent = formatDate(pkg.expiryDate || 'N/A'); extendDaysInput.value = ''; extendModalNewExpiryPreview.textContent = formatDate(pkg.expiryDate || 'N/A'); extendPackageExpiryError.textContent = ''; extendPackageExpiryModal.style.display = 'flex'; }

document.addEventListener('DOMContentLoaded', () => {
    initApp().catch(err => {
        console.error("Error initializing app:", err);
        welcomeMainMessage.textContent = "Error crítico al iniciar la aplicación.";
        showMessage("Error de Inicialización", "Ocurrió un error grave. Por favor, recarga la página o contacta al soporte.");
    });
});