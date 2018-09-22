import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ServersService } from "../../services/servers.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html"
})
export class InfoComponent implements OnInit {
  constructor(
    private _serversService: ServersService,
    private modalService: NgbModal
  ) {}
  infoAll: any;
  recent: any = [];
  //visible: boolean = false;

  /**Informacion por notaria */
  infoId: any;
  dataId: boolean = false;
  discLength: any;
  isDecoded: boolean = false;
  closeResult: any;

  now: any = moment(Date.now());

  //fechaAnterior: any = moment(Date.parse("Mon Sep 17 12:46:55 CDT 2018"));

  ngOnInit() {
    this.searchData();
    //console.log(this.now, this.fechaAnterior);

    /*console.log(
      this.now.diff(this.fechaAnterior, "minutes"),
      " horas de diferencia"
    );*/
  }

  searchData() {
    this._serversService.data().subscribe(
      (res: any) => {
        this.infoAll = res.data;
        this.lastLoad();
      },
      err => {
        console.log(err);
      }
    );
  }

  lastLoad() {
    this.infoAll.map(not => {
      this.recent.push(not.info[not.info.length - 1]);
    });
  }

  searchDataId(id) {
    this._serversService.dataId(id).subscribe(
      (res: any) => {
        this.infoId = res.data;
        this.discLength = this.infoId.info.length;
      },
      err => {
        console.log(err);
      }
    );
  }

  selectNotaria(id) {
    if (id === "0" || id === "") {
      this.dataId = false;
    } else {
      this.dataId = true;
      this.searchDataId(id);
    }
  }

  /*isVisible() {
    this.visible = !this.visible;
  }*/

  /*Funciones para establecer colores a los campos de discos*/

  porcentYellow(path: string, porcentaje: any, avail: any) {
    if (
      path === "/" ||
      path === "/mnt/datos/share" ||
      path === "/mnt/datos/log"
    ) {
      porcentaje = porcentaje.split("%")[0];
      porcentaje = parseInt(porcentaje);
      if (porcentaje >= 50 && porcentaje <= 79) {
        return true;
      }
      return;
    }

    if (avail.includes("K")) {
      avail = avail.replace("K", "");
      avail = parseFloat(avail);
      avail = "0G";
    } else if (avail.includes("M")) {
      avail = avail.replace("M", "");
      avail = parseFloat(avail);
      avail = avail / 1000 + "G";
    }

    avail = avail.replace("G", "");
    avail = parseInt(avail);
    //console.log(path, avail)
    if (avail > 100 && avail <= 200) {
      return true;
    }
    return false;
  }

  porcentRed(path: string, porcentaje: any, avail: any) {
    if (
      path === "/" ||
      path === "/mnt/datos/share" ||
      path === "/mnt/datos/log"
    ) {
      porcentaje = porcentaje.split("%")[0];
      porcentaje = parseInt(porcentaje);
      if (porcentaje >= 80 && porcentaje <= 100) {
        return true;
      }
      return;
    }

    if (avail.includes("K")) {
      avail = avail.replace("K", "");
      //avail = parseFloat(avail);
      avail = "0G";
    } else if (avail.includes("M")) {
      avail = avail.replace("M", "");
      avail = parseFloat(avail);
      avail = avail / 1000 + "G";
    }

    avail = avail.replace("G", "");
    avail = parseInt(avail);

    //console.log(path, avail)
    porcentaje = porcentaje.split("%")[0];
    porcentaje = parseInt(porcentaje);
    //console.log(porcentaje)

    if (avail <= 100 && porcentaje > 50) {
      return true;
    }
    return false;
  }

  values(path: string, porcentaje: any, avail: any) {
    if (
      path === "/" ||
      path === "/mnt/datos/share" ||
      path === "/mnt/datos/log"
    ) {
      return porcentaje;
    }
    return avail;
  }

  /*Funcion para separar el nombre de el fylesystem */

  cutName(path: any) {
    path = path.split("/");
    let lengthPath = path.length;
    path = path[lengthPath - 1];
    if (path === "") {
      return "raiz";
    }
    return path;
  }

  /*Funcion para calcular los meses de mantenimiento */

  dateMaintenance(date: any) {
    if (date === "" || date === undefined) {
      return "No se recibio fecha";
    }
    date = moment(Date.parse(date));

    return this.now.diff(date, "months");
  }

  /*Funcion para calcular la fecha del server*/

  dateServer(date: any) {
    if (date === "" || date === undefined) {
      return "No se recibio fecha";
    }
    date = moment(Date.parse(date));

    return this.now.diff(date, "hours");
  }

  /*Funcion para calcular los dias de respaldo */

  dateBack(date: any) {
    if (date === "" || date === undefined) {
      return "No se recibio fecha";
    }
    date = moment(Date.parse(date));

    return this.now.diff(date, "days");
  }

  /*Funcion para desencriptar */

  base64(str: string) {
    return  atob(str);
  }

  porcents(porcentaje: any) {
    porcentaje = porcentaje.split("%")[0];
    porcentaje = parseInt(porcentaje);
    console.log(porcentaje)
    return porcentaje;
  }

  /*Funcion para Modal*/

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  
  /* ********************************************************************* */
  
  /*
  decoded(str: string) {
    this.isEncoded = true;
    return atob(str);
  }

  encoded(str: string) {
    this.isEncoded = false;
    return btoa(str);
  }
  */

  /*availYellow(path: any, avail: any) {
    if(path != '/' || path != '/mnt/datos/share'){
      return
    }
    avail = avail.replace('G', '')
    avail = parseInt(avail)
    console.log(avail)
    if (avail > 100 && avail <= 200) {
      return true;
    }
    return false;
  }*/

  /*availRed(path: any, avail: any) {
    if(path != '/' || path != '/mnt/datos/share'){
      return
    }
    avail = avail.replace('G', '')
    avail = parseInt(avail)
    console.log(avail)
    if (avail <= 100) {
      return true;
    }
    return false;
  }*/

  /*
  oneDayBefore(date: any) {
    if (date === "" || date === null || date === undefined) {
      return;
    }
    date = new Date(date);

    if (date < this.dateNow) {
      return true;
    }
    return false;
  }

  maintenance(date: any){
    if (date === "" || date === null || date === undefined) {
      return;
    }
    date = new Date(date);

    if(date.getMonth() < this.dateNow.getMonth() && date.getFullYear() <= this.dateNow.getFullYear()){
      return true
    }
    return false
  }

  hours(date: any){
    if (date === "" || date === null || date === undefined) {
      return;
    }
    console.log(date.getHours())

  }*/
}
