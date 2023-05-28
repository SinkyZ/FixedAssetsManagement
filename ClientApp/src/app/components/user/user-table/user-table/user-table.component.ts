import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {

  constructor(private userService: UserService) { }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  userList!: Observable<User[]>;
  userIdToDelete: any;
  userId: any;

  ngOnInit(): void {
    this.refreshUserList();
  }

  addUserForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required]),
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    roleControl: new FormControl('', [Validators.required]),
    phoneControl: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });

  editUserForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required]),
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    roleControl: new FormControl('', [Validators.required]),
    phoneControl: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });

  displayAddModal: boolean = false;
  displayDeleteModal: boolean = false;
  displayEditModal: boolean = false;

  addUser() {
    var newUser = new User();
    newUser.firstName = this.addUserForm.controls.firstNameControl.value!
    newUser.lastName = this.addUserForm.controls.lastNameControl.value!
    newUser.email = this.addUserForm.controls.emailControl.value!
    newUser.phone = this.addUserForm.controls.phoneControl.value!
    newUser.role = this.addUserForm.controls.roleControl.value!

    this.userService.addUser(newUser).subscribe(() => {
      this.refreshUserList();
    });
    this.hideAddDialog();
  }

  refreshUserList() {
    this.userList = this.userService.getAllUsers()
  }

  deleteUser(id?: string) {
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe(() => { this.refreshUserList(); });
    }
    this.hideDeleteDialog();
  }

  updateUser() {
    var user = {
      id: this.userId,
      email: this.editUserForm.controls.emailControl.value!,
      firstName: this.editUserForm.controls.firstNameControl.value!,
      lastName: this.editUserForm.controls.lastNameControl.value!,
      role: this.editUserForm.controls.roleControl.value!,
      phone: this.editUserForm.controls.phoneControl.value!
    }
    this.userService.updateUser(this.userId, user).subscribe(() => { this.refreshUserList(); });
    this.hideEditDialog();
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog() {
    //this.getTLs();
    this.displayAddModal = true;
  }

  hideAddDialog() {
    this.displayAddModal = false;
  }
  showDeleteDialog(user: User) {
    this.displayDeleteModal = true;
    if (user.id) {
      this.userIdToDelete = user.id;
    }
  }

  hideDeleteDialog() {
    this.displayDeleteModal = false;
  }

  showEditDialog(user: User) {
    this.displayEditModal = true;
    if (user.id) {
      this.userId = user.id;
    }

    this.editUserForm.controls.firstNameControl.setValue(user.firstName);
    this.editUserForm.controls.lastNameControl.setValue(user.lastName);
    this.editUserForm.controls.emailControl.setValue(user.email);
    this.editUserForm.controls.roleControl.setValue(user.role);
    this.editUserForm.controls.phoneControl.setValue(user.phone);
  }

  hideEditDialog() {
    this.displayEditModal = false;
  }
}
