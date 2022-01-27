# Anforderungen

Man kann Zelia logisch in 6 Teile unterteilen:

## Web (User)

Das User-Interface soll zum einem direkt im Browser angeschaut werden können, kann aber auch als PWA heruntergeladen werden. Es ermöglicht das einscannen mit einer Handykamera von den Türschildern die vor jedem Raum hängen, gibt aber auch die Möglichkeit die Raumnummer manuel einzugeben.

Beim einlesen des Türschilds mit der Handykamera wird mittels eines OCR Converters, welcher Voraussichtlich am Client läuft, die Raumnummer aus dem Bild gefiltert.

Wenn die Website nicht mit einem Mobilgerät abgerufen wird, limitiert sich die Eingabe auf eine Texteingabe

Mit dieser Raumnummer werden dann Informationen von dem Server abgefragt und angezeigt.
Als Schnittstelle zwischen Server und Client wird ein Rest-Interface verwendet.
Vorerst sollen dem Client folgende Informationen zur Verfügung gestellt werden:

- Raumname
- Raumeigenschaften
  - Rollstuhl
  - Computer
  - Beamer
  - Wasser
- Stundenplan / Raumbelegung

Diese Informationen werden dann übersichtlich am Client dargestellt. Zusätzlich zu diesen Infos gibt es 2 weitere Links names Melden und Buchen, welche verwendet werden können um defekte Gegenstände zu melden oder einen Raum z.B: für Lerngruppen zu buchen.

Da dies nicht anonym passieren kann muss der Benutzer seine Edu-Mail Adresse angeben über die er einen Bestätigungslink bekommt um ihn zu identifizieren. Diese Email-Adresse kann im Browser gespeichert bleiben. Jedes mal wenn der Benutzer etwas meldet muss er somit nur auf die Email warten und mit dem Link in dieser Bestätigen.

### Web-Components und Internal Routing

Wenn man auf einen Link drückt von dem man erwartet das man auf eine andere Seite weitergeleitet wird, wird man sichtbar auch auf eine neue Seite umgeleitet. Im Hintergrund allerdings bleibt alles auf einer Seite bei der mittels logischem Routing neue Komponenten dynamisch auf die Webseite geladen werden.

## Server (Untis und Infos)

Der Server hat 3 Hauptaufgaben. Der erste Teilbereich ist Informationen über einen beliebigen Raum zur Verfügung zu stellen.

Vorerst werden 2 verschiedene Arten von Informationen zur Verfügung gestellt:

- Eigene Informationen (oben Raumeigenschaften genannt, z.B: hat der Raum einen Computer, Beamer, ...)
- WebUntis Informationen (Stundenplan)

Die eigenen Infos werden von der Datenbank über die Persistenzschicht abgefragt. Über die WebUnits API werden die Stundenplan Daten erhalten und optional in die Datenbank gecached.

## Server (Meldungen von Mängeln)

Über die Rest-Schnittstelle, die für die Client-Kommunikation verwendet wird, soll der Server auf dem Pfad '/report' POST-Requests erwarten und verarbeiten.
Wenn das Client einen defekten Gegenstand meldet wird der Server mittels diesem Post-Request folgende Daten erhalten:

- Benutzer (Wer hat das gemeldet?)
- Raumnummer (Welchen Raum betrifft das?)
- Zeit (Wann? (Im besten Fall seit wann))
- Beschreibung (Was ist defekt?)

Diese Daten werden über die Persistenzschicht abgespeichert und sollen über den Admin Web Client abgefragt und angesehen werden.

## Server (Buchungen)

Sowie bei den Meldungen werden auch hier auf '/book|rent|reservate?' POST-Requests empfangen. Für Buchungen gibt es folgende Daten:

- Benutzer (Wer will buchen?)
- Zweck (Warum braucht man den Raum)
- Raumnummer (Welcher Raum)
- Von (Ab wann)
- Bis (Bis wann)

## Web (Admin)

Der Admin Web Client ist für die Abfrage und Verwaltung der Daten welche Benutzer bei Meldungen und Buchungen zu Verfügung gestellt haben.

Wie schon gesagt gibt es 2 verschiedene Typen der Informationen die angezeigt werden:

- Meldungen
- Buchungen

Bei den Meldungen sieht man die Infos Wer, Wo, Wann und Was gemeldet wurde. Man kann den Status dieser Meldung auf einen der folgenden 4 festlegen:

- Offen
- Erledigt
- Nicht umsetzbar
- Nicht relevant
- In Bearbeitung

Die Buchungen sind ein wenig komplizierter. Die Daten welche bei der Buchungsanfrage angegeben wurden, werden wieder übersichtlich dargestellt. Hier kann man aber keinen Status festlegen sondern nur Akzeptieren oder Ablehnen.

Während beim Ablehnen nur in die Datenbank eingetragen wird das der Antrag nicht genehmigt wurde, wird beim Akzeptieren zusätzlich zum Eintrag der Genehmigung auch noch gespeichert das der Raum im gegebenen Intervall besetzt ist.

Vorerst wird der Benutzer per Email benachrichtigt ob seine Anfrage abgelehnt oder akzeptiert wurde. Darüber hinaus soll es die Möglichkeit geboten werden einen Kommentar mitzusenden. Darin kann z.B. die Information stehen, wer den Raum aufsperrt. Später könnte man noch im Webclient der Benutzer die Möglichkeit einbauen, dass man alle Meldungen und Buchungen, die man getätigt hat, einsehen kann.

## Persistenz (Datenbank)

Die Persistenzschicht ist dafür da die Datenbank zugriffe zu abstrahieren damit es leichter ist vom Server aus Daten zu lesen und schreiben.
Welche tabellen benötigt werden und wie die Architektur aussieht wird später mit Hilfe von Diagrammen abgebildet.

---

# Use Cases

## 1. Mobil

- Benutzer öffnet die Zelia Website am Handy
- Benutzer liest Raumnummer mit der Kamera ein oder gibt sie händisch ein
- Benutzer werden folgende Informationen angezeigt:
  - Stundenplan / Raumbelegung
  - Raumname
  - Raumeigenschaften
    - Rollstuhltauglich
    - hat Computer
    - hat Beamer + Anschlussmöglichkeiten
- -> [Raumbuchung](#raumbuchung) oder [Defekt Melden](#defekt-melden)

## 2. Desktop (Users)

- Benutzer öffnet die Zelia Website am Desktop
- Benutzer gibt die Raumnummer händisch ein
- Benutzer werden folgende Informationen angezeigt:
  - Stundenplan / Raumbelegung
  - Raumname
  - Raumeigenschaften
    - Rollstuhltauglich
    - hat Computer
    - hat Beamer + Anschlussmöglichkeiten
- -> [Raumbuchung](#raumbuchung) oder [Defekt Melden](#defekt-melden)

> ### Raumbuchung

- Benutzer klickt auf "Raum Buchen"

- Benutzer gibt folgende Daten ein:
  - Von und bis Wann
  - den Verwendungszweck
  - seine Edu-Mail Adresse
- Wenn die angegebenen Daten valide sind kann der Benutzer auf "Raum Buchen" drücken.

- Der Benutzer erhält eine Email mit einem Bestätigungslink.
- Benutzer klickt auf den Bestätigungslink.
- Buchungsanfrage wurde gespeichert und der Benutzer wird informiert, dass er eine Bestätigung oder Ablehnung per E-Mail bekommen wird.

> ### Defekt Melden

- Benutzer klickt auf "Defekt Melden"

- Benutzer gibt die benötigten Daten ein:
  - Edu-Email Adresse
  - Zeit (Wann? (Im besten Fall seit wann))
  - Beschreibung (Was ist defekt?)
- Benutzer klickt auf "Defekt Melden"

- Benutzer bekommt eine E-Mail mit einem Link um die eingegebenen Daten und Persönlichkeit zu bestätigen.
- Benutzer klickt auf den Link in der Email um die Meldung zu bestätigen

---

## 3. Desktop (Admin)

- Benutzer öffnet die Zelia Website auf der Route '/admin' am Desktop
- Benutzer meldet sich mit den Anmeldedaten an.

- Benutzer kann ansehen ob er Meldungen oder Buchungen anschauen will.
- Alle Meldungen werden untereinander gelistet sortiert nach Datum und Status.
- Die Mängel haben ein Dropdown mit dem man den Status (wie oben definiert) ändern kann.
- Eine Raumbuchung kann mit 2 Knöpfen per Klick bestätigt oder abgelehnt werden. Dabei kann ein Kommentar hinzugefügt werden, in welchem Informationen übermittelt werden können, wie z.B. von wem der Raum aufgeschlossen wird. Diese Information wird an die buchende Person per E-Mail übermittelt.