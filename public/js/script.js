var app4;

function init() {
    app4 = new Vue({
      el: '#tm-container',
      data: {
        serviceList: [
          { name: 'Интернет 10гб', id: 1 },
          { name: 'Звонки 300мин', id: 2 },
          { name: '30 смс', id: 3 }
        ],
        tariffList: [
            { name: "Абонент Лайт", price: 100, serviceIds: [1], id: 1},
            { name: "Абонент ПРО", price: 200, serviceIds: [2,3], id: 2},
            { name: "Абонент СуперПроВипГолд", price: 300, serviceIds: [3], id: 3}
        ],
        serviceName: "",
        tariff: "",
        serviceFormVisible: false,
        buttonVisible: true,
        buttonTariffVisible: true,
        tariffFormVisible: false,
        tariffName: '',
        tariffPrice: '0',
      },
      computed: {
        TariffListSorted : function() {
            return this.tariffList.sort(function (a,b){
                if (a.name > b.name) {
                    return 1;
                }
                else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        },
      },
      methods: {
        serviceDel: function (id) {
            for (let i in this.serviceList) {
                if (id == this.serviceList[i].id) {
                    this.serviceList.splice(i, 1);
                }
            }
        },
        serviceAdd: function() {
            this.serviceList.push({
                name: this.serviceName,
                id: this.serviceList.length + 1   
            });
            this.serviceName='';
        },
        serviceFormShow: function() {
            this.serviceFormVisible=!this.serviceFormVisible;
            this.buttonVisible=!this.buttonVisible;
        },
        serviceEdit: function(sName,id) {
            sName = prompt("Введите название услуги", sName); 
            if(!sName) {return;}
            for (let i in this.serviceList) {
                if (id == this.serviceList[i].id) {
                    this.serviceList[i].name=sName;
                }
            }
        },
        tariffDel: function (id) {
            for (let i in this.tariffList) {
                if (id == this.tariffList[i].id) {
                    // items2.push(items[i]);
                    this.tariffList.splice(i, 1);
                }
            }
        },
        tariffFormShow: function() {
            this.tariffFormVisible=!this.tariffFormVisible;
            this.buttonTariffVisible=!this.buttonTariffVisible;
        },
        tariffAdd: function() {
            if(!this.tariffName) {alert("Заполните название тарифа");return;}
            if(!this.tariffPrice) {alert("Заполните цену тарифа");return;}
            this.tariffList.push({
                name: this.tariffName,
                price: this.tariffPrice,
                id: this.tariffList.length+1,
                serviceIds: []
            });
            this.tariffName = '';
            this.tariffPrice = 0;
        },
        tariffPriceFocus: function() {
            document.getElementById("add_tariffprice_input").focus();
        },
        tariffEdit: function(tName,tPrice,id) {
            tName = prompt("Введите название тарифа", tName); 
            tPrice = prompt("Введите цену тарифа", tPrice); 
            if(!tName) {return;}
            if(!tPrice) {return;}
            for (let i in this.tariffList) {
                if (id == this.tariffList[i].id) {
                    this.tariffList[i].name=tName;
                    this.tariffList[i].price=tPrice;
                }
            }
        },
        tariffServiceChange: function(tId,sId, event) {
            for (let i in this.tariffList) {
                if(this.tariffList[i].id == tId) {
                    if(event.target.checked) {
                        this.tariffList[i].serviceIds.push(sId);
                    } 
                    else {
                        let idX = this.tariffList[i].serviceIds.indexOf(sId);
                        if(idX>=0) {
                            this.tariffList[i].serviceIds.splice(idX,1);
                        }
                    }
                }
            }
        },
        save: function() {
            axios.post('/set', {
                serviceList: this.serviceList,
                tariffList: this. tariffList
                })
                .then(function (response) {
                alert(response.data);
                })
                .catch(function (error) {
                alert("Error: " + error);
                });
            }
        },

    });
}

window.onload = init;