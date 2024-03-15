import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  url_Server: string = "http://localhost/wsagenda2024/wsAgenda.php";

  constructor(
    public http: HttpClient,
    public toastController: ToastController
  ) { }

  postData(body: any) {
    let head = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let options = {
      headers: head
    }
    return this.http.post(this.url_Server, JSON.stringify(body), options);
  }

  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }

  async closeSession(id: string) {
    await Preferences.clear()
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      animated: true
    })
    return toast.present();
  }
}
