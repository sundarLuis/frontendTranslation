export class Expense {
    _id:string;
    id_typeMoney:any[] = [{
        _id:'',
        name:''
    }];
    id_typeExpenses:any[] = [{
        _id:'',
        name:''
    }];
    description: string;
    url:string;
    price: number;
    constructor(_id = '', id_typeMoney = [{_id:"",name:''}], id_typeExpenses = [{_id:"", name:''}], description = '', price = null ){
        this._id = _id;
        this.id_typeMoney = id_typeMoney;
        this.id_typeExpenses = id_typeExpenses;
        this.description = description;
        this.price = price;
    }

}
