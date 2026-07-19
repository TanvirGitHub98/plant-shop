import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Mail,
  UserRound,
  Camera,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const {
    user,
    setUser,
    updateUserProfile,
  } = useContext(AuthContext);

  const [displayName, setDisplayName] =
    useState(user?.displayName || "");

  const [photoURL, setPhotoURL] =
    useState(user?.photoURL || "");

  const [isEditing, setIsEditing] =
    useState(false);

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    setDisplayName(
      user?.displayName || "",
    );

    setPhotoURL(
      user?.photoURL || "",
    );
  }, [user]);

  const handleUpdateProfile = async (
    event,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsUpdating(true);

    try {
      await updateUserProfile(
        displayName,
        photoURL,
      );

      setUser({
        ...user,
        displayName,
        photoURL,
      });

      setIsEditing(false);

      setSuccessMessage(
        "Profile updated successfully.",
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Profile update error:",
        error.code,
        error.message,
      );

      if (
        error.code ===
        "auth/requires-recent-login"
      ) {
        setErrorMessage(
          "Please log in again before updating your profile.",
        );
      } else {
        setErrorMessage(
          "Profile could not be updated. Please try again.",
        );
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEditing = () => {
    setDisplayName(
      user?.displayName || "",
    );

    setPhotoURL(
      user?.photoURL || "",
    );

    setErrorMessage("");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <section className="page-hero">
        <span className="eyebrow">
          Your GreenNest
        </span>

        <h1 className="section-title">
          My Profile
        </h1>
      </section>

      <div className="container profile-card">
        <div className="profile-cover" />

        <div className="profile-content">
          <div className="profile-photo">
            <img
              src={
                user?.photoURL ||
                "https://i.pravatar.cc/300?img=12"
              }
              alt={
                user?.displayName ||
                "User profile"
              }
            />

            <span>
              <Camera size={17} />
            </span>
          </div>

          <div className="profile-title">
            <h2>
              {user?.displayName ||
                "Plant Lover"}
            </h2>

            <p>GreenNest member</p>
          </div>

          {errorMessage && (
            <div className="error">
              {errorMessage}
            </div>
          )}

          {isEditing ? (
            <form
              className="profile-form"
              onSubmit={
                handleUpdateProfile
              }
            >
              <label htmlFor="displayName">
                Display name

                <input
                  id="displayName"
                  type="text"
                  required
                  value={displayName}
                  placeholder="Enter your name"
                  onChange={(event) =>
                    setDisplayName(
                      event.target.value,
                    )
                  }
                />
              </label>

              <label htmlFor="photoURL">
                Photo URL

                <input
                  id="photoURL"
                  type="url"
                  required
                  value={photoURL}
                  placeholder="https://example.com/photo.jpg"
                  onChange={(event) =>
                    setPhotoURL(
                      event.target.value,
                    )
                  }
                />
              </label>

              <div>
                <button
                  type="button"
                  className="btn btn-light"
                  disabled={isUpdating}
                  onClick={
                    handleCancelEditing
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating
                    ? "Saving..."
                    : "Save changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div>
                <UserRound />

                <span>
                  <small>
                    Full name
                  </small>

                  <b>
                    {user?.displayName ||
                      "Not provided"}
                  </b>
                </span>
              </div>

              <div>
                <Mail />

                <span>
                  <small>
                    Email address
                  </small>

                  <b>{user?.email}</b>
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="toast">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Profile;