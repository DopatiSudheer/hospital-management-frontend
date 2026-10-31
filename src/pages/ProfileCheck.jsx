import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import patientService from "../services/patientService";

function ProfileCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          navigate("/login");
          return;
        }

        const response = await patientService.getAllPatients();
        const patients = response.data;

        const patient = patients.find(
          (p) => Number(p.userId) === Number(user.id)
        );

        if (patient) {
          navigate("/dashboard");
        } else {
          navigate("/complete-profile");
        }
      } catch (error) {
        navigate("/complete-profile");
      }
    };

    checkProfile();
  }, [navigate]);

  return null;
}

export default ProfileCheck;
