import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UpdateForm } from '../UpdateForm/UpdateForm';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from 'axios';

export function UpdateModal({ asset, onClose, show }) {
    const { setAssets } = useContext(PortfolioContext);
    const [updatedQuantity, setUpdatedQuantity] = useState(asset.assetQuantity);
    const [updatedPrice, setUpdatedPrice] = useState(asset.assetPrice);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleUpdate = () => {
        axios.put(`${apiUrl}/asset/${asset.id}?name=${asset.name}&assetQuantity=${updatedQuantity}`, {
            // asset
        })
        .then(_response => {
            axios.get('http://localhost:8080/api/v1/asset')
            .then(response => setAssets(response.data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
        onClose();
    }

    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateForm
                    asset={asset}
                    setUpdatedQuantity={setUpdatedQuantity}
                    updatedPrice={updatedPrice}
                    setUpdatedPrice={setUpdatedPrice}
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Update
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
