import Menu from "@/components/ui/Menu";
import ToolbarLayout from "@/layouts/ToolbarLayout";
import imageCompression from "browser-image-compression";
import imagePlaceHolder from "../assets/images/image-placeholder.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonIcon,
  IonAlert,
  IonSpinner,
} from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { Tag } from "@/types/servicesResponses";
export const imageUploadOptions = {
  maxSizeMB: 0.6,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picture, setpicture] = useState("");
  const [fileMaxSize] = useState(20);
  const [fileAlert, setFileAlert] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [submittingFile, setSubmittingFile] = useState(false);

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
      setSubmittingFile(true);
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
      const newTags = parsedResponse.tags.slice(
        0,
        parsedResponse.tags.length >= 10 ? 10 : parsedResponse.tags.length
      );
      setTags(newTags);
      setSubmittingFile(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Menu /> */}
      <ToolbarLayout title="Image recognition">
        <IonGrid className="main-layout">
          <div className="body">
            <IonRow>
              <IonCol>
                <div className="text-container">
                  <IonText color="primary">
                    <h3 className="text-centered">Welcome</h3>
                  </IonText>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div className="text-container">
                  <IonText color="primary">
                    To start just take or upload a picture, then hit the submit
                    button
                  </IonText>
                </div>
              </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-align-items-center">
              <IonCol size="auto" className="text-centered">
                <div className="picture-container">
                  <img
                    src={picture ? picture : imagePlaceHolder.src}
                    style={{
                      maxHeight: "50vh",
                    }}
                  />
                </div>
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
                Upload
                <IonIcon className="ml-5" icon={cloudUploadOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          {uploadedImg && (
            <IonRow>
              <IonCol>
                <IonButton
                  disabled={submittingFile}
                  onClick={submitImage}
                  size="small"
                  expand="block"
                >
                  {submittingFile ? <IonSpinner></IonSpinner> : "Submit"}
                </IonButton>
              </IonCol>
            </IonRow>
          )}
          {tags.length !== 0 && (
            <IonRow>
              <IonCol
                style={{
                  minHeight: 400,
                  background: "#fff",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tags} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis fontSize={12} dataKey="tag.en" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#3880ff" />
                  </BarChart>
                </ResponsiveContainer>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </ToolbarLayout>
      <IonAlert
        isOpen={fileAlert}
        header="Error"
        subHeader="Max file size reached"
        message="Please pick a file not greater than 20MB"
        buttons={["OK"]}
        onDidDismiss={() => setFileAlert(false)}
      ></IonAlert>
    </>
  );
}
