import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("myForm") signUpForm: NgForm;
  defaultQuestion: string = "pet";
  answer: string = "";
  genders: string[] = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  };
  isSubmitted: boolean = false;

  suggestUserName(): void {
    const suggestedName = "Superuser";
    // this.submitForm.setValue({
    //   "user-data": {
    //     username: suggestedName,
    //     email: "",
    //   },
    //   secret: "pet",
    //   questionAnswer: "",
    //   gender: "male",
    // });
    this.signUpForm.form.patchValue({
      "user-data": {
        username: suggestedName,
      },
    });
  }

  // onSubmit(myForm: HTMLElement): void {
  //   console.log(myForm);
  // }

  onSubmit(): void {
    this.isSubmitted = true;
    this.user.username = this.signUpForm.value["user-data"].username;
    this.user.email = this.signUpForm.value["user-data"].email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();
  }
}
