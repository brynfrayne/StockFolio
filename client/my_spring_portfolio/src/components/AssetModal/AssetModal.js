import { React, useState } from 'react';
import { AssetDisplayModal } from '../AssetDisplayModal/AssetDisplayModal';
import { UpdateModal } from '../UpdateModal/UpdateModal';


export function AssetModal({ asset, onClose }) {
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDisplay, setShowDisplay] = useState(true);


  return (
    <>
      <AssetDisplayModal
          asset={asset}
          setShowDisplay={setShowDisplay}
          setShowUpdate={setShowUpdate}
          onClose={onClose}
        />
      <UpdateModal
          show={showUpdate}
          asset={asset}
          onClose={onClose}
        />
    </>
  );
}
