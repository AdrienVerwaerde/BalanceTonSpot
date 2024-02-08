import React from 'react';
import './Admin.css'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href=".././index.php">Retour au site</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="../admin/" style={{ fontWeight: 'bold' }}>Ajouter</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="delete.php">Supprimer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="products.php">Liste des Spots</a>
            </li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="logout.php" className="btn btn-danger">Se déconnecter</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AddProductForm() {
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <form method="post">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
              <input type="text" className="form-control" name="image" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Nom du Spot</label>
              <input type="text" className="form-control" name="nom" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Localisation</label>
              <input type="text" className="form-control" name="place" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
              <textarea className="form-control" name="description" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" name="valider">Ajouter le Spot</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function YourComponent() {
  return (
    <>
      <NavBar />
      <AddProductForm />
    </>
  );
}
