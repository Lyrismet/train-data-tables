import React, {useEffect, useState} from 'react';
import TrainsTable from "./components/TrainsTable";
import SpeedsTable from './components/SpeedsTable';
import './App.scss';

interface Train {
    name: string;
    description: string;
    speedLimits: SpeedLimit[];
}

interface SpeedLimit {
    name: string;
    speedLimit: number;
}

const App: React.FC = () => {
    const [trains, setTrains] = useState<Train[]>([]);

    useEffect(() => {
        const url = 'https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json';

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setTrains(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleSpeedLimitChange = (trainIndex: number, speedLimitIndex: number, speedLimit: number) => {
        const updatedTrains = [...trains];
        updatedTrains[trainIndex].speedLimits[speedLimitIndex].speedLimit = speedLimit;
        setTrains(updatedTrains);
    };

    const handleSendData = () => {
        try {
            const sortedTrains = trains.map((train) => ({
                ...train,
                speedLimits: train.speedLimits.sort((a, b) => a.speedLimit - b.speedLimit),
            }));

            const validData = JSON.stringify(sortedTrains);
            console.log('Отправка данных на сервер:', validData);
            alert('Отправка данных на сервер успешно завершена');
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert('Возникла ошибка при отправке данных');
        }
    };

    return (
        <div className="tables-container">
            <div className="trains-table">
                <h1>Таблица поездов</h1>
                <TrainsTable trains={trains}/>
            </div>

            <div className="speeds-table">
                <h1>Таблица скоростных ограничений</h1>
                {trains.map((train, trainIndex) => (
                    <div className="train-item" key={trainIndex}>
                        <h2>{train.name}</h2>
                        <SpeedsTable
                            speedLimits={train.speedLimits}
                            onSpeedLimitChange={(speedLimitIndex, speedLimit) =>
                                handleSpeedLimitChange(trainIndex, speedLimitIndex, speedLimit)
                            }
                        />
                    </div>
                ))}


            </div>
            <button onClick={handleSendData}>Отправить данные на сервер</button>
        </div>
    );
};

export default App;