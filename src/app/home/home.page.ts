import { Component } from '@angular/core';
import { AccesoService } from '../servicios/acceso.service';
import { ModalController, NavController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private accesoService: AccesoService,
    private modalController: ModalController,
    private navController: NavController
  ) { }

  txtUser: string = ""
  txtPassword: string = ""

  login() {
    const body = {
      accion: "login",
      cedula: this.txtUser,
      password: this.txtPassword
    }
    this.accesoService.postData(body).subscribe((response: any) => {
      if (response.status) {
        this.accesoService.createSession("cod_persona", response.data[0].cod_persona)
        this.accesoService.showToast(response.msg)
        this.navController.navigateRoot('/menu')
      } else {
        this.accesoService.showToast(response.msg)
      }
    })

  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    })
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'verificar') {
      this.accesoService.showToast(data)
    }
    if (role === "cancel") {
      this.accesoService.showToast(data)
    }

  }
}
