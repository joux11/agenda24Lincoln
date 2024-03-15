import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  txtCedula: string = "";
  txtPassword: string = "";
  cod_persona: string = "";
  verificado: boolean = false;
  constructor(
    private accesoService: AccesoService,
    private modalController: ModalController
  ) { }

  verificar() {
    const body = {
      accion: "verificarUser",
      cedula: this.txtCedula
    }
    this.accesoService.postData(body).subscribe((response: any) => {

      if (response.status) {
        this.verificado = true;
        const { cod_persona } = response.data[0]
        this.cod_persona = cod_persona
        //this.changePassword()

      } else {
        this.accesoService.showToast(response.msg)

      }
    })

  }

  changePassword() {
    const body = {
      accion: "resetPassword",
      cod_persona: this.cod_persona,
      password: this.txtPassword

    }



    this.accesoService.postData(body).subscribe((response: any) => {

      if (response.status) {
        this.modalController.dismiss(response.msg, 'verificar');
      } else {
        this.modalController.dismiss(response.msg, 'cancel');
      }
    })
  }

  cancelar() {

  }


}
