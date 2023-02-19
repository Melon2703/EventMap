import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SxProps,
    TextField,
    Theme,
} from '@mui/material';
import React, { useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useUserAuth } from '../../../AuthContext/AuthContext';
// eslint-disable-next-line import/no-cycle
import { modalPromise, useModal } from '../../ModalContext';
import EventInfo from './types';

const modalSx: SxProps<Theme> = {
    width: 250,
    background: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px',
    borderRadius: '24px',
};

const getDefaultValues = (ownerId: string, type = 'walk'): Omit<EventInfo, 'id'> => ({
    description: '',
    isPrivate: false,
    type,
    name: '',
    ownerId,
});

function SetMarker() {
    const { onModalClose } = useModal();

    const {
        user: { id: ownerId },
    } = useUserAuth();

    const { register, handleSubmit, getValues } = useForm({
        mode: 'onChange',
        defaultValues: getDefaultValues(ownerId),
    });

    const onSubmit = useCallback(() => {
        modalPromise.resolve?.(getValues());
    }, [getValues]);

    return (
        <Box sx={modalSx}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmit)}>
                <h3>Новое событие</h3>
                <TextField label="Название" type="text" {...register('name')} />
                <FormControl>
                    <InputLabel id="type-selector-label">Тип</InputLabel>
                    <Select
                        labelId="type-selector-label"
                        label="Тип"
                        defaultValue={getValues('type')}
                        {...register('type')}
                    >
                        <MenuItem value="walk">Прогулка</MenuItem>
                        <MenuItem value="sport">Спорт</MenuItem>
                        <MenuItem value="bar">Бар</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Описание" multiline {...register('description')} />
                <FormControlLabel label="Приватное" control={<Checkbox {...register('isPrivate')} />} />
                <div>
                    <Button onClick={onModalClose}>Отмена</Button>
                    <Button type="submit">Продолжить</Button>
                </div>
            </form>
        </Box>
    );
}

export default SetMarker;
