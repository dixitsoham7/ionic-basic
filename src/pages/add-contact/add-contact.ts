import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiCallsProvider } from '../../providers/api-calls/api-calls';

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {
  name: string;
  contact: string;

  addDataObject = { "name": "", "contact": ""};
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public helper: ApiCallsProvider) {
  }

  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  createContact() {
    if(!this.name){
      this.showAlert('Validation Error','Please Enter Name');
    } else if (!this.contact) {
      this.showAlert('Validation Error','Please Enter Contact');
    } else {
      this.addDataObject.name = this.name;
      this.addDataObject.contact = this.contact;
      this.helper.addContact(this.addDataObject).then((result: any) => {
        if(result)
        {
          this.presentToast('Contact Added Successfully');
          this.navCtrl.pop();
        } else {
          this.presentToast('Something went wrong. Please try again later!')
        }
      }).catch((error) => {
        this.presentToast('Failed to add contact');
      });
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
