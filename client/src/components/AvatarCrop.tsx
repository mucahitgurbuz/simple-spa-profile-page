// @ts-ignore
import { Button, Modal, Slider } from "antd";
import React from "react";
// @ts-ignore
import Cropper from "react-easy-crop";

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

// return a promise that resolves with a File instance
const createImage: (url: string) => Promise<HTMLImageElement> = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Crop): Promise<any> {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return Promise.reject(new Error("Could not get canvas context"));
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const url = canvas.toDataURL("image/jpeg");

  return new Promise(resolve => {
    canvas.toBlob(
      (blob: Blob): void => {
        resolve([new File([blob], "fname.jpeg", { type: "image/jpeg" }), url]);
      },
      "image/jpeg",
      0.9
    );
  });
}

interface AvatarCropProps {
  avatarUrl: string | undefined;
  onCropComplete: any;
  modalTitle: string;
}
interface AvatarCropState {
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  croppedAreaPixels: Crop;
  visible: boolean;
}
class AvatarCrop extends React.Component<AvatarCropProps, AvatarCropState> {
  public state = {
    crop: {
      x: 0,
      y: 0
    },
    zoom: 1,
    aspect: 1,
    croppedAreaPixels: { x: 0, y: 0, width: 0, height: 0 },
    visible: false
  };

  public onCropChange = (crop: { x: number; y: number }) => {
    this.setState({ crop });
  };

  public onCropComplete = (
    croppedArea: { x: number; y: number },
    croppedAreaPixels: Crop
  ) => {
    this.setState({ croppedAreaPixels });
  };

  public onZoomChange = (zoom: number) => {
    this.setState({ zoom });
  };

  public cropImage = async () => {
    if (!this.props.avatarUrl) {
      return;
    }
    const [img, url] = await getCroppedImg(
      this.props.avatarUrl,
      this.state.croppedAreaPixels
    );
    this.props.onCropComplete(url, img);
    this.hideModal();
  };

  public hideModal = () => {
    this.setState({ visible: false });
  };

  public showModal = () => {
    this.setState({ visible: true });
  };

  public render() {
    if (!this.props.avatarUrl) {
      return null;
    }
    return (
      <Modal
        title={this.props.modalTitle}
        bodyStyle={{ height: 350 }}
        visible={this.state.visible}
        footer={[
          <Button
            key="done"
            onClick={this.cropImage}
            type="primary"
            htmlType="button"
          >
            Crop
          </Button>,
          <Button key="cancel" onClick={this.hideModal} htmlType="button">
            Cancel
          </Button>
        ]}
      >
        <div className="crop-app">
          <div className="crop-container">
            <Cropper
              image={this.props.avatarUrl}
              crop={this.state.crop}
              zoom={this.state.zoom}
              aspect={this.state.aspect}
              onCropChange={this.onCropChange}
              onCropComplete={this.onCropComplete}
              onZoomChange={this.onZoomChange}
            />
          </div>
          <div className="crop-controls">
            <Slider
              value={this.state.zoom}
              min={1}
              max={2}
              step={0.1}
              tipFormatter={null}
              onChange={this.onZoomChange}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default AvatarCrop;
