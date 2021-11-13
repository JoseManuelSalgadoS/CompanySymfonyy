const url = "http://localhost:80/companysymfony/Company/public/index.php";

const getEmployeeById = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/employee/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
};

const getInfo = async id => {
    let employee = await getEmployeeById(id);

    document.getElementById("name").value = employee.employee[0].name;
    document.getElementById("address").value = employee.employee[0].address;
    document.getElementById("salary").value = employee.employee[0].salary;
    document.getElementById("registered").value = employee.employee[0].registered;
    document.getElementById("updated").value = employee.employee[0].updated;
    document.getElementById("status").value = employee.employee[0].status ? "Activo" : "Inactivo";
    document.getElementById("id_office").value = employee.employee[0].idOffice;
};

const getInfoUpdate = async id => {
    let employee = await getEmployeeById(id);

    document.getElementById("id_update").value = id;
    document.getElementById("name_update").value = employee.employee[0].name;
    document.getElementById("address_update").value = employee.employee[0].address;
    document.getElementById("salary_update").value = employee.employee[0].salary;
    document.getElementById("registered_update").value = employee.employee[0].registered;
    document.getElementById("updated_update").value = employee.employee[0].updated;
    document.getElementById("idOffice_update").value = employee.employee[0].idOffice;
};

const fill = list => {
    let table = "";
    $(`#table > tbody`).empty();

    if(list.length > 0){
        for(let i = 0; i < list.length; i++) {
            table += `
            <tr>
                <td>${ i + 1 }</td>
                <td>${ list[i].name }</td>
                <td>${ list[i].address }</td>
                <td>${ list[i].salary }</td>
                <td>${ list[i].registered }</td>
                <td>${ list[i].updated }</td>
                <td>${ list[i].status ? "Activo" : "Inactivo" }</td>
                <td>${ list[i].idOffice }</td>
                <td>
                    <button onclick="getInfo(${ list[i].id })" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#details">Detalles</button>
                    <button onclick="getInfoUpdate(${ list[i].id })" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i> Modificar</button>
                    <button onclick="getId(${ list[i].id })" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete">Eliminar</button>
                </td>
            </tr>
            `;
        }
    }else{
        table = `
        <tr class="text-center">
            <td colspan="5">No hay registros para mostrar</td>
        </tr>
        `;
    }
    $(`#table > tbody`).html(table);
};

const getEmployees = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/employees'
    }).done(res => {
        fill(res.listEmployees);
    });
};

const registerEmployee = async () => {
    let name = document.getElementById("name_register").value;
    let address = document.getElementById("address_register").value;
    let salary = document.getElementById("salary_register").value;
    let registered = document.getElementById("registered_register").value;
    let updated = document.getElementById("updated_register").value;
    let idOffice = document.getElementById("idOffice_register").value;


    await $.ajax({
        type: "POST",
        url: url + "/employee/create",
        data: {name, address, salary, registered, updated, idOffice}
    }).done(function(res){
        console.log(res);
    });
};

const updateEmployee = async () => {
    let id = document.getElementById("id_update").value;
    let name = document.getElementById("name_update").value;
    let address = document.getElementById("address_update").value;
    let registered = document.getElementById("registered_update").value;
    let updated = document.getElementById("updated_update").value;
    let idOffice = document.getElementById("idOffice_update").value;
    
    await $.ajax({
        type: "POST",
        url: url + "/employee/update/" + id,
        data: {name, address, registered, updated, idOffice}
    }).done(function(res){
        console.log(res);
    });
};

const deleteEmployee = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: url + '/employee/delete/' + id
    }).done(res => {
        console.log(res);
        getEmployees();
    });
};

getEmployees();