import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";


const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      });
      mutateFetchedUser();
      toast.success("Updated!");
      editModal.onClose();
    } catch (error) {
      toast.error("Somting went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    coverImage,
    profileImage,
    mutateFetchedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Input placeholder="Name"
        onChange={(e: any ) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        />
         <Input placeholder="Userame"
        onChange={(e: any ) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        />
         <Input placeholder="Bio"
        onChange={(e: any ) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        />
        <ImageUpload onChange={(image) => setProfileImage(image)} disabled={isLoading} label="Upload profile image" value={profileImage} />
        <ImageUpload onChange={(image) => setCoverImage(image)} disabled={isLoading} label="Upload profile image" value={coverImage} />

    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
export default EditModal;
