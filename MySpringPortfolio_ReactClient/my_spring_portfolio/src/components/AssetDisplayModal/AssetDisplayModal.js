import { useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AssetDisplay } from '../AssetDisplay/AssetDisplay';


export function AssetDisplayModal({ asset, onClose, setShowDisplay, setShowUpdate }) {
    const { assets, setAssets } = useContext(PortfolioContext);

    const handleUpdateShow = () => {
        setShowUpdate(true);
        setShowDisplay(false);
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/v1/asset/${asset.id}`)
        .then(_response => {
            setAssets(assets.filter((a) => a.id !== asset.id));
        })
        .catch(error => {
            console.log(error);
        });
        onClose();
    }
    return (
        <Modal show={!!asset} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{asset.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AssetDisplay asset={asset} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="primary" onClick={handleUpdateShow}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
