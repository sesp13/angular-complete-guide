import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  genders = ["male", "female"];
  forbiddenUsernames = ["Chris", "Anna"];
  signUpForm: FormGroup;

  get hobbieControls() {
    return (this.signUpForm.get("hobbies") as FormArray).controls;
  }

  valueSub?: Subscription;
  statusSub?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.setUpForm();
    this.valueSub = this.signUpForm.valueChanges.subscribe((value) =>
      console.log("value changes", value)
    );
    this.statusSub = this.signUpForm.statusChanges.subscribe((status) =>
      console.log("status", status)
    );

    this.signUpForm.setValue({
      userData: {
        username: "Max",
        email: "max@test.com",
      },
      gender: "male",
      hobbies: [],
    });

    this.signUpForm.patchValue({
      userData: {
        username: "anna",
      },
    });
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();
    this.statusSub?.unsubscribe();
  }

  setUpForm(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmails]
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get("hobbies")).push(control);
  }

  onSubmit(): void {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { forbiddenName: true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
