// Code goes here!
console.log("%c D&D_Project", "color: red");
//autobind decorator
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    // get the input filds
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    // get the input filds
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement; // get the input filds
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  //METHODS HERE
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    // validations here...
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("Please provide all values");
      return;
    } else {
      return [enteredTitle, enteredDescription, parseInt(enteredPeople)];
    }
  }
  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    // check if it is a tuple
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      this.clearInputs();
      console.log(title, description, people);
    }
  }
  clearInputs() {
    this.element.reset();
  }
  attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const projInput = new ProjectInput();
