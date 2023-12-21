import React from 'react';

const renderOptions = (sectors, level = 0) => {
    return sectors.map(sector => (
        <React.Fragment key={sector.id}>
            {sector.children && sector.children.length > 0 ? (
                <optgroup 
                label={`${'\u00A0'.repeat(level * 2)}${sector.name}`}
                className='font-semibold'
                >
                    <option value={sector.id}>{`${'\u00A0'.repeat(level * 2)}${sector.name}`}</option>
                    {renderOptions(sector.children, level + 1)}
                </optgroup>
            ) : (
                <option value={sector.id}>
                    {`${'\u00A0'.repeat(level * 2)}${sector.name}`}
                </option>
            )}
        </React.Fragment>
    ));
};

const SectorSelect = ({ sectors, onChange, selectedSectors }) => (
    <select 
    onChange={(e)=> {
        onChange(e.target.selectedOptions[0].value)
    }} 
    size={5} 
    multiple
    value={selectedSectors}
    className='text-md md:text-lg text-purple-700 bg-zinc-100 active:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ease-in-out border-0 rounded-lg px-3'
    >
        <option value="">Select a sector</option>
        {renderOptions(sectors)}
    </select>
);

export default SectorSelect;