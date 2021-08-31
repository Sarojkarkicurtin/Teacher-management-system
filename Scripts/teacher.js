
const pqOptions = {
    width: "auto",
    height: 250,
    showTitle: false,
    showHeader: true,
    showTop: true,
    showToolbar: false,
    showBottom: false,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: false,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};



function TeacherVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };

    var isNumeric = function (str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

    };

    const models = {
        MyModel: function (item) {
            item = item || {};
            this.SalutationId = ko.observable(item.SalutationId || "");
            this.SalutationName = ko.observable(item.SalutationName || "");
            this.FirstName = ko.observable(item.FirstName || "");
            this.LastName = ko.observable(item.LastName || "");
            this.Email = ko.observable(item.Email || "");
            this.Phone = ko.observable(item.Phone || "");//extend({ round: 2 });
            this.Age = ko.observable(item.Age || "");
        /*  *//*  this.chosenEdu = ko.observableArray([]);*/

            this.SelectedGender = ko.observable();
            this.Male = ko.computed({
                read: function () {
                    return this.SelectedGender() == "Male";
                },
                write: function (value) {
                    if (value)
                        this.SelectedGender("Male");
                }

            }, this);

            this.nationalId = ko.observable(item.nationalId || "");
            this.nationality = ko.observable(item.nationality || "");
        },

        MyAddress: function (item1) {
            item1 = item1 || {};
            this.AddressTypeId = ko.observable(item1.AddressTypeId || "");
            this.AddressType = ko.observable(item1.AddressType || "");
            this.ProvinceId = ko.observable(item1.ProvinceId || "");
            this.Province = ko.observable(item1.Province || "");
            this.CityId = ko.observable(item1.CityId || "");
            this.City = ko.observable(item1.City || "");
            
            this.Ward = ko.observable(item1.Ward || "");
            this.Tole = ko.observable(item1.Tole || "");

        },
        MyModuleinfo: function (item1) {
            item1 = item1 || {};
            this.Courses = ko.observable(item1.Courses || "");
            this.ClassId = ko.observable(item1.ClassId || "");
            this.SectionId = ko.observable(item1.SectionId || "");
            this.Class = ko.observable(item1.Class || "");
            this.Section = ko.observable(item1.Class || "");


            this.SelectedShift = ko.observable();
            this.Morning = ko.computed({
                read: function () {
                    return this.SelectedShift() == "Morning";
                },
                write: function (value) {
                    if (value)
                        this.SelectedShift("Morning");
                }

            }, this);
           
         
           

        },
        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.MyAddress = ko.observable(new models.MyAddress());
            self.MyModuleinfo = ko.observable(new models.MyModuleinfo());
            self.DataList = ko.observableArray([]);
            self.ModuleList = ko.observableArray([]);
            self.enableDisable = ko.observable(false);
            self.enableDisableGender = ko.observable(false);
            self.enableDisableShift = ko.observable(false);
            self.enableDisableAdd = ko.observable(true);
            self.enableDisableUpdate = ko.observable(false);
            self.enableDisableSave = ko.observable(false);
            self.enableDisableClear = ko.observable(false);
            self.enableDisableUpd = ko.observable(false);
            self.enableUpd = ko.observable(false);
            self.submitaddress = ko.observable(false);
            self.allUpdate = ko.observable(false);
            self.DetailList = ko.observableArray([]);
            self.Teacherid = ko.observable('');
            self.enablemodule = ko.observable(false);

            self.Salutationlist = ko.observableArray([]);
            self.NationalList = ko.observableArray([]);
            self.AddressTypeList = ko.observableArray([]);
            self.provincelist = ko.observableArray([]);
            self.CityList = ko.observableArray([]);
            self.classList = ko.observableArray([]);
            self.sectionList = ko.observableArray([]);
        },
    };
   

    const UiEvents = {
        validate: {
            SaveValidation: function () {
                // debugger
                if (isNullOrEmpty(self.MyModel().FirstName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputFirstName").focus();
                    alert("First Name is Required");
                }
                else if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    alert("Salutation must be entered")
                }

                else if (isNullOrEmpty(self.MyModel().LastName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputLastName").focus();
                    alert("Last Name is Required");
                }
                else if (isNullOrEmpty(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Email is Required");
                }
                else if (!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Invalid Email");
                }
                else if (isNullOrEmpty(self.MyModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Required");
                }
                else if (!(isNumeric(self.MyModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number Should be Number")
                }
                else if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/).test(self.MyModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Invalid");
                }
                else if (isNullOrEmpty(self.MyModel().Age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age is Required");
                }
                else if (!(isNumeric(self.MyModel().Age()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be in Number");
                }
                else if (!((self.MyModel().Age() < 100) && (self.MyModel().Age() > 16))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be Above 16 and below 100");
                }
                else if (!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineRadio1").focus();
                    alert("Choose the Gender");
                }
                else if (isNullOrEmpty(self.MyModel().nationalId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#nationality").focus();
                    alert("Nationality must be entered")
                }
                
                else if (obj.DataList() == "") {
                    
                    alert("address must be fillup");

                }
                else if (obj.ModuleList() == "") {
                 
                    alert("Module information must be fillup");

                }
                else {
                 

                        self.MyModel().SalutationName((self.Salutationlist().find(X => X.SalutationId == self.MyModel().SalutationId()) || {}).SalutationName);
                        self.MyModel().nationality((self.NationalList().find(X => X.nationalId == self.MyModel().nationalId()) || {}).Nationality);
                        
                        /*self.DataList.push(ko.toJS(self.MyAddress()));*/
                       
                    
                    let Teacherinfo = {

                        Teacherid: self.Teacherid(),
                        SalutationId: self.MyModel().SalutationId(),
                        Salutation: self.MyModel().SalutationName(),
                        firstname: self.MyModel().FirstName(),
                        lastName: self.MyModel().LastName(),
                        Email: self.MyModel().Email(),
                        Age: self.MyModel().Age(),
                        Gender: self.MyModel().SelectedGender(),
                        PhoneNumber: self.MyModel().Phone(),
                        nationalId: self.MyModel().nationalId(),
                        Nationality: self.MyModel().nationality(),
                        Addresslist: (ko.toJS(obj.DataList())),
                        moduleinfolist: (ko.toJS(obj.ModuleList()))
                    }
                    console.log(Teacherinfo);



                    $.ajax({

                        type: "POST",
                        url: '/Home/GetJsonData',
                        dataType: "json",
                        data: JSON.stringify({ "data": Teacherinfo }),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //debugger;
                            alert( "Your Data is saved succesfully");
                           
                        }

                    });

                    self.DataList([]);
                    UiEvents.functions.Save("dataGrid");
                    self.ModuleList([]);
                    UiEvents.clear.clearfield1();

                }
            },
            moduleValidation: function() {
                if (isNullOrEmpty(self.MyModuleinfo().Courses())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#inputCourses").focus();
                    alert("courses is Required");
                }
                else if (isNullOrEmpty(self.MyModuleinfo().ClassId())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#Class").focus();
                    alert("Class must be entered")

                }
                else if (isNullOrEmpty(self.MyModuleinfo().SectionId())) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#Section").focus();
                    alert("Section must be entered")

                }
                else if (!(self.MyModuleinfo().SelectedShift() == "Morning" || self.MyModuleinfo().SelectedShift() == "Day")) {
                    $("#subtabs").tabs({ active: 1 });
                    $("#inlineRadio1").focus();
                    alert("Choose the shift");
                }

                else {
                    if ((ko.toJS(self.ModuleList())).find(x => x.ClassId == self.MyModuleinfo().ClassId())) {
                        alert("Warning! - Information Already Exists!!...");


                    }
                    else {
                        self.MyModuleinfo().Class((self.classList().find(X => X.ClassId == self.MyModuleinfo().ClassId()) || {}).Class);
                        self.MyModuleinfo().Section((self.sectionList().find(X => X.SectionId == self.MyModuleinfo().SectionId()) || {}).Section);

                        self.ModuleList().push(ko.toJS(self.MyModuleinfo()));
                        UiEvents.functions.moduleinfo("ModuleGrid");
                        UiEvents.clear.clearfield3();
                        self.enableUpd(false);
                        self.enablemodule(true);

                    }

                }   
                

            },
            updateallValidation: function () {

                if (isNullOrEmpty(self.MyModel().FirstName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputFirstName").focus();
                    alert("First Name is Required");
                }
                else if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    alert("Salutation must be entered")
                }

                else if (isNullOrEmpty(self.MyModel().LastName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputLastName").focus();
                    alert("Last Name is Required");
                }
                else if (isNullOrEmpty(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Email is Required");
                }
                else if (!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Invalid Email");
                }
                else if (isNullOrEmpty(self.MyModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Required");
                }
                else if (!(isNumeric(self.MyModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number Should be Number")
                }
                else if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/).test(self.MyModel().Phone())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Invalid");
                }
                else if (isNullOrEmpty(self.MyModel().Age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age is Required");
                }
                else if (!(isNumeric(self.MyModel().Age()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be in Number");
                }
                else if (!((self.MyModel().Age() < 100) && (self.MyModel().Age() > 16))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be Above 16 and below 100");
                }
                else if (!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineRadio1").focus();
                    alert("Choose the Gender");
                }
               
                else if (isNullOrEmpty(self.MyModel().nationalId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#nationality").focus();
                    alert("Nationality must be entered")
                }

                else if (obj.DataList() == "") {
                    $("#subtabs").tabs({ active: 0 });
                    alert("address must be fillup");

                }

                else if (obj.ModuleList() == "") {
                    $("#subtabs").tabs({ active: 1 });
                    alert("Moduleinfo must be fillup");

                }
                else {
                    self.MyModel().SalutationName((self.Salutationlist().find(X => X.SalutationId == self.MyModel().SalutationId()) || {}).SalutationName);
                    self.MyModel().nationality((self.NationalList().find(X => X.nationalId == self.MyModel().nationalId()) || {}).Nationality);
                    self.MyAddress().AddressType((self.AddressTypeList().find(X => X.AddressTypeId == self.MyAddress().AddressTypeId()) || {}).AddressType);
                    self.MyAddress().Province((self.provincelist().find(X => X.ProvinceId == self.MyAddress().ProvinceId()) || {}).Province);
                    self.MyAddress().City((self.CityList().find(X => X.CityId == self.MyAddress().CityId()) || {}).City);
                    self.MyModuleinfo().Class((self.classList().find(X => X.ClassId == self.MyModuleinfo().ClassId()) || {}).Class);
                    self.MyModuleinfo().Section((self.sectionList().find(X => X.SectionId == self.MyModuleinfo().SectionId()) || {}).Section);

                    /*self.DataList.push(ko.toJS(self.MyAddress()));*/
                    


                    let AllpersonInfo = {
                        pid: self.Teacherid(),
                        Salutation: self.MyModel().SalutationName(),
                        firstname: self.MyModel().FirstName(),
                        lastName: self.MyModel().LastName(),
                        Email: self.MyModel().Email(),
                        Age: self.MyModel().Age(),
                        Gender: self.MyModel().SelectedGender(),
                        PhoneNumber: self.MyModel().Phone(),
                        moduleinfolist: (ko.toJS(obj.ModuleList())),
                        Nationality: self.MyModel().nationality(),
                        Addresslist: (ko.toJS(obj.DataList()))
                    }
                    console.log(AllpersonInfo);



                    $.ajax({

                        type: "POST",
                        url: '/Home/GetJsonData',
                        dataType: "json",
                        data: JSON.stringify({ "data": AllpersonInfo }),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            debugger
                            alert("successfully updated");
                            //alert(data.Name + "-" + data.Email + "-" + data.Phone + "-" + data.Age);

                        }

                    });


                    return true;


                }
            },


            AddressValidation: function () {
                if (isNullOrEmpty(self.MyAddress().AddressTypeId())) {


                    $("#addressType").focus();
                    alert("Address Type Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().ProvinceId())) {
                  
                    $("#province").focus();
                    alert("Province Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().CityId())) {
                  
                    $("#city").focus();
                    alert("City Should must be entered");
                }
               
                else if (isNullOrEmpty(self.MyAddress().Ward())) {
                   
                    $("#ward").focus();
                    alert("Ward Should must be entered");
                }
                else if (!(self.MyAddress().Ward() < 21)) {
                    alert("Ward must be below 20");
                   
                    $("#ward").focus();
                    return;
                }
                else if (isNullOrEmpty(self.MyAddress().Tole())) {
                  
                    $("#tole").focus();
                    alert("Tole must be entered");
                }

                else {
                    if ((ko.toJS(self.DataList())).find(x => x.AddressTypeId == self.MyAddress().AddressTypeId())) {
                        alert("Warning! - Information Already Exists!!...");
                        

                    }
                    else {
                       
                        self.MyAddress().AddressType((self.AddressTypeList().find(X => X.AddressTypeId == self.MyAddress().AddressTypeId()) || {}).AddressType);
                        self.MyAddress().Province((self.provincelist().find(X => X.ProvinceId == self.MyAddress().ProvinceId()) || {}).Province);
                        self.MyAddress().City((self.CityList().find(X => X.CityId == self.MyAddress().CityId()) || {}).City);
                        self.DataList.push(ko.toJS(self.MyAddress()));
                        UiEvents.functions.Save("dataGrid");
                        UiEvents.clear.clearfield2();
                        self.enableDisableUpd(false);
                        self.submitaddress(true);
                    }
                }
            }
        },
        

        clear: {
            ResetAll: function () {
                
                self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                self.MyModuleinfo(new models.MyModuleinfo());
                //self.DataList([]);
                //self.ModuleList([]);
            },

            clearfield1: function () {
                self.MyModel(new models.MyModel());
                $("#tabs").tabs();

            },
            clearfield2: function () {
                self.MyAddress(new models.MyAddress());
                $("#subtabs").tabs();

            },
            clearfield3: function () {
                self.MyModuleinfo(new models.MyModuleinfo());
                $("#subtabs").tabs();

            },

        },

        functions: {

            GetAllData: function (control) {

                var tempData = {
                    location: "remote",
                    method: "GET",
                    dataType: "JSON",
                    url: '/Home/AllDataList',
                    contentType: "application/json; charset=UTF-8",
                    recIndx: "SalutationId",
                    beforeSend: function (jqXHR, settings) {
                        return true;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error(errorThrown);
                    },
                    getData: function (result) {
                        if (result && result.Success) {
                            const data = result.Data;
                            return { curPage: result.CurrentPage, totalRecords: result.TotalRecords, data: data.AllData };
                        }
                        else {
                            Empower.message("Warning", result.Message || "Warning ! - Error Occured...!!!");
                            return { curPage: 0, totalRecords: 0, data: [] };
                        }
                    }
                };

                var options1 = Object.assign({}, pqOptions);
                options1.pageModel = { curPage: 1, rPP: 10, type: "remote" };
                options1.height = 340;
                options1.colModel = [
                    { title: "Id", align: "left", dataIndx: "Teacherid", width: "5%" },
                    { title: "Salutation", align: "left", dataIndx: "Salutation", width: "5%" },
                    { title: "FirstName", align: "center", dataIndx: "firstName", width: "10%" },
                    { title: "LastName", align: "center", dataIndx: "LastName", width: "10%" },
                    { title: "Email", align: "Center", dataIndx: "Email", width: "15%" },
                    { title: "PhoneNumber", align: "Center", dataIndx: "PhoneNumber", width: "10%" },
                    { title: "Age", align: "Center", dataIndx: "Age", width: "5%" },
                    { title: "Gender", align: "Center", dataIndx: "Gender", width: "10%" },
                   
                    {
                        title: "Nationality", align: "Center", dataIndx: "Nationality", width: "10 % "
                    },


                    {
                        title: "Action", align: "Center", width: "20%", render: function (ui) {

                            return `<button class="btn btn-danger" onclick="obj.detailDelete(${ui.rowData.Teacherid});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.detailEdit(${ui.rowData.Teacherid});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                        }
                    },
                ];
                options1.showBottom = true;
                options1.dataModel = tempData;
                if ($("#" + control).pqGrid("instance")) {
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    $("#" + control).pqGrid(options1);
                }

            },

            Ajaxedit: function (Id) {
                $.ajax({

                    type: "Post",
                    url: '/Home/FetchDetails',
                    dataType: "json",
                    data: JSON.stringify({ "id": Id }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                       
                        $("#tabs").tabs({ active: 0 });
                        self.enableDisableSave(false);
                        self.enableDisableUpd(false);
                        self.enableDisableClear(false);
                        self.enableDisable(true);
                        self.enableDisableAdd(false);
                        self.enableUpd(false);
                        self.enablemodule(true);
                        self.submitaddress(true);
                        self.allUpdate(true);
                        self.MyModel().FirstName(data.Data.firstName);
                        self.MyModel().LastName(data.Data.LastName);
                        self.MyModel().Email(data.Data.Email);
                        self.MyModel().Age(data.Data.Age);
                        self.MyModel().Phone(data.Data.PhoneNumber);
                        self.MyModel().nationalId(data.Data.nationalId);
                        self.MyModel().SalutationId(data.Data.SalutationId);
                        self.MyModel().SelectedGender(data.Data.Gender);
                        self.Teacherid(data.Data.Teacherid);
                       
                        self.ModuleList([]);

                        self.ModuleList(data.Data.moduleinfolist);
                        UiEvents.functions.moduleinfo("ModuleGrid");


                       
                        self.DataList([]);
                        self.DataList(data.Data.Addresslist);
                        UiEvents.functions.Save("dataGrid");
                    }

                });
            },
            Ajaxdelete: function (TeacherId) {
                //debugger
                $.ajax({

                    type: "Post",
                    url: '/Home/GetDeletedata',
                    dataType: "json",
                    data: JSON.stringify({ "Id" : TeacherId }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        /*  debugger;*/

                        UiEvents.functions.AjaxAllDetail();
                        alert("delete sucessful");
                        




                    }

                });
            },
            AjaxAllDetail: function () {


                $.ajax({

                    type: "Post",
                    url: '/Home/GetJsonDetail',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        
                        self.DetailList([]);
                        self.DetailList(data.Data);
                        UiEvents.functions.detail("demogrid");

                    }

                });
            },
            AjaxDSalutation: function () {

               
                $.ajax({
                    
                    type: "Post",
                    url: '/Home/GetSalutation',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.Salutationlist(data.Data);

                    }

                });
            },
            AjaxDNationality: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetNationality',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.NationalList(data.Data);

                    }

                });
            },
            AjaxDAddressType: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetAddressType',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.AddressTypeList(data.Data);

                    }

                });
            },
            AjaxDProvince: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetProvince',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.provincelist(data.Data);

                    }

                });
            },
            AjaxDCity: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetCity',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.CityList(data.Data);

                    }

                });
            },
            AjaxDClass: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetClass',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.classList(data.Data);

                    }

                });
            },
            AjaxDSection: function () {

                $.ajax({

                    type: "Post",
                    url: '/Home/GetSection',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.sectionList(data.Data);

                    }

                });
            },
            Save: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "AddressType", align: "left", dataIndx: "AddressType", width: "15%" },
                        { title: "Province", align: "center", dataIndx: "Province", width: "15%" },
                        { title: "City", align: "center", dataIndx: "City", width: "15%" },

                        { title: "Ward", align: "Center", dataIndx: "Ward", width: "15%" },
                        { title: "Tole", align: "Center", dataIndx: "Tole", width: "15%" },
                        {
                            title: "Action", align: "Center", width: "30%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.delete(${ui.rowIndx});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.edit(${ui.rowIndx});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = false;
                    $("#" + control).pqGrid(options);
                }
            },
            moduleinfo: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.ModuleList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Courses", align: "left", dataIndx: "Courses", width: "20%" },
                        { title: "Class", align: "center", dataIndx: "Class", width: "20%" },
                        { title: "Section", align: "center", dataIndx: "Section", width: "15%" },

                        { title: "Shift", align: "Center", dataIndx: "SelectedShift", width: "15%" },
                       
                        {
                            title: "Action", align: "Center", width: "30%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.deletemodule(${ui.rowIndx});" type="button"><i class="fas fa-trash fa-lg"> Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.editmodule(${ui.rowIndx});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.ModuleList()) };
                    options.showBottom = false;
                    $("#" + control).pqGrid(options);
                }
            },
            detail: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DetailList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Id", align: "left", dataIndx: "Teacherid", width: "5%" },
                        { title: "Salutation", align: "left", dataIndx: "Salutation", width: "5%" },
                        { title: "FirstName", align: "center", dataIndx: "firstName", width: "10%" },
                        { title: "LastName", align: "center", dataIndx: "LastName", width: "10%" },
                        { title: "Email", align: "Center", dataIndx: "Email", width: "15%" },
                        { title: "PhoneNumber", align: "Center", dataIndx: "PhoneNumber", width: "10%" },
                        { title: "Age", align: "Center", dataIndx: "Age", width: "5%" },
                        { title: "Gender", align: "Center", dataIndx: "Gender", width: "10%" },
                        /*{ title: "Education", align: "Center", dataIndx: "chosenEdu", width: "10%" },*/
                        {
                            title: "Nationality", align: "Center", dataIndx: "Nationality", width: "10 % "
                        },


                        {
                            title: "Action", align: "Center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.detailDelete(${ui.rowData.Teacherid});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.detailEdit(${ui.rowData.Teacherid});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DetailList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);
                }
            }


        },
    };

    self.submitmodule = function () {
        
        if (UiEvents.validate.moduleValidation()) {
           
           
        }
    };
    self.Updatemodule = function () {

        if (UiEvents.validate.moduleValidation()) {

           
        }


    };


    self.onChangeOfSalutation = function () {
        if (self.MyModel().SalutationId() == "1") {
            self.MyModel().SelectedGender("Male");
            self.enableDisableGender(false);
        }
        else if (self.MyModel().SalutationId() == "2" || self.MyModel().SalutationId() == "3") {
            self.MyModel().SelectedGender("Female");
            self.enableDisableGender(false);
        }
        else {
            self.enableDisableGender(true);
            return;
        }

    };

    self.Save = function () {
      
        UiEvents.validate.SaveValidation() 
           
    };
    self.Updatealldata = function () {

        if (UiEvents.validate.SaveValidation()) {
            
            UiEvents.clear.ResetAll();
            self.DataList([]);
            self.ModuleList([]);
            UiEvents.functions.Save("dataGrid");
            UiEvents.functions.moduleinfo("ModuleGrid");

            self.enableDisableClear(true);
            self.allUpdate(false);
            self.enableDisableSave(true);
           

        }
    };
   

    self.Clear = function () {
        
        UiEvents.clear.clearfield1();
        UiEvents.clear.clearfield2();
        UiEvents.clear.clearfield3();
        self.DataList([]);
        UiEvents.functions.Save("dataGrid");
        self.ModuleList([]);

        //self.enableDisableClear(false);
        //self.enableDisableAdd(true);
        //self.enableDisableSave(false);
        //self.enableDisable(false);
        //UiEvents.functions.Save("dataGrid");

    };

    self.submit = function () {
        /*debugger*/
        
        if (UiEvents.validate.AddressValidation())
        {
           
           // UiEvents.functions.Save("dataGrid");
            alert("Done");
            //UiEvents.clear.clearfield2();

        }
    };

    self.Add = function () {
        self.enableDisableSave(true);
        self.enableDisableClear(true);
        self.enableDisable(true);
        self.enableDisableGender(true);
        self.enableDisableShift(true);
        self.enableDisableAdd(false);
        self.submitaddress(true);
       
        self.allUpdate(false);
        self.enablemodule(true);
        UiEvents.functions.Save("dataGrid");

    };

    self.deletemodule = function deleteRow(index) {
        self.ModuleList().splice(index, 1);
        UiEvents.functions.moduleinfo("ModuleGrid");

    };
   
    self.editmodule = function editRow(index) {
        
        var b = $('#ModuleGrid').pqGrid("getRowData", { rowIndx: index });
        self.MyModuleinfo().Courses(b.Courses);
        self.MyModuleinfo().ClassId(b.ClassId);
        
        self.MyModuleinfo().SectionId(b.SectionId);
        self.MyModuleinfo().SelectedShift(b.SelectedShift);
        self.ModuleList().splice(index, 1);
        UiEvents.functions.moduleinfo("ModuleGrid");

        self.enableDisableSave(false);
        self.enablemodule(false);
        self.enableUpd(true);
        //self.enableDisableClear(false);
        self.enableDisable(true);
       




    };
    self.delete = function deleteRow(index) {

        self.DataList.splice(index, 1);
        UiEvents.functions.Save("dataGrid");

    };
    self.edit = function editRow(index) {

        var a = $('#dataGrid').pqGrid("getRowData", { rowIndx: index });
        
        self.MyAddress().AddressTypeId(a.AddressTypeId);
        /*self.MyAddress().AddressType(a.AddressType);*/
        self.MyAddress().ProvinceId(a.ProvinceId);
       /* self.MyAddress().Province(a.Province);*/
       
        self.MyAddress().CityId(a.CityId);
        /*self.MyAddress().City(a.City);*/

        self.MyAddress().Ward(a.Ward);
        self.MyAddress().Tole(a.Tole);
        self.DataList.splice(index, 1);
        UiEvents.functions.Save("dataGrid");

        self.enableDisableSave(false);
        self.submitaddress(false);
        self.enableDisableUpd(true);
        self.enableDisableClear(false);
        self.enableDisable(true);
       


       
        
    };

    self.Update = function () {

        if (UiEvents.validate.AddressValidation()) {

           
            }

        
    };
    self.detailDelete = function (TeacherId) {
       
        UiEvents.functions.Ajaxdelete(TeacherId);
    };
    self.detailEdit = function (Id) {
        UiEvents.functions.Ajaxedit(Id);
    };
   

    function Init() {
        models.UiElements();
       
        $("#tabs").tabs();
        $("#subtabs").tabs();
        UiEvents.functions.AjaxDSalutation();
        UiEvents.functions.AjaxDNationality();
        UiEvents.functions.AjaxDAddressType();
        UiEvents.functions.AjaxDProvince();
        UiEvents.functions.AjaxDCity();
        UiEvents.functions.AjaxDClass();
        UiEvents.functions.AjaxDSection();
        UiEvents.functions.Save("dataGrid");
        



       /* UiEvents.clear.ResetAll();*/
        $("#dialogbox").dialog({
            autoOpen: false,
        });




        $("#subtabs, #subtabs-3").click(function () {
            UiEvents.functions.moduleinfo("ModuleGrid");
        });
        $("#tabs, #tabs-4").click(function () {
            UiEvents.functions.AjaxAllDetail();
        });
        $("#tabs, #tabs-5").click(function () {
            UiEvents.functions.GetAllData("RemoteGrid");
        });
    }

    Init();
}

var obj;

$(document).ready(function () {
    obj = new TeacherVM();
    ko.applyBindings(obj);


});