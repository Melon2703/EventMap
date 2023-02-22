import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button,
    SxProps,
    Theme,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EmptyEventInfo, EventInfo } from './SetMarker/types';
import { useGetUserId } from '../../AuthContext/hooks';

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

interface MarkerFormProps {
    onSubmit: (value: EventInfo) => void;
    continueText: string;
    defaultValues: EmptyEventInfo;
    secondButton?: JSX.Element;
}

function MarkerForm({ onSubmit, continueText, defaultValues, secondButton }: MarkerFormProps) {
    const userId = useGetUserId();

    const canEdit = userId === defaultValues.ownerId;

    const { register, handleSubmit, getValues } = useForm<EventInfo>({
        mode: 'onChange',
        defaultValues,
    });

    return (
        <Box sx={modalSx}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmit)}>
                <h3>Новое событие</h3>
                <TextField disabled={!canEdit} label="Название" type="text" {...register('name')} />
                <FormControl>
                    <InputLabel id="type-selector-label">Тип</InputLabel>
                    <Select
                        disabled={!canEdit}
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
                <TextField disabled={!canEdit} label="Описание" multiline {...register('description')} />
                {canEdit ? (
                    <FormControlLabel
                        label="Приватное"
                        control={<Checkbox defaultChecked={getValues('isPrivate')} {...register('isPrivate')} />}
                    />
                ) : null}
                <div>
                    {secondButton}
                    {canEdit ? <Button type="submit">{continueText}</Button> : null}
                </div>
            </form>
        </Box>
    );
}

export default MarkerForm;
