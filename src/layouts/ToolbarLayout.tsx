import { ToolbarLayoutProps } from "@/types/layouts";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
} from "@ionic/react";
import React from "react";

export default function ToolbarLayout(props: ToolbarLayoutProps) {
  const { title, children } = props;
  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
      <IonFooter>
        <IonToolbar color="primary">
          {/* <IonTitle>Footer</IonTitle> */}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
