import React from 'react'
import AdminDash from './AdminDash';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';

function DashboardRouter() {


      const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
          const token = sessionStorage.getItem("token");
          if (!token) {
            setUser("User");
            setLoading(false);
            return;
          }
          try {
            const response = await fetch(
              "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (!response.ok)
              throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setUser(data.name);
            setUserData(data);
            setLoading(false);
            // console.log("User data fetched successfully:", data);
          } catch (error) {
            setUser("User");
          }
        };
        fetchUserData();
      }, []);


      if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8ed]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );

    else if(userData.role === "ADMIN") {
        return(
            <AdminDash/>
        );
    }
    else{
        return(
            <Dashboard/>
        );
    }

  
}

export default DashboardRouter