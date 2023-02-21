import React, { useMemo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Popover, List, MenuItem } from '@mui/material';
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
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    <MenuItem>Настройки</MenuItem>
                    <MenuItem>
                        <LogOutButton />
                    </MenuItem>
                </List>
            </Popover>
        </>
    ) : (
        <LogInButton />
    );
}
