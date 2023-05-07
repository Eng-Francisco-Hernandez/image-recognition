import Menu from "@/components/ui/Menu";
import ToolbarLayout from "@/layouts/ToolbarLayout";
import imageCompression from "browser-image-compression";
import imagePlaceHolder from "../assets/images/image-placeholder.jpg";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { useRef, useState } from "react";
export const imageUploadOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picture, setpicture] = useState("");
  const [fileMaxSize] = useState(20);
  const [fileAlert, setFileAlert] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].size > fileMaxSize * 1024 * 1024) {
      setFileAlert(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = function (input) {
      if (typeof input.target?.result === "string") {
        setpicture(input?.target?.result);
        setUploadedImg(true);
      }
    };
    try {
      const compressedFile = await imageCompression(
        e.target.files[0],
        imageUploadOptions
      );
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const submitImage = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/image-recognition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageBase64: picture,
          }),
        }
      );
      const parsedResponse = await res.json();
      console.log(parsedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menu />
      <ToolbarLayout title="Image recognition">
        <IonGrid className="main-layout">
          <div className="body">
            <IonRow>
              <IonCol>
                <IonText color="primary">
                  <h3 className="text-centered">Welcome</h3>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText color="primary">Take or upload a picture</IonText>
              </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-align-items-center">
              <IonCol size="auto" className="text-centered">
                <img
                  className="avatar"
                  src={picture ? picture : imagePlaceHolder.src}
                  style={{
                    maxHeight: "50vh",
                  }}
                />
              </IonCol>
            </IonRow>
          </div>
          <input
            ref={fileInputRef}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            onChange={onChangeFile}
            style={{ display: "none" }}
          ></input>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={() => fileInputRef?.current?.click()}
                size="small"
                expand="block"
              >
                Upload{" "}
                <IonIcon className="ml-5" icon={cloudUploadOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          {uploadedImg && (
            <IonRow>
              <IonCol>
                <IonButton onClick={submitImage} size="small" expand="block">
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </ToolbarLayout>
    </>
  );
}
