import React, { useCallback } from 'react';
import { Map } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MapLink = () => {
    const navigate = useNavigate();

    const onCLick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <IconButton className="icon" onClick={onCLick}>
            <Map fontSize="large" />
        </IconButton>
    );
};
