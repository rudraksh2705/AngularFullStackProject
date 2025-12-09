import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './service/product';
import { ChangeDetectionStrategy } from '@angular/core';

interface UserData {
  name: string;
  age: string;
  phoneNo: string;
  _id: string;
  _v: 0
}


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class App {
  public formData: {
    name: string,
    age: string,
    phoneNo: string,
    _id?: string
  } = { name: "", age: "", phoneNo: "" };
  public details: { name: string, age: string, phoneNo: string, _id: string }[] = [];

  constructor(private api: Product, private cd: ChangeDetectorRef) {

  }

  public handleSave() {
    if (!this.formData.name || !this.formData.age || !this.formData.phoneNo) {
      alert("Please enter all Fields");
      return;
    }

    if (this.formData._id) {
      this.api.updateData(this.formData, this.formData._id).subscribe((data) => {
        console.log(data);
        this.api.getDatabase().subscribe((res: { status: string; data: UserData[] }) => {
          console.log(res.data);
          const validData = res.data.map(arg => {
            return {
              name: arg.name,
              age: `${arg.age}`,
              phoneNo: `${arg.phoneNo}`,
              _id: arg._id
            };
          });

          console.log(validData, "ngOn");
          this.details = [...validData];
          this.cd.detectChanges();
        });
      });
    }
    else {
      this.api.createData(this.formData).subscribe((res: { status: string; data: UserData[] }) => {
        this.api.getDatabase().subscribe((res: { status: string; data: UserData[] }) => {
          console.log(res.data);
          const validData = res.data.map(arg => {
            return {
              name: arg.name,
              age: `${arg.age}`,
              phoneNo: `${arg.phoneNo}`,
              _id: arg._id
            };
          });

          console.log(validData, "ngOn");
          this.details = [...validData];
          this.cd.detectChanges();
        });
      });
    }
  }

  public handleDelete(_id: string) {
    this.api.deleteData(_id).subscribe((res: { status: string; data: UserData[] }) => {
      this.api.getDatabase().subscribe((res: { status: string; data: UserData[] }) => {
        console.log(res);
        const validData = res.data.map(arg => {
          return {
            name: arg.name,
            age: `${arg.age}`,
            phoneNo: `${arg.phoneNo}`,
            _id: arg._id
          };
        });

        console.log(validData, "ngOn");
        this.details = [...validData];
        this.cd.detectChanges();
      });
    });
  }

  public handleUpdate(_id: string) {
    this.api.getData(_id).subscribe((res: { status: string, data: UserData }) => {
      this.formData = res.data;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.api.getDatabase().subscribe((res: { status: string; data: UserData[] }) => {
      console.log(res.data);
      const validData = res.data.map(arg => {
        return {
          name: arg.name,
          age: `${arg.age}`,
          phoneNo: `${arg.phoneNo}`,
          _id: arg._id
        };
      });

      console.log(validData, "ngOn");
      this.details = [...validData];
      this.cd.detectChanges();
    });
  }
}