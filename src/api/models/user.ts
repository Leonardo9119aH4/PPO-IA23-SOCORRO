export class User{
    protected id: Number
    public username: String
    protected password: String
    protected realname: String
    protected email: String
    protected phone: String
    protected level: Number
    public exp: Number
    constructor(id: Number, username: String, password: String, realname: String, email: String, phone: String, level: Number, exp: Number){
        this.id = 1
        this.username = username
        this.password = password
        this.realname = realname
        this.email = email
        this.phone = phone
        this.level = 1
        this.exp = exp
    }

}