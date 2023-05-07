import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";

export default function Menu() {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem button>
            <IonLabel>Pokémon Yellow</IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>Mega Man X</IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>The Legend of Zelda</IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>Pac-Man</IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>Super Mario World</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
