import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import PhotoUploadModal from "./PhotoUploadModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", image: "" });
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);  
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (imageData) => {
    setFormData({ ...formData, image: imageData });
    setIsPhotoModalOpen(false); // Cierra el modal
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setUser(formData);

    const usersStorage = localStorage.getItem("users");
    
    if (usersStorage) {
        const users = JSON.parse(usersStorage);
        const updatedUsers = users.map((u) =>
        u.email === user.email ? { ...u, ...formData } : u
    );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setIsEditing(false);
    window.dispatchEvent(new Event("userChanged"));
  };

  if (!user) {
    return <p className="loading">Cargando perfil...</p>;
  }

  return (
    <>
    <section className="section profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={
                formData.image ||
                `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=00b37e&color=fff&size=160`
              }
              alt="Avatar"
              className="avatar"
            />
            {isEditing && (
              <button 
              type="button"
              className="upload-btn"
              onClick={() => setIsPhotoModalOpen(true)}
              >
              Cambiar foto
              </button>
            )}
          </div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-body">
          {!isEditing ? (
            <>
              <div className="info-row">
                <span className="label">Nombre:</span>
                <span className="value">{user.firstName}</span>
              </div>
              <div className="info-row">
                <span className="label">Apellido:</span>
                <span className="value">{user.lastName}</span>
              </div>
              <div className="info-row">
                <span className="label">Correo:</span>
                <span className="value">{user.email}</span>
              </div>

              <div className="buttons">
                <button className="button edit-btn" onClick={handleEdit}>
                    Editar perfil
                </button>
                <button className="button logout-btn" onClick={handleLogout}>
                    Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="edit-form">
              <div className="field">
                <label>Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="buttons">
                <button type="submit" className="button save-btn">Guardar</button>
                <button type="button" className="button cancel-btn" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    
    {isPhotoModalOpen && (
        <PhotoUploadModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          onImageSelect={handleImageSelect}
        />
      )}
    </>
  );
};

export default Profile;
