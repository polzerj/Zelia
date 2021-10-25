# 1 WebComponents

## 1.1 Intro

Web-Komponenten sind wiederverwendbare HTML Elemente bei denen man den Aufbau selber definieren kann um neue logische HTML-Tags zu erstellen.

### 1.1.1 Warum kein Framework (React, Angular, ...)

Haben damit gearbeitet.
Nicht notwendig externe bibliotheken für diesen Zweck.
eigene kleine bibliothek ist besser und ladezeiten schneller.

## 1.2 Standard

## 1.3 Implementation

Um unsere eigenes Framework zu schreiben haben wir auf diesen Standard aufgebaut. Eine abstrakte Klasse soll helfen die benötigten Komponenten zu definieren.

```ts
export default abstract class Component extends HTMLElement {
  //...

  constructor(tagName: string) {
    super();

    this.attachShadow({ mode: "open" });
    this.htmlSoucre = getComponentTemplateAsString(tagName);

    this.bindMethodsCallback();
    this.render(true);
  }

  //...
}
```

Somit muss man, wenn man einen neuen Komponenten erstellen will, von dieser Klasse erben und einen Tag-Namen angeben. Der Tag name wird benötigt, dass der zugehörige HTML Code geladen werden kann. Damit dies nicht die Ladezeiten der Seite stark belastet, wird direkt am Anfang begonnen notwendige Ressourcen herunter zu laden. Das Herunterladen der notwendigen daten und das definieren der Komponenten passiert im Component Loader.

```ts
let components: ComponentInfo[] = [
  {
    tagName: "test-component",
    type: Test,
    path: "/Test.html",
  },
  //...
];

initializeComponents(components).then(main);
```

Erst nachdem der Component-Loader die Ressourcen fertig geladen hat wird die seite gestartet. Von nun an können wir direkt ohne Verzögerungen die Komponenten in die Seite hinzufügen oder entfernen und da die Komponenten-Ressourcen von der Datengröße sehr klein sind ist die Verzögerung die am Anfang logisch Auftreten sollte nicht einmal spürbar.

Damit dynamisch ein Anzeigetext in den Instanzen der Komponenten geändert werden kann, gibt es die Möglichkeit ähnlich wie bei anderen Bibliotheken, Platzhalter zu setzen welche dann jederzeit geändert werden können.

```html
<h1>Hello World!</h1>

<p>{{infoText}}</p>
```

```ts
testComponent.setState("infoText", "Welcome to ZELIA");
```

Damit kann man im nachhinein Text ändern, den man am Anfang falsch bedacht hat. Noch wichtiger ist aber, dass man mit dieser Funktion ohne viel zu ändern, verscheide Sprachen anzeigen kann.

Das letzte Wichtige was unser Komponenten System kann, ist automatisch Referenzen auf gewünschte HTML-Elemente innerhalb der Komponente zu bekommen.

```html
<h1>Hello World!</h1>

<button id="btnSubmit">{{btnSubmitText}}</button>
```

Zum Beispiel kann die Komponente automatisch eine Referenz auf diesen Knopf bekommen.

```ts
interface HtmlElementReferenceTypes {
  button: HTMLButtonElement;
}

class Test extends Component<HtmlElementReferenceTypes> {
  constructor() {
    super("test-component", { button: "#btnSubmit" });

    this.setState("btnSubmitText", "Click");
    this.elements.button.textContent += " Me";
  }
}
```

Im Superkonstruktoraufruf wird der gewünschte Name über den das Element aufrufbar sein soll gegeben und wie das Element gefunden wird. Das Interface wird nur benötigt um sagen zu können welches Element welchen Typ haben wird um eine automatische Vervollständigung zu bekommen. In diesem Beispiel wird dem Platzhalter-Ersetzungsverfahren dem Knopf der Text "Click" hinzugefügt und danach ein "Click Me" daraus gemacht um zu sehen, dass das Element richtig geladen wurde.

### 1.3.1 Room info - Component

### 1.3.2 Timetable - Component

### 1.3.3 Room input - Component

### 1.3.4 OCR - Component

Links:
https://www.webcomponents.org/introduction
https://reactjs.org
