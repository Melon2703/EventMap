import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, SxProps, TextField, Theme } from '@mui/material';
import React, { useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
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

const defaultValues: EventInfo = {
    description: '',
    isPrivate: false,
    // TODO: дефолтный тип брать в будущем на основе типа пользователя
    type: 'walk',
    name: '',
};

function SetMarker() {
    const { onModalClose } = useModal();

    const { register, handleSubmit, getValues } = useForm({ mode: 'onChange', defaultValues });

    const onSubmit = useCallback(() => {
        // @ts-expect-error
        modalPromise.resolve(getValues());
    }, [getValues]);

    return (
        <Box sx={modalSx}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmit)}>
                <h3>Новое событие</h3>
                <TextField label="Название" type="text" {...register('name')} />
                {/* TODO: починить lable */}
                <Select label="Тип" {...register('type')}>
                    <MenuItem value="walk">Прогулка</MenuItem>
                    <MenuItem value="sport">Спорт</MenuItem>
                    <MenuItem value="bar">Бар</MenuItem>
                </Select>
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
