import React, { useEffect, useState } from 'react';
import './TrashButton.css';
import axios from 'axios';

interface TrashButtonProps {
  commentId: number;
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function TrashButton({ commentId } : TrashButtonProps){

  const handleDelete = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Token manquant');
        return;
      }
      await axios.delete(`${API_BASE_URL}/secure/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression', error)
    }
  };

  return (
    <button className="trash-button" onClick={handleDelete}><img src="https://i.postimg.cc/DyNN0K01/trash-solid-24.png"></img></button>
  );
};
