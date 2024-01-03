import React from 'react';
import Select from 'react-select';

const flattenOptions = (sectors, level = 0) => {
    return sectors.reduce((acc, sector) => {
        const option = {
            value: String(sector.id),
            label: `${'\u00A0'.repeat(level * 4)}${sector.name}`,
        };

        if (sector.children && sector.children.length > 0) {
            return [...acc, option, ...flattenOptions(sector.children, level + 1)];
        }

        return [...acc, option];
    }, []);
};

const SectorSelect = ({ sectors, onChange, selectedSectors }) => {
    const options = flattenOptions(sectors);
    const selectedOptions = options.filter((option) => selectedSectors.includes(option.value));

    return (
        <Select
            options={options}
            isMulti
            onChange={(selectedOptions) => {
                onChange(selectedOptions.map((option) => option.value));
            }}
            defaultValue={selectedOptions}
            className='w-full text-zinc-700 flex-nowrap'
        />
    );
};

export default SectorSelect;