import { Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { AppContext } from "../context/AppContex";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import axios from "axios";

const Profile = () => {
  const { userData ,token, setToken,
    backEndUrl,getUserProfile } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);


useEffect(() => {

    if(!token){
        window.location.href = '/login'
    }
},[])



  const [formData, setFormData] = useState({
    name: userData?.name ||  "",
    email: userData?.email || "",
    isAdmin: userData?.isAdmin || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSave = async() => {
   
    try {
      const {data}  =  await   axios
            .put(
            `${backEndUrl}/api/users/updateProfile`,
            formData,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            )

            if(data.success){
                getUserProfile()

            }

            console.log(data , "data in update profile")

          
          
            
setIsEdit(false);
    }
    catch (error) {
        console.log(error);
    }
  };

  console.log(userData, "userData in profile");
  return (
    <div className="flex flex-col gap-2 text-sm mb-10 items-center justify-center min-h-[50vh]">
      <Card className="p-10 mt-10">
        <CardHeader>
          <CardTitle>Profile user</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Name:</span> {userData?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData?.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              {userData?.isAdmin ? "Admin" : "User"}
            </p>
          </div>
          <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 text-primary-foreground p-2 rounded-md text-white w-full mt-10"
          >
            Edit Profile
          </button>
        </CardContent>
      </Card>

      {isEdit && (
        <Dialog open={isEdit} onOpenChange={setIsEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Role:
                <select
                  name="isAdmin"
                  value={formData.isAdmin}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "isAdmin", value: e.target.value === "true" },
                    })
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="true">Admin</option>
                  <option value="false">User</option>
                </select>
              </label>
              <button
                onClick={handleSave}
                className="bg-green-600 text-primary-foreground p-2 rounded-md text-white w-full mt-4"
              >
                Save Changes
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Profile;
