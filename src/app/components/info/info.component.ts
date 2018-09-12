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
        console.log(this.infoId);
      },
      err => {
        console.log(err);
      }
    );
  }

  selectNotaria(id) {
    if (id === "0" || id === "") {
      console.log("Seleccionaste la opcion todos");
      this.dataId = false;
    } else {
      this.dataId = true;
      this.searchDataId(id);
    }
  }

  isVisible() {
    this.visible = !this.visible;
  }
}
