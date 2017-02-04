import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';



import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    users = [];
    isLoading = true;

    user = {};
    isEditing = false;

    addUserForm: FormGroup;
    username = new FormControl('', Validators.required);
    password = new FormControl('', Validators.required);
    admin = new FormControl('', Validators.required);
    location = new FormControl('');
    userage = new FormControl('');
    website = new FormControl('');
    meta = new FormControl('');
    createdOn = new FormControl('');
    updatedOn = new FormControl('');

    constructor(private http: Http,
        private dataService: DataService,
        public toast: ToastComponent,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getUsers();
        var isodate = new Date();
        this.addUserForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
            admin: true,
            location: this.location,
            meta: { userage: 30, website: this.website },
            createdOn: isodate,
            updatedOn: isodate


        });
    }

    getUsers() {
        this.dataService.getUsers().subscribe(
            data => this.users = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    createUser() {
        this.dataService.addUser(this.addUserForm.value).subscribe(
            res => {
                let newUser = res.json();
                this.users.push(newUser);
                this.addUserForm.reset();
                this.toast.setMessage('User added successfully.', 'success');
            },
            error => console.log(error)
        );
        //  alert('Hi ravi you are on track');
    }


}
