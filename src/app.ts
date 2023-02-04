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
  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      this.peopleInputElement.value
    );
  }
  attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const projInput = new ProjectInput();
