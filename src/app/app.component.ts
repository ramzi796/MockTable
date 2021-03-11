import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService : DataService) { }

  displayedColumns: string[] = ['id', 'ruleName', 'clone', 'delete', 'up', 'down'];
  dataSource!: MatTableDataSource<any>;
  data: any[] = [];
  dataToAdd: any = { };

  ngAfterViewInit(): void {
    this.dataService.getData().subscribe(result => this.data = result );
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
  }

  clone(rowData: any) {
    this.dataToAdd.id = "Cloned-" + rowData.id;
    this.dataToAdd.ruleName = rowData.ruleName + ' cloned';
    let tempData = this.dataSource.data.slice();
    tempData.unshift(this.dataToAdd);
    this.dataSource.data = tempData;
    this.dataToAdd = {};
  }

  delete(id: string) {
    this.dataSource.data = this.dataSource.data.filter(function(element) {
      return element.id != id 
    });
  }

  moveDown(id: string, direction: string) {
    let tempData = this.dataSource.data.slice();
    for(let i=0; i<this.dataSource.data.length; i++) {
      let currentObj = this.dataSource.data[i];
      if(currentObj.id == id) {
        if(direction == 'up' && i > 0) {
          let temp = tempData[i-1];
          tempData[i-1] = tempData[i];
          tempData[i] = temp;
        } else if(direction == 'down' && i<(this.dataSource.data.length - 1)) {
          let temp = tempData[i+1];
          tempData[i+1] = tempData[i];
          tempData[i] = temp;
        }
      }
    }
    this.dataSource.data = tempData;
  }
}
