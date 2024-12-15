import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ListTriggers = () => {
    const [triggers, setTriggers] = useState([]);

    useEffect(() => {
        const fetchTriggers = async () => {
            try {
                const response = await api.get('/trigger/list-triggers');
                setTriggers(response.data);
            } catch (error) {
                console.error('Failed to fetch triggers', error);
            }
            console.log(triggers)
        };
        fetchTriggers();
        
    }, []);

    return (
        <div>
            <h2>Triggers</h2>
            <ul>
                {triggers.map((trigger) => (
                    <li key={trigger.trigger_id}>
                        {trigger.trigger_type} - {trigger.schedule_time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTriggers;
