export class List {
    _id: string;
    type:string;
    language:string;
    content:string;
    ids_translation:any[] = [{
        _id:'',
        translation:'',
        status:null
    }];
    status:number;
    statusCreating:boolean;

    constructor( _id = '',type="",language="",content='',ids_translation = [{_id:"",  translation:'', status:null}], status = null,statusCreating = false){
        this._id = _id;
        this.type = type;
        this.language =language;
        this.content = content;
        this.ids_translation = ids_translation;
        this.status = status;
        this.statusCreating = statusCreating;
    }
}
