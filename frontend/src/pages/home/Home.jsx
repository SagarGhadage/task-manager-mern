import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/tasks");
  }, []);
  return <div>Not implemented</div>;
}
