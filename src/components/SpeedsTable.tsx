import React from 'react';

interface SpeedLimit {
    name: string;
    speedLimit: number;
}

interface SpeedLimitTableProps {
    speedLimits: SpeedLimit[];
    onSpeedLimitChange: (index: number, speedLimit: number) => void;
}

const SpeedLimitTable: React.FC<SpeedLimitTableProps> = ({ speedLimits, onSpeedLimitChange }) => {
    const handleSpeedLimitChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const speedLimit = inputValue === '' ? 1 : parseInt(event.target.value);
        onSpeedLimitChange(index, speedLimit);
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Скоростное ограничение</th>
            </tr>
            </thead>
            <tbody>
            {speedLimits.map((speedLimit, index) => (
                <tr key={index}>
                    <td>{speedLimit.name}</td>
                    <td>
                        <input
                            min="1"
                            type="number"
                            value={speedLimit.speedLimit}
                            onChange={(event) => handleSpeedLimitChange(index, event)}
                        /> км/ч
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SpeedLimitTable;