
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import {ChatPage} from '../chat/chat';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string = '';
  provider = {
    name: '',
    profilePicture: '',
    email: '', 
    loggedin: false
  }


  constructor(private fire: AngularFireAuth, 
  public navCtrl:NavController,
  public ref: ChangeDetectorRef,
  private alertCtrl: AlertController) {
    
  }
  /**
   * 
   *  login
   *  provider: login 3rd party
   */
  login(provider){
    let signInprovider = null;
    switch(provider){
      case "facebook":
        signInprovider = new firebase.auth.FacebookAuthProvider()
        break;
      case "google":
        signInprovider = new firebase.auth.GoogleAuthProvider()
        
    }
     this.fire.auth.signInWithPopup(signInprovider)
      .then(res =>{
        console.log('logging in with =>'+provider);
        this.provider.loggedin = true;
        this.provider.name = res.user.displayName;
        this.provider.email = res.user.email;
        this.provider.profilePicture = res.user.photoURL;
        this.ref.detectChanges();
        console.log(res);
      })

  }

/**
   * 
   *  logout
   * This methord to let user logout of all
   */
logout(){
  this.fire.auth.signOut();
  this.provider.loggedin = false;
}

enterChat(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(ChatPage);
  }
  showAlert(title: string, message:string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }
  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
        this.navCtrl.push(ChatPage,{
          username: this.username

        });

    }else{
      this.showAlert('Error', 'Invalid username');

    }



  }
}
