import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiCallsProvider } from '../../providers/api-calls/api-calls';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  contactList;
  deleteObject = {"id": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public helper: ApiCallsProvider, public toastCtrl: ToastController) {
  }

  ionViewWillEnter(){
    this.getContactList();
  }
 
  getContactList() {
    this.helper.getContacts().then((result) => {
      this.contactList = result['response'];
      console.log(this.contactList);
    }, (err) => {
      this.presentToast(JSON.stringify(err));
    });
  }

  addContact() {
    this.navCtrl.push('AddContactPage');
  }

  deleteContact(id) {
    this.deleteObject.id = id;
    this.helper.deleteContact(this.deleteObject).then((result) => {
      if(result){
        this.presentToast("Contact Successfully Deleted");
        this.getContactList();
      }
    }, (err) => {
      this.presentToast(JSON.stringify(err));
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
