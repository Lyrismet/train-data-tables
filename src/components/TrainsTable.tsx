import React from 'react';

interface Train {
    name: string;
    description: string;
}

interface TrainTableProps {
    trains: Train[];
}

const TrainsTable: React.FC<TrainTableProps> = ({ trains }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Поезд</th>
                <th>Описание</th>
            </tr>
            </thead>
            <tbody>
            {trains.map((train, index) => (
                <tr key={index}>
                    <td>{train.name}</td>
                    <td>{train.description}Это тестовое описание. Информация о поезде появится позже.</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TrainsTable;