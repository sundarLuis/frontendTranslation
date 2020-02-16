export class Translation {
    _id: string;
    translation:string;
    status:number;

    constructor(_id='', translation= '', status = null){
        this._id = _id;
        this.translation= translation;
        this.status = status;
    }
}
