import { Component, OnInit } from "@angular/core";
import { ServersService } from "../../services/servers.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html"
})
export class InfoComponent implements OnInit {
  constructor(private _serversService: ServersService) {}
  infoAll: any;
  recent: any = [];
  visible: boolean = false;
  /**Informacion por notaria */
  infoId: any;
  dataId: boolean = false;
  dateNow: any = new Date();
  discLength: any

  ngOnInit() {
    this.searchData();
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
        this.discLength = this.infoId.info.length
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

  isVisible() {
    this.visible = !this.visible;
  }


  /*Funciones para establecer colores a los campos de discos*/

  porcentYellow(path: string, porcentaje: any, avail: any) {

    if(path === '/' || path === '/mnt/datos/share'){
      porcentaje = porcentaje.split("%")[0];
      porcentaje = parseInt(porcentaje);
      if (porcentaje >= 50 && porcentaje <= 79) {
        return true;
      }
      return
    }
    avail = avail.replace('G', '')
    avail = parseInt(avail)
    //console.log(path, avail)
    if (avail > 100 && avail <= 200) {
      return true;
    }
    return false
  }

  porcentRed(path: string, porcentaje: any, avail: any) {

    if(path === '/' || path === '/mnt/datos/share'){
      porcentaje = porcentaje.split("%")[0];
      porcentaje = parseInt(porcentaje);
      if (porcentaje >= 80 && porcentaje <= 100) {
        return true;
      }
      return
    }
    avail = avail.replace('G', '')
    avail = parseInt(avail)
    //console.log(path, avail)
    if (avail <= 100) {
      return true;
    }
    return false;

  }

  values(path: string, porcentaje: any, avail: any){
    if(path === '/' || path === '/mnt/datos/share'){
      return porcentaje
    }
    return avail
  }
  /* ********************************************************************* */

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

  /*Funcion para separar el nombre de el fylesystem */

  cutName(path: any){
    path = path.split('/')
    let lengthPath = path.length
    path = path[lengthPath-1]
    if(path === '') {
      return 'raiz'
    }
    return path
  }




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
