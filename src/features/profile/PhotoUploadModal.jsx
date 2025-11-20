import { useState, useRef, useEffect } from "react";
import "./profile.scss";

const CameraCapture = ({ onPictureTaken, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        onCancel(); 
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleTakePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/jpeg');
      onPictureTaken(imageData);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay className="camera-video"></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="buttons is-centered mt-4">
        <button className="button is-primary" onClick={handleTakePicture}>
          Tomar Foto
        </button>
        <button className="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};


const PhotoUploadModal = ({ isOpen, onClose, onImageSelect }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraOption = () => {
    setIsCameraOn(true);
  };

  const handlePictureTaken = (imageData) => {
    onImageSelect(imageData);
    setIsCameraOn(false);
  };
  
  const handleClose = () => {
    setIsCameraOn(false);
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {isCameraOn ? "Tomar Foto" : "Actualizar Foto de Perfil"}
          </p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>

        <section className="modal-card-body">
          {!isCameraOn ? (
            <div className="upload-options buttons are-large is-centered">
              <button
                className="button is-primary is-outlined"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="icon"><i className="fas fa-upload"></i></span>
                <span>Subir de dispositivo</span>
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                ref={fileInputRef}
              />
              
              <button
                className="button is-primary"
                onClick={handleCameraOption}
              >
                <span className="icon"><i className="fas fa-camera"></i></span>
                <span>Usar Cámara</span>
              </button>
            </div>
          ) : (
            <CameraCapture 
              onPictureTaken={handlePictureTaken}
              onCancel={() => setIsCameraOn(false)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default PhotoUploadModal;