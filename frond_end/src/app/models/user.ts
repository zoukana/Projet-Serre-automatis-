export interface User {
userId?: String;
email?: String;
password?: String;
nom?: String;
prenom?: String;
nouveau?: String;
ancien?: String;
rfid?:String;

data?:{
    userId: String;
    token: String;
    email:String;
    nom: String;
prenom: String;
};
}
