# Anforderungen

Man kann Zelia logisch in 6 Teile unterteilen:

## Web (User)

Das User-Interface soll zum einem direkt im Browser angeschaut werden können, kann aber auch als PWA heruntergeladen werden. Es ermöglicht das einscannen mit einer Handykamera von den Türschildern die vor jedem Raum hängen, gibt aber auch die Möglichkeit die Raumnummer manuel einzugeben.

Beim einlesen des Türschilds mit der Handykamera wird mittels eines OCR Converters, welcher Voraussichtlich am Client läuft, die Raumnummer aus dem Bild gefiltert.

Wenn die Website nicht mit einem Mobilgerät abgerufen wird, limitiert sich die Eingabe auf eine Texteingabe

Mit dieser Raumnummer werden dann Informationen von dem Server abgefragt und angezeigt.
Als Schnittstelle zwischen Server und Client wird ein Rest-Interface verwendet.
Vorerst sollen dem Client folgende Informationen zu Verfügung gestellt werden:

-   Raumname
-   Raumeigenschaften
    -   Rollstuhl
    -   Computer
    -   Beamer
    -   Wasser
-   Stundenplan / Raumbelegung

Diese Informationen werden dann übersichtlich am Client dargestellt. Zusätzlich zu diesen Infos gibt es 2 weitere Links names Melden und Buchen, welche verwendet werden können um defekte gegenstände zu melden oder einen Raum z.B: für lerngruppen zu buchen.

### Webcomponents und Internal Routing

Wenn man auf einen Link drückt von dem man erwartet das man auf eine andere Seite weitergeleitet wird, wird man sichtbar auch auf eine neue Seite umgeleitet. Im Hintergrund allerdings bleibt alles auf einer Seite bei der mittels logischem Routing neue Componenten dynamisch auf die Webseite geladen werden.

## Server (Meldungen von Mängeln)

Der

## Server (Buchungen)

## Server (Units und Infos)

Die Units schnittstelle

## Web (Admin)

## Persistenz

# Use Cases

## 1. Mobil

-   Benutzer öffnet die Zelia Website am Handy
-   Benutzer liest Raumnummer mit der Kamera ein oder gibt sie händisch ein
-   Benutzer werden folgende Informationen angezeigt:
    -   Stundenplan / Raumbelegung
    -   Raumname
    -   Raumeigenschaften
        -   Rollstuhl
        -   Computer
        -   Beamer

## 2. Desktop (Users)

-   Benutzer öffnet die Zelia Website am Desktop
-   Benutzer gibt die Raumnummer händisch ein

## 3. Desktop (Admin)

-   Benutzer öffnet die Zelia Website auf der Route '/admin' am Desktop
-   Benutzer meldet sich mit den Anmeldedaten an.
-   Wenn der Benutzer dich soll es eine Übersicht über alle gemeldeten Mängel und Raumbuchungsanfragen geben
-   Wenn man auf einen Mangel Klickt, können Details darüber angezeigt werden, bzw. kann dieser Mangel als behoben oder nicht relevant markiert werden.
-   Durch klicken auf eine Raumbuchung kann diese Bestätigt oder Abgelehnt werden. Dabei kann ein Kommentar hinzugefügt werden, in welchem Informationen übermittelt werden können, wie z.B. von wem der Raum aufgeschlossen wird. Diese Information wird an die buchende Person per E-Mail übermittelt.
