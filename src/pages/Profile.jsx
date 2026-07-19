import { use, useEffect, useState } from "react";
import { Mail, UserRound, Camera } from "lucide-react";
import ProtectedRoute from "../Routes/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
 const Profile=()=> {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
const ProfileContent=()=> {
  const { user, updateUser } = use(AuthContext);
  const [n, setN] = useState(user?.displayName || ""),
    [photo, setPhoto] = useState(user?.photoURL || ""),
    [editing, setEditing] = useState(false),
    [toast, setToast] = useState("");
  useEffect(() => {
    setN(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);
  const save = async (e) => {
    e.preventDefault();
    await updateUser(n, photo);
    setEditing(false);
    setToast("Profile updated successfully.");
    setTimeout(() => setToast(""), 3000);
  };
  return (
    <div className="profile-page">
      <section className="page-hero">
        <span className="eyebrow">Your GreenNest</span>
        <h1 className="section-title">My Profile</h1>
      </section>
      <div className="container profile-card">
        <div className="profile-cover" />
        <div className="profile-content">
          <div className="profile-photo">
            <img
              src={user?.photoURL || "https://i.pravatar.cc/300?img=12"}
              alt="User"
            />
            <span>
              <Camera size={17} />
            </span>
          </div>
          <div className="profile-title">
            <h2>{user?.displayName || "Plant Lover"}</h2>
            <p>GreenNest member</p>
          </div>
          {editing ? (
            <form onSubmit={save} className="profile-form">
              <label>
                Display name
                <input
                  required
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </label>
              <label>
                Photo URL
                <input
                  required
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </label>
              <div>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Save changes</button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div>
                <UserRound />
                <span>
                  <small>Full name</small>
                  <b>{user?.displayName || "Not provided"}</b>
                </span>
              </div>
              <div>
                <Mail />
                <span>
                  <small>Email address</small>
                  <b>{user?.email}</b>
                </span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
export default Profile