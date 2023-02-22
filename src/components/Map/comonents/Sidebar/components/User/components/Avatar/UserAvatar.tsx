import React, { useMemo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';
import './UserAvatar.css';

import LogOutButton from '../UserActionButtons/LogOutButton';
import LogInButton from '../UserActionButtons/LogInButton';
import { useGetUserId } from '../../../../../../../../contexts/AuthContext/hooks';

export default function UserAvatar() {
    const { user } = useUserAuth();

    const userId = useGetUserId();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);

    const avatarUrl = user.iconUrl;

    const userIcon = useMemo(
        () =>
            avatarUrl ? (
                <img src={avatarUrl} alt="user" referrerPolicy="no-referrer" />
            ) : (
                <AccountCircleIcon fontSize="large" />
            ),
        [avatarUrl],
    );

    return userId ? (
        <>
            <IconButton className="icon" onClick={handleClick}>
                {userIcon}
            </IconButton>
            <Menu
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/user-settings">
                        Настройки
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <LogOutButton />
                </MenuItem>
            </Menu>
        </>
    ) : (
        <LogInButton />
    );
}
