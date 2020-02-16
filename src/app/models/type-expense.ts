export class TypeExpense {
    _id: string;
    name:string;

    constructor( _id = '', name = ''){
        this._id = _id;
        this.name = name;
    }
}
