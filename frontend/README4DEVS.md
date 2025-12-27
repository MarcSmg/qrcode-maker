# README4DEVS

### Mettre ici toutes les clarifications au sujet du fonctionnement des composantes ou de de packages React.

## Composantes:

### >>> Button: 
    C'est une composante bouton multi-usage qui permet d'ajouter un bouton dans votre page.
    Il servira a declencher des actions, rediriger vers des pages...

**Fonctionnement:**

Il prends les parametres suivants et qui definissent le style, le comportement du bouton:

* **label**: string | texte du bouton
* **onClick**: function | action au clic
* **variant:** "solid" | "outline" | "ghost"
* **bgColor**: string | couleur principale (ex: "#4f46e5" ou "indigo")
* **textColor** = string | couleur de texte (ex: "#ffffff" ou "white")
* **radius**: "none" | "sm" | "md" | "lg" | "full"
* **shadow**: "none" | "sm" | "md" | "lg"
* **icon**: string | nom de l’icône Lucide (ex: "Download")
* **iconPosition**: "left" | "right"
* **disabled**: true | false
* **type**: "button" | "submit" | "reset"

**Explication:**

*-label* c'est le texte qui s'affiche dans le bouton

*-onclick* designe la fonction declenchee au click du bouton

*-variant* designe une variante du bouton. Il y en a 3 au total: 

    - ghost (bouton sans bordure ni bg, juste texte), 
    - outline (bouton avec bordure mais sans bg), 
    - solid (bouton avec bg, sans bordure avec texte souvent blanc ou noir)

Je pense que *textColor* et *bgColor* s'expliquent deja par leurs noms (bg =  background)

*-radius* designe le degre d'arrondi des bordures du bouton. Il y en a 5 au total: 

    - none (bouton sans bordure arrondies), 
    - sm (bouton avec des bordures arrondies a 25% ou un peu moins), 
    - md (bouton avec des bordures arrondies a 50%)
    - lg (bouton avec des bordures arrondies a 75%), 
    - full (bouton avec des bordures arrondies a 100%), 

*-shadow* suit aussi le same principe mais avec les ombres. Il y en a 4 au total ici: 

    - none (bouton sans ombre), 
    - sm (bouton avec une ombre d'opacite 25% ), 
    - md (bouton avec une ombre d'opacite 50%)
    - lg (bouton avec une ombre d'opacite 75%), 

*-icon* est le nom d'une icone de Lucid react ([Check Lucid Icons page by clicking here](https://lucide.dev/icons/)). Ex: Download, ChevronDown...

*-iconPosition*  definit la position de l'icone dans le bouton (**gauche** ou **droite**)

*-disabled* active ou desactive le bouton

*-type* dis si le bouton est de type **submit**, **button** ou **reset**





## Packages:

### >>> react-router-dom




