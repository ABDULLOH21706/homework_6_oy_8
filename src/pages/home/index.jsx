import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return null;
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("LocalStorage'dan ma'lumot o'qishda xatolik:", error);
        setError("Ma'lumotni o'qishda xatolik yuz berdi.");
        return null;
      } finally {
        setLoading(false);
      }
    };

    const user = fetchUserFromLocalStorage();
    setUser(user);
  }, []);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <div>
          <p>Ism: {user.first_name}</p>
          <p>Familiya: {user.last_name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Ma'lumotlar topilmadi.</p>
      )}
    </div>
  );
};

export default Home;
