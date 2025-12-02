import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { Pizza } from '../../../interfaces/pizza';
import { enviroment } from '../../../../enviroment/enviroment';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { NumberformatPipe } from "../../../pipes/numberformat-pipe";
import { Lightbox } from "../../system/lightbox/lightbox";

declare var bootstrap: any;

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberformatPipe, NgIf, Lightbox],
  templateUrl: './pizzas.html',
  styleUrls: ['./pizzas.scss'],
})
export class Pizzas implements OnInit, AfterViewInit {
   serverUrl = enviroment.serverUrl;
  lightboxVisible = false;
  lightboxImage = '';

  // lapozóhoz szükséges változók
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pagedPizzas: Pizza[] = [];

  selectedFile: File | null = null;
  
  formModal: any;
  confirmModal: any;

  editMode = false;

  currency = enviroment.currency;

  pizzas: Pizza[] = [];

  pizza: Pizza = {
    id: 0,
    name: '',
    image: '',
    description: '',
    calory: 0,
    price: 0
  };

  startIndex = 1;
  endIndex = 1;

  constructor(
    private api: Apiservice,
    private message: MessageService
  ) { }
  
  ngOnInit(): void {
    this.getPizzas(); // Fetch pizzas in ngOnInit
  }

  ngAfterViewInit(): void {
    // Initialize modals after the view has been fully initialized
    this.formModal = new bootstrap.Modal(document.getElementById('formModal'));
    this.confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
  }

  getPizzas() {
    this.api.selectAll('pizzas').then(res => {
      if (res && res.data) {
        this.pizzas = res.data;
        console.log('Fetched pizzas:', this.pizzas); // Debugging
        this.totalPages = Math.ceil(this.pizzas.length / this.pageSize);
        this.setPage(1); // Initialize the first page
      } else {
        console.error('Failed to fetch pizzas or no data returned.');
        this.pizzas = [];
        this.pagedPizzas = [];
        this.totalPages = 0;
      }
    }).catch(err => {
      console.error('Error fetching pizzas:', err);
      this.pizzas = [];
      this.pagedPizzas = [];
      this.totalPages = 0;
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      console.warn('Invalid page number:', page);
      return;
    }
  
    this.currentPage = page;
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  
    // Slice the pizzas array to get the current page's pizzas
    this.pagedPizzas = this.pizzas.slice(this.startIndex, this.endIndex);
    console.log('Paged pizzas:', this.pagedPizzas);
  }

  getPizza(id: number) {
    this.api.select('pizzas', id).then(res => {
      this.pizza = res.data[0];
      this.editMode = true;
      this.formModal.show();
    });
  }

  async save() {

    if (!this.pizza.name || this.pizza.price == 0 || this.pizza.calory == 0) {
      this.message.show('danger', 'Hiba', 'Nem adtál meg minden kötelezős adatot!');
      return;
    }

      if (this.selectedFile){
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        const res = await this.api.upload(formData);

        if (res.status != 200){
          this.message.show('danger', 'Hiba', res.message!);
        }
        else{
          this.pizza.image = res.data.filename;
        }
        this.getPizzas();

      }

    if (this.editMode) {

      // pizza módosítása
      this.api.selectAll('pizzas/name/eq/' + this.pizza.name).then(res => {

        if (res.data.length != 0 && res.data[0].id != this.pizza.id) {
          this.message.show('danger', 'Hiba', 'Van már ilyen nevű pizza!');
          return;
        }

       // this.pizza.image = '';

        this.api.update('pizzas', this.pizza.id, this.pizza).then(res => {
          this.message.show('success', 'Ok', 'A pizza módosítva!');
          this.formModal.hide();
          this.editMode = false;
          this.pizza = {
            id: 0,
            name: '',
            image: '',
            description: '',
            calory: 0,
            price: 0
          };
          this.getPizzas();
        });

      });

    }
    else {

      // Új pizza felvétele

      this.api.selectAll('pizzas/name/eq/' + this.pizza.name).then(res => {
        if (res.data.length != 0) {
          this.message.show('danger', 'Hiba', 'Van már ilyen nevű pizza!');
          return;
        }

        this.api.insert('pizzas', this.pizza).then(res => {
          this.message.show('success', 'Ok', 'A pizza hozzáadva!');
          this.formModal.hide();
          this.pizza = {
            id: 0,
            name: '',
            image: '',
            description: '',
            calory: 0,
            price: 0
          };
          this.getPizzas();
        });

      });

    }
  }

  confirmDelete(id: number) {
    this.pizza.id = id;
    this.confirmModal.show();
  }

  delete(id: number) {
    let pizza = this.pizzas.find(item => item.id == id);

    if (pizza && pizza.image != ''){
      this.api.deleteImage(pizza.image!);
    }

    this.api.delete('pizzas', id).then(res => {
      this.message.show('success', 'Ok', 'A pizza törölve!');
      this.confirmModal.hide();
      this.pizza = {
        id: 0,
        name: '',
        image: '',
        description: '',
        calory: 0,
        price: 0
      };
      this.getPizzas();
    });
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  deleteImage(id: number, filename: string){
    this.api.deleteImage(filename).then(res =>{
       if (res.status == 200){
        this.pizza.image = '';
        this.api.update('pizzas', id, this.pizza).then(res => {
          this.message.show('success', 'Ok', 'A kép törölve!');
        });
        this.getPizzas();
       }
       
    });
  }

  openLightbox(image: string){
    this.lightboxImage = this.serverUrl + '/uploads/' + image;
    this.lightboxVisible = true;
  }


  cancel(){
    this.pizza = {
      id: 0,
      name: '',
      image: '',
      description: '',
      calory: 0,
      price: 0
    };
    this.getPizzas(); // ezt csak akkor ha volt változás pl kép törlés
    this.formModal.hide();
  }
}
