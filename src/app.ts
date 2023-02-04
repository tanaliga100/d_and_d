// Code goes here!
console.log("%c D&D_Project", "color: red");

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

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
    this.attach();
  }
  //METHODS HERE
  attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projInput = new ProjectInput();
